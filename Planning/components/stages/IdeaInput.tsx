'use client'
import { useState } from 'react'
import { useSessionStore } from '@/lib/store/sessionStore'
import { ToneTag } from '@/types/pipeline'

const TONE_TAGS: { tag: ToneTag; label: string }[] = [
  { tag: 'epic', label: 'Epic' },
  { tag: 'intimate', label: 'Intimate' },
  { tag: 'gritty', label: 'Gritty' },
  { tag: 'dreamlike', label: 'Dreamlike' },
  { tag: 'suspenseful', label: 'Suspenseful' },
  { tag: 'hopeful', label: 'Hopeful' },
  { tag: 'dark', label: 'Dark' },
  { tag: 'playful', label: 'Playful' },
]

export default function IdeaInput() {
  const { idea, toneTags, setIdea, toggleToneTag, runPipeline, appStage } = useSessionStore()
  const [focused, setFocused] = useState(false)
  const isRunning = appStage !== 'idle' && appStage !== 'complete'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Title card */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 border border-gold-500/30 rounded px-4 py-1.5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <span className="font-mono text-xs text-gold-400 uppercase tracking-widest">Director&apos;s Room</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-ivory mb-3 leading-tight">
          What&apos;s your story?
        </h1>
        <p className="text-ivory/50 text-sm leading-relaxed max-w-md mx-auto">
          Start with a raw idea. CTE will think before it generates — building your story from the inside out.
        </p>
      </div>

      {/* Idea input */}
      <div className={`relative rounded-lg border transition-all duration-300 ${
        focused ? 'border-gold-500/60 shadow-lg shadow-gold-500/10' : 'border-noir-600'
      } bg-noir-800`}>
        <div className="absolute top-4 left-4 font-mono text-xs text-gold-400/50 uppercase tracking-widest pointer-events-none">
          INT. DIRECTOR&apos;S ROOM — DAY
        </div>
        <textarea
          value={idea}
          onChange={e => setIdea(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="A lone astronaut discovers a distress signal from a dead planet, but the voice sounds exactly like her..."
          rows={5}
          className="w-full bg-transparent text-ivory placeholder-ivory/25 font-display text-lg resize-none outline-none px-4 pb-4 pt-10 leading-relaxed"
        />
        <div className="px-4 pb-3 text-right">
          <span className={`font-mono text-xs ${idea.length > 400 ? 'text-gold-400' : 'text-ivory/20'}`}>
            {idea.length}
          </span>
        </div>
      </div>

      {/* Tone tags */}
      <div className="mt-4">
        <div className="font-mono text-xs text-ivory/30 uppercase tracking-widest mb-2">Tone (optional)</div>
        <div className="flex flex-wrap gap-2">
          {TONE_TAGS.map(({ tag, label }) => (
            <button
              key={tag}
              onClick={() => toggleToneTag(tag)}
              className={`px-3 py-1 rounded border font-mono text-xs uppercase tracking-wide transition-all ${
                toneTags.includes(tag)
                  ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                  : 'border-noir-600 text-ivory/40 hover:border-ivory/30 hover:text-ivory/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <button
          onClick={runPipeline}
          disabled={!idea.trim() || isRunning}
          className={`relative px-10 py-4 rounded font-display font-bold text-lg uppercase tracking-widest transition-all duration-300 ${
            idea.trim() && !isRunning
              ? 'bg-gold-500 hover:bg-gold-400 text-noir-900 shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.02]'
              : 'bg-noir-700 text-ivory/20 cursor-not-allowed'
          }`}
        >
          {isRunning ? 'In Production...' : 'Roll Camera'}
        </button>
        {idea.trim() && !isRunning && (
          <p className="mt-3 font-mono text-xs text-ivory/30 uppercase tracking-widest">
            3 stages · Think → Plan → Direct
          </p>
        )}
      </div>
    </div>
  )
}
