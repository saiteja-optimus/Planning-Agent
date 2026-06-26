'use client'
import { useSessionStore } from '@/lib/store/sessionStore'

export default function Header() {
  const { appStage, reset } = useSessionStore()
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-noir-950/95 backdrop-blur-sm border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center shadow-lg shadow-gold-500/30">
            <span className="font-display font-bold text-noir-900 text-sm">C</span>
          </div>
          <div>
            <div className="font-display font-bold text-ivory text-sm tracking-wide">CTE</div>
            <div className="font-mono text-xs text-gold-400/70 uppercase tracking-widest leading-none">
              Cinematic Thinking Engine
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {appStage !== 'idle' && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-film-red animate-pulse" />
              <span className="font-mono text-xs text-film-red uppercase tracking-widest">REC</span>
            </div>
          )}
          {appStage !== 'idle' && (
            <button onClick={reset}
              className="font-mono text-xs text-ivory/40 hover:text-ivory/80 uppercase tracking-widest transition-colors border border-ivory/20 hover:border-ivory/40 px-3 py-1 rounded">
              Reset
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
