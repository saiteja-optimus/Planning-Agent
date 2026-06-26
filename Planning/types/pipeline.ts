export type ToneTag = 'gritty' | 'dreamlike' | 'epic' | 'intimate' | 'suspenseful' | 'hopeful' | 'dark' | 'playful'

export type StageStatus = 'idle' | 'streaming' | 'done' | 'error'

export interface ThinkOutput {
  audience: {
    primary: string
    psychographic: string
    whyTheyCare: string
  }
  emotion: {
    coreFeeling: string
    tension: string
    catharsis: string
  }
  narrativeDNA: {
    archetype: string
    structure: string
    themes: string[]
  }
  visualDNA: {
    moodWords: string[]
    referenceFilms: string[]
    signatureImage: string
  }
}

export interface Scene {
  id: number
  summary: string
  emotionalBeat: string
  intensity: number
  pacing: 'slow burn' | 'steady' | 'urgent' | 'explosive'
}

export interface Act {
  name: string
  purpose: string
  scenes: Scene[]
}

export interface PlanOutput {
  logline: string
  acts: Act[]
  emotionalArc: { scene: number; intensity: number }[]
  turningPoints: string[]
}

export interface ColorSwatch {
  name: string
  hex: string
  usage: string
}

export interface Shot {
  scene: number
  shotType: 'wide' | 'medium' | 'close' | 'extreme close' | 'aerial' | 'POV'
  framing: string
  movement: string
  mood: string
  duration: string
}

export interface AIPrompt {
  scene: number
  prompt: string
  negativePrompt: string
  aspectRatio: string
}

export interface DirectOutput {
  colorPalette: ColorSwatch[]
  cinematography: {
    style: string
    lensPreference: string
    lighting: string
    movement: string
  }
  shotList: Shot[]
  aiImagePrompts: AIPrompt[]
}

export interface StageData<T> {
  status: StageStatus
  data: Partial<T>
  raw: string
  error?: string
}

export type AppStage = 'idle' | 'thinking' | 'planning' | 'directing' | 'complete'
