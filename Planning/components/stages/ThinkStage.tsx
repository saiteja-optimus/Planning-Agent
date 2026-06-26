'use client'
import { useSessionStore } from '@/lib/store/sessionStore'
import LensCard from '@/components/ui/LensCard'
import DirectorSlate from '@/components/ui/DirectorSlate'
import StreamingText from '@/components/ui/StreamingText'

export default function ThinkStage() {
  const { think } = useSessionStore()
  const { status, data } = think
  const isStreaming = status === 'streaming'
  const isDone = status === 'done'

  if (status === 'idle') return null

  const lenses = [
    {
      title: 'Audience',
      icon: '👥',
      done: !!data.audience,
      content: data.audience ? (
        <div className="space-y-1.5">
          <p><span className="text-gold-400/70 text-xs uppercase tracking-wide">Primary: </span>{data.audience.primary}</p>
          <p><span className="text-gold-400/70 text-xs uppercase tracking-wide">Psychology: </span>{data.audience.psychographic}</p>
          <p><span className="text-gold-400/70 text-xs uppercase tracking-wide">Hook: </span>{data.audience.whyTheyCare}</p>
        </div>
      ) : null,
    },
    {
      title: 'Emotion',
      icon: '🎭',
      done: !!data.emotion,
      content: data.emotion ? (
        <div className="space-y-1.5">
          <p><span className="text-gold-400/70 text-xs uppercase tracking-wide">Core: </span>{data.emotion.coreFeeling}</p>
          <p><span className="text-gold-400/70 text-xs uppercase tracking-wide">Tension: </span>{data.emotion.tension}</p>
          <p><span className="text-gold-400/70 text-xs uppercase tracking-wide">Release: </span>{data.emotion.catharsis}</p>
        </div>
      ) : null,
    },
    {
      title: 'Narrative DNA',
      icon: '🧬',
      done: !!data.narrativeDNA,
      content: data.narrativeDNA ? (
        <div className="space-y-1.5">
          <p><span className="text-gold-400/70 text-xs uppercase tracking-wide">Archetype: </span>{data.narrativeDNA.archetype}</p>
          <p><span className="text-gold-400/70 text-xs uppercase tracking-wide">Structure: </span>{data.narrativeDNA.structure}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {(data.narrativeDNA.themes || []).map((t, i) => (
              <span key={i} className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 rounded text-xs text-gold-400 font-mono">{t}</span>
            ))}
          </div>
        </div>
      ) : null,
    },
    {
      title: 'Visual DNA',
      icon: '🎨',
      done: !!data.visualDNA,
      content: data.visualDNA ? (
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1 mb-2">
            {(data.visualDNA.moodWords || []).map((w, i) => (
              <span key={i} className="px-2 py-0.5 bg-noir-700 rounded text-xs text-ivory/70 font-mono">{w}</span>
            ))}
          </div>
          <p className="text-xs text-ivory/50 italic">{(data.visualDNA.referenceFilms || []).join(' · ')}</p>
          <p className="text-sm text-ivory/80 border-l-2 border-gold-500/40 pl-3 italic mt-2">{data.visualDNA.signatureImage}</p>
        </div>
      ) : null,
    },
  ]

  const doneLenses = lenses.filter(l => l.done).length
  const activeLensIndex = doneLenses < 4 ? doneLenses : -1

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/30" />
        <span className="font-mono text-xs text-gold-400 uppercase tracking-widest">Stage 01 — Think</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/30" />
      </div>

      {isStreaming && doneLenses === 0 && (
        <div className="flex justify-center py-8">
          <DirectorSlate scene={1} label="Think" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lenses.map((lens, i) => (
          <LensCard
            key={lens.title}
            title={lens.title}
            icon={lens.icon}
            isDone={lens.done}
            isActive={i === activeLensIndex}
          >
            {lens.content || (
              <StreamingText
                text={isStreaming && i === activeLensIndex ? think.raw.slice(-200) : ''}
                isStreaming={isStreaming && i === activeLensIndex}
                className="max-h-24"
              />
            )}
          </LensCard>
        ))}
      </div>

      {isDone && data.visualDNA && (
        <div className="text-center pt-2">
          <span className="font-mono text-xs text-gold-500/60 uppercase tracking-widest">
            Cinematic Analysis Complete · Moving to Story Plan
          </span>
        </div>
      )}
    </div>
  )
}
