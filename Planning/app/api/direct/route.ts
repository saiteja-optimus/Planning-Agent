import { anthropic } from '@/lib/claude/client'
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
        const msgStream = anthropic.messages.stream({
          model: 'claude-sonnet-4-6',
          max_tokens: 3000,
          system: DIRECT_SYSTEM,
          messages: [{ role: 'user', content: buildDirectPrompt(idea, thinkOutput, planOutput) }],
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
