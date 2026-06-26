import { nimClient, NIM_MODEL } from '@/lib/claude/client'
import { THINK_SYSTEM, buildThinkPrompt } from '@/lib/claude/prompts/think.prompt'
import { ToneTag } from '@/types/pipeline'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { idea, toneTags = [] }: { idea: string; toneTags: ToneTag[] } = await req.json()

  if (!idea?.trim()) {
    return new Response(JSON.stringify({ error: 'Idea is required' }), { status: 400 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const nimStream = await nimClient.chat.completions.create({
          model: NIM_MODEL,
          max_tokens: 1024,
          messages: [
            { role: 'system', content: THINK_SYSTEM },
            { role: 'user', content: buildThinkPrompt(idea, toneTags) },
          ],
          stream: true,
        })

        for await (const chunk of nimStream) {
          const delta = chunk.choices[0]?.delta?.content || ''
          if (delta) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`))
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`))
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
