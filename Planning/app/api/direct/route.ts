import { nimClient, NIM_MODEL } from '@/lib/claude/client'
import { DIRECT_SYSTEM, buildDirectPrompt } from '@/lib/claude/prompts/direct.prompt'
import { ThinkOutput, PlanOutput } from '@/types/pipeline'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { idea, thinkOutput, planOutput }: { idea: string; thinkOutput: ThinkOutput; planOutput: PlanOutput } = await req.json()

  if (!idea?.trim() || !thinkOutput || !planOutput) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const nimStream = await nimClient.chat.completions.create({
          model: NIM_MODEL,
          max_tokens: 3000,
          messages: [
            { role: 'system', content: DIRECT_SYSTEM },
            { role: 'user', content: buildDirectPrompt(idea, thinkOutput, planOutput) },
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
