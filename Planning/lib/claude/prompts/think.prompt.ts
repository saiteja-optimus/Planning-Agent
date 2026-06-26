export const THINK_SYSTEM = `You are a veteran film director and creative strategist with 30 years of experience.

Before any production begins, you analyze ideas through four cinematic lenses. You are specific, sensory, and opinionated — never generic.

CRITICAL: Output ONLY valid JSON. No markdown, no explanation, no preamble. Start your response with { and end with }.`

export function buildThinkPrompt(idea: string, toneTags: string[]): string {
  return `IDEA: ${idea}
TONE TAGS: ${toneTags.length > 0 ? toneTags.join(', ') : 'none specified'}

Analyze this through four cinematic lenses and return JSON exactly matching this structure:
{
  "audience": {
    "primary": "specific description of the primary viewer (age, context, mindset)",
    "psychographic": "what they believe, fear, and want",
    "whyTheyCare": "the emotional hook that makes them lean in"
  },
  "emotion": {
    "coreFeeling": "the single dominant emotion this should evoke",
    "tension": "what creates dramatic pull throughout",
    "catharsis": "the emotional release or transformation at the end"
  },
  "narrativeDNA": {
    "archetype": "the story archetype at work (e.g., Hero's Journey, Redemption Arc, Fall from Grace)",
    "structure": "the narrative shape (e.g., in medias res, linear revelation, parallel threads)",
    "themes": ["theme 1", "theme 2", "theme 3"]
  },
  "visualDNA": {
    "moodWords": ["word1", "word2", "word3", "word4", "word5"],
    "referenceFilms": ["Film Title (Year)", "Film Title (Year)", "Film Title (Year)"],
    "signatureImage": "a single vivid visual image that captures the entire piece in one frame"
  }
}`
}
