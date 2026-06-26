import { create } from 'zustand'
import { ThinkOutput, PlanOutput, DirectOutput, StageData, AppStage, ToneTag } from '@/types/pipeline'
import { parsePartialJson } from '@/lib/utils/parseStreamingJson'

interface SessionStore {
  idea: string
  toneTags: ToneTag[]
  appStage: AppStage
  think: StageData<ThinkOutput>
  plan: StageData<PlanOutput>
  direct: StageData<DirectOutput>
  setIdea: (idea: string) => void
  toggleToneTag: (tag: ToneTag) => void
  runPipeline: () => Promise<void>
  reset: () => void
}

const initialStage = <T>(): StageData<T> => ({
  status: 'idle',
  data: {},
  raw: '',
})

async function streamStage<T>(
  url: string,
  body: object,
  onChunk: (raw: string) => void
): Promise<Partial<T>> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let raw = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    const chunk = decoder.decode(value, { stream: true })
    const lines = chunk.split('\n')
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const text = line.slice(6)
        if (text === '[DONE]') continue
        try {
          const parsed = JSON.parse(text)
          if (parsed.delta) {
            raw += parsed.delta
            onChunk(raw)
          }
        } catch {}
      }
    }
  }
  return parsePartialJson<T>(raw)
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  idea: '',
  toneTags: [],
  appStage: 'idle',
  think: initialStage<ThinkOutput>(),
  plan: initialStage<PlanOutput>(),
  direct: initialStage<DirectOutput>(),

  setIdea: (idea) => set({ idea }),

  toggleToneTag: (tag) => {
    const { toneTags } = get()
    set({
      toneTags: toneTags.includes(tag)
        ? toneTags.filter((t) => t !== tag)
        : [...toneTags, tag],
    })
  },

  reset: () =>
    set({
      idea: '',
      toneTags: [],
      appStage: 'idle',
      think: initialStage<ThinkOutput>(),
      plan: initialStage<PlanOutput>(),
      direct: initialStage<DirectOutput>(),
    }),

  runPipeline: async () => {
    const { idea, toneTags } = get()

    // Stage 1: THINK
    set({ appStage: 'thinking', think: { status: 'streaming', data: {}, raw: '' } })
    let thinkData: Partial<ThinkOutput> = {}
    try {
      thinkData = await streamStage<ThinkOutput>(
        '/api/think',
        { idea, toneTags },
        (raw) => {
          set({ think: { status: 'streaming', data: parsePartialJson<ThinkOutput>(raw), raw } })
        }
      )
      set({ think: { status: 'done', data: thinkData, raw: JSON.stringify(thinkData) } })
    } catch (e) {
      set({ think: { status: 'error', data: {}, raw: '', error: String(e) } })
      return
    }

    // Stage 2: PLAN
    set({ appStage: 'planning', plan: { status: 'streaming', data: {}, raw: '' } })
    let planData: Partial<PlanOutput> = {}
    try {
      planData = await streamStage<PlanOutput>(
        '/api/plan',
        { idea, thinkOutput: thinkData },
        (raw) => {
          set({ plan: { status: 'streaming', data: parsePartialJson<PlanOutput>(raw), raw } })
        }
      )
      set({ plan: { status: 'done', data: planData, raw: JSON.stringify(planData) } })
    } catch (e) {
      set({ plan: { status: 'error', data: {}, raw: '', error: String(e) } })
      return
    }

    // Stage 3: DIRECT
    set({ appStage: 'directing', direct: { status: 'streaming', data: {}, raw: '' } })
    let directData: Partial<DirectOutput> = {}
    try {
      directData = await streamStage<DirectOutput>(
        '/api/direct',
        { idea, thinkOutput: thinkData, planOutput: planData },
        (raw) => {
          set({ direct: { status: 'streaming', data: parsePartialJson<DirectOutput>(raw), raw } })
        }
      )
      set({ direct: { status: 'done', data: directData, raw: JSON.stringify(directData) } })
    } catch (e) {
      set({ direct: { status: 'error', data: {}, raw: '', error: String(e) } })
      return
    }

    set({ appStage: 'complete' })
  },
}))
