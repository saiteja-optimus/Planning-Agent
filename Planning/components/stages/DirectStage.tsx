'use client'
import { useSessionStore } from '@/lib/store/sessionStore'
import ColorPalette from '@/components/ui/ColorPalette'
import ShotCard from '@/components/ui/ShotCard'
import ExportMenu from '@/components/ui/ExportMenu'
import DirectorSlate from '@/components/ui/DirectorSlate'

export default function DirectStage() {
  const { direct } = useSessionStore()
  const { status, data } = direct
  const isStreaming = status === 'streaming'
  const isDone = status === 'done'

  if (status === 'idle') return null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-500/30" />
        <span className="font-mono text-xs text-gold-400 uppercase tracking-widest">Stage 03 — Direct</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-500/30" />
      </div>

      {isStreaming && !data.colorPalette && (
        <div className="flex justify-center py-8">
          <DirectorSlate scene={3} label="Direct" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Color + Cinematography */}
        <div className="space-y-4">
          {data.colorPalette && data.colorPalette.length > 0 && (
            <div className="rounded-lg border border-noir-600 bg-noir-800 p-4">
              <div className="font-mono text-xs text-gold-400/60 uppercase tracking-widest mb-3">Color Palette</div>
              <ColorPalette palette={data.colorPalette} />
            </div>
          )}

          {data.cinematography && (
            <div className="rounded-lg border border-noir-600 bg-noir-800 p-4">
              <div className="font-mono text-xs text-gold-400/60 uppercase tracking-widest mb-3">Cinematography</div>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Style', value: data.cinematography.style },
                  { label: 'Lens', value: data.cinematography.lensPreference },
                  { label: 'Light', value: data.cinematography.lighting },
                  { label: 'Camera', value: data.cinematography.movement },
                ].map(({ label, value }) => value ? (
                  <div key={label}>
                    <div className="font-mono text-xs text-gold-400/50 uppercase tracking-wide">{label}</div>
                    <div className="text-ivory/70 text-xs mt-0.5">{value}</div>
                  </div>
                ) : null)}
              </div>
            </div>
          )}
        </div>

        {/* Middle: Shot list */}
        <div className="space-y-3">
          <div className="font-mono text-xs text-gold-400/60 uppercase tracking-widest">Shot List</div>
          {(data.shotList || []).map((shot, i) => (
            <ShotCard key={`${shot.scene}-${i}`} shot={shot} index={i} />
          ))}
          {isStreaming && (!data.shotList || data.shotList.length === 0) && (
            <div className="text-center py-4">
              <div className="w-4 h-4 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}
        </div>

        {/* Right: AI prompts */}
        <div className="space-y-3">
          <div className="font-mono text-xs text-gold-400/60 uppercase tracking-widest">AI Image Prompts</div>
          {(data.aiImagePrompts || []).map((p, i) => (
            <div key={i} className="rounded-lg border border-noir-600 bg-noir-800 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold-400 uppercase">Scene {p.scene}</span>
                <span className="font-mono text-xs text-ivory/30 border border-noir-600 rounded px-1.5 py-0.5">{p.aspectRatio}</span>
              </div>
              <p className="text-xs text-ivory/70 leading-relaxed font-mono bg-noir-900 p-2 rounded">{p.prompt}</p>
              {p.negativePrompt && (
                <p className="text-xs text-ivory/30 font-mono">
                  <span className="text-film-red/60">—</span> {p.negativePrompt}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {isDone && (
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-noir-700">
          <div className="text-center">
            <div className="font-display text-xl font-bold text-ivory mb-1">Production Brief Complete</div>
            <p className="text-ivory/40 text-sm">Your cinematic direction is ready.</p>
          </div>
          <ExportMenu />
        </div>
      )}
    </div>
  )
}
