import { nimClient, NIM_MODEL } from '@/lib/claude/client'
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
        const nimStream = await nimClient.chat.completions.create({
          model: NIM_MODEL,
          max_tokens: 2048,
          messages: [
            { role: 'system', content: PLAN_SYSTEM },
            { role: 'user', content: buildPlanPrompt(idea, thinkOutput) },
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
