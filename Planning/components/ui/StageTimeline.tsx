'use client'
import { AppStage } from '@/types/pipeline'

const STAGES = [
  { key: 'thinking', label: 'THINK', number: '01', desc: 'Cinematic Analysis' },
  { key: 'planning', label: 'PLAN', number: '02', desc: 'Story Architecture' },
  { key: 'directing', label: 'DIRECT', number: '03', desc: 'Visual Direction' },
]
const ORDER: AppStage[] = ['idle', 'thinking', 'planning', 'directing', 'complete']

export default function StageTimeline({ current }: { current: AppStage }) {
  const currentIndex = ORDER.indexOf(current)
  return (
    <div className="flex flex-col gap-1">
      {STAGES.map((stage, i) => {
        const stageIndex = i + 1
        const isDone = currentIndex > stageIndex
        const isActive = currentIndex === stageIndex
        return (
          <div key={stage.key}
            className={`flex items-center gap-3 px-3 py-2.5 rounded transition-all ${
              isActive ? 'bg-gold-500/10 border border-gold-500/30' : 'border border-transparent'
            }`}>
            <div className={`w-8 h-8 rounded flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 ${
              isDone ? 'bg-gold-500 text-noir-900'
              : isActive ? 'bg-gold-500/20 text-gold-400 border border-gold-400'
              : 'bg-noir-700 text-ivory/30 border border-noir-600'
            }`}>
              {isDone ? '✓' : stage.number}
            </div>
            <div>
              <div className={`font-display text-xs font-bold uppercase tracking-widest ${
                isActive ? 'text-gold-400' : isDone ? 'text-gold-500/70' : 'text-ivory/30'
              }`}>{stage.label}</div>
              <div className={`text-xs ${isActive ? 'text-ivory/60' : 'text-ivory/20'}`}>{stage.desc}</div>
            </div>
            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />}
          </div>
        )
      })}
    </div>
  )
}
