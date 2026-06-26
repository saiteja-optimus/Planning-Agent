'use client'
import { useSessionStore } from '@/lib/store/sessionStore'
import DirectorSlate from '@/components/ui/DirectorSlate'

const PACING_COLORS: Record<string, string> = {
  'slow burn': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  steady: 'bg-green-500/20 text-green-300 border-green-500/30',
  urgent: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  explosive: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export default function PlanStage() {
  const { plan } = useSessionStore()
  const { status, data } = plan
  const isStreaming = status === 'streaming'
  const isDone = status === 'done'

  if (status === 'idle') return null

  const maxIntensity = Math.max(...(data.emotionalArc || [{ intensity: 10 }]).map(p => p.intensity), 10)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/30" />
        <span className="font-mono text-xs text-gold-400 uppercase tracking-widest">Stage 02 — Plan</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/30" />
      </div>

      {isStreaming && !data.logline && (
        <div className="flex justify-center py-8">
          <DirectorSlate scene={2} label="Plan" />
        </div>
      )}

      {data.logline && (
        <div className="rounded-lg border border-gold-500/30 bg-noir-800 p-5">
          <div className="font-mono text-xs text-gold-400/60 uppercase tracking-widest mb-2">Logline</div>
          <p className="font-display text-lg text-ivory leading-snug italic">&ldquo;{data.logline}&rdquo;</p>
        </div>
      )}

      {data.emotionalArc && data.emotionalArc.length > 1 && (
        <div className="rounded-lg border border-noir-600 bg-noir-800 p-4">
          <div className="font-mono text-xs text-gold-400/60 uppercase tracking-widest mb-3">Emotional Arc</div>
          <div className="flex items-end gap-1 h-16">
            {data.emotionalArc.map((point, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-gold-600 to-gold-400 rounded-sm transition-all duration-500"
                  style={{ height: `${(point.intensity / maxIntensity) * 56}px` }}
                />
                <span className="font-mono text-xs text-ivory/30">{point.scene}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(data.acts || []).map((act, actIndex) => (
        <div key={actIndex} className="rounded-lg border border-noir-600 bg-noir-800 overflow-hidden">
          <div className="px-4 py-3 bg-noir-700 border-b border-noir-600 flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-gold-400 uppercase tracking-widest mr-2">
                Act {String(actIndex + 1).padStart(2, '0')}
              </span>
              <span className="font-display font-bold text-ivory uppercase tracking-wide">{act.name}</span>
            </div>
          </div>
          <div className="p-3 text-xs text-ivory/50 italic border-b border-noir-700">{act.purpose}</div>
          <div className="divide-y divide-noir-700">
            {(act.scenes || []).map((scene) => (
              <div key={scene.id} className="p-4 flex gap-4">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-8 h-8 rounded bg-noir-700 border border-noir-600 flex items-center justify-center font-mono text-xs text-gold-400">
                    {String(scene.id).padStart(2, '0')}
                  </div>
                  <div className="text-xs font-mono text-ivory/30">{scene.intensity}/10</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ivory/80 mb-2">{scene.summary}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-ivory/40 italic">{scene.emotionalBeat}</span>
                    <span className={`px-2 py-0.5 rounded border text-xs font-mono ${
                      PACING_COLORS[scene.pacing] || 'bg-noir-700 text-ivory/40 border-noir-600'
                    }`}>
                      {scene.pacing}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {data.turningPoints && data.turningPoints.length > 0 && (
        <div className="rounded-lg border border-noir-600 bg-noir-800 p-4">
          <div className="font-mono text-xs text-gold-400/60 uppercase tracking-widest mb-3">Turning Points</div>
          <div className="space-y-2">
            {data.turningPoints.map((tp, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-mono text-xs text-gold-400">{i + 1}</span>
                </div>
                <p className="text-sm text-ivory/70">{tp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {isDone && (
        <div className="text-center pt-2">
          <span className="font-mono text-xs text-gold-500/60 uppercase tracking-widest">
            Story Plan Locked · Generating Visual Direction
          </span>
        </div>
      )}
    </div>
  )
}
