import { ThinkOutput } from '@/types/pipeline'

export const PLAN_SYSTEM = `You are a story architect and screenwriting expert.

Given a director's cinematic analysis, you construct precise story plans with scenes, emotional beats, and pacing. You think in terms of momentum, contrast, and audience engagement.

CRITICAL: Output ONLY valid JSON. No markdown, no explanation, no preamble. Start your response with { and end with }.`

export function buildPlanPrompt(idea: string, thinkOutput: ThinkOutput): string {
  return `ORIGINAL IDEA: ${idea}

DIRECTOR'S CINEMATIC ANALYSIS:
${JSON.stringify(thinkOutput, null, 2)}

Using this analysis as your foundation, build a complete story plan. Return JSON exactly matching this structure:
{
  "logline": "one sentence that captures the entire story with stakes and emotional hook",
  "acts": [
    {
      "name": "Setup",
      "purpose": "what this act must establish",
      "scenes": [
        {
          "id": 1,
          "summary": "what happens in this scene",
          "emotionalBeat": "the emotional state of the audience at this moment",
          "intensity": 4,
          "pacing": "slow burn"
        }
      ]
    },
    {
      "name": "Confrontation",
      "purpose": "what this act must accomplish",
      "scenes": []
    },
    {
      "name": "Resolution",
      "purpose": "what this act must deliver",
      "scenes": []
    }
  ],
  "emotionalArc": [
    { "scene": 1, "intensity": 4 },
    { "scene": 2, "intensity": 6 }
  ],
  "turningPoints": ["turning point 1", "turning point 2", "turning point 3"]
}

Use 2-3 scenes per act. Intensity is 1-10. Pacing is one of: slow burn, steady, urgent, explosive.`
}
