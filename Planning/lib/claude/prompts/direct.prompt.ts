import { ThinkOutput, PlanOutput } from '@/types/pipeline'

export const DIRECT_SYSTEM = `You are an award-winning cinematographer and visual director.

You translate story plans into production-ready visual direction with concrete, shootable specifications. Every choice has a reason rooted in the story's emotional truth.

CRITICAL: Output ONLY valid JSON. No markdown, no explanation, no preamble. Start your response with { and end with }.`

export function buildDirectPrompt(idea: string, thinkOutput: ThinkOutput, planOutput: PlanOutput): string {
  return `IDEA: ${idea}

CINEMATIC ANALYSIS:
${JSON.stringify(thinkOutput, null, 2)}

STORY PLAN:
${JSON.stringify(planOutput, null, 2)}

Produce production-ready visual direction. Return JSON exactly matching this structure:
{
  "colorPalette": [
    { "name": "Shadow Base", "hex": "#1a1a2e", "usage": "where and why this color appears" },
    { "name": "Highlight", "hex": "#f5c518", "usage": "where and why" },
    { "name": "Midtone", "hex": "#8b7355", "usage": "where and why" },
    { "name": "Accent", "hex": "#dc143c", "usage": "where and why" },
    { "name": "Neutral", "hex": "#d4c5a9", "usage": "where and why" }
  ],
  "cinematography": {
    "style": "describe the overall visual approach",
    "lensPreference": "e.g., 35mm anamorphic, 50mm prime, wide-angle distortion",
    "lighting": "describe the lighting philosophy",
    "movement": "describe camera movement philosophy"
  },
  "shotList": [
    {
      "scene": 1,
      "shotType": "wide",
      "framing": "describe exact framing",
      "movement": "static / pan / dolly / handheld",
      "mood": "what this shot makes the viewer feel",
      "duration": "3s"
    }
  ],
  "aiImagePrompts": [
    {
      "scene": 1,
      "prompt": "cinematic still, [detailed visual description], [lighting], [mood], [film stock], [aspect ratio], photorealistic, 8k",
      "negativePrompt": "cartoon, anime, text, watermark, blurry, low quality",
      "aspectRatio": "16:9"
    }
  ]
}

Create one shot and one AI prompt per scene from the plan. Be specific and production-ready.`
}
