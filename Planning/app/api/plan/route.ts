import { anthropic } from '@/lib/claude/client'
import { PLAN_SYSTEM, buildPlanPrompt } from '@/lib/claude/prompts/plan.prompt'
import { ThinkOutput } from '@/types/pipeline'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { idea, thinkOutput }: { idea: string; thinkOutput: ThinkOutput } = await req.json()

  if (!idea?.trim() || !thinkOutput) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const msgStream = anthropic.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 2048,
          system: PLAN_SYSTEM,
          messages: [{ role: 'user', content: buildPlanPrompt(idea, thinkOutput) }],
        })

        for await (const chunk of msgStream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            const data = JSON.stringify({ delta: chunk.delta.text })
            controller.enqueue(encoder.encode(`data: ${data}\n\n`))
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
