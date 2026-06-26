'use client'
import { useSessionStore } from '@/lib/store/sessionStore'
import Header from '@/components/layout/Header'
import ProgressRail from '@/components/layout/ProgressRail'
import StageTimeline from '@/components/ui/StageTimeline'
import FilmGrain from '@/components/ui/FilmGrain'
import IdeaInput from '@/components/stages/IdeaInput'
import ThinkStage from '@/components/stages/ThinkStage'
import PlanStage from '@/components/stages/PlanStage'
import DirectStage from '@/components/stages/DirectStage'

export default function Home() {
  const { appStage } = useSessionStore()
  const showSidebar = appStage !== 'idle'

  return (
    <div className="min-h-screen bg-noir-950">
      <FilmGrain />
      <Header />
      <ProgressRail stage={appStage} />

      <div className={`pt-16 transition-all duration-500 ${showSidebar ? 'flex' : ''}`}>
        {/* Sidebar timeline */}
        {showSidebar && (
          <aside className="w-52 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] border-r border-noir-800 bg-noir-950/80 backdrop-blur-sm p-4 hidden md:block">
            <div className="font-mono text-xs text-ivory/20 uppercase tracking-widest mb-4">Pipeline</div>
            <StageTimeline current={appStage} />
          </aside>
        )}

        {/* Main content */}
        <main className={`flex-1 min-w-0 ${showSidebar ? 'px-6 md:px-10' : 'px-6'} py-12`}>
          {/* Idea input — always shown, hidden after running */}
          {appStage === 'idle' && (
            <div className="min-h-[60vh] flex items-center justify-center">
              <IdeaInput />
            </div>
          )}

          {/* Show idea recap + re-run option when in pipeline */}
          {appStage !== 'idle' && (
            <div className="max-w-4xl mx-auto space-y-12">
              <IdeaRecap />
              <ThinkStage />
              <PlanStage />
              <DirectStage />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function IdeaRecap() {
  const { idea, toneTags } = useSessionStore()
  return (
    <div className="rounded-lg border border-noir-700 bg-noir-800/50 p-4 flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 flex-shrink-0" />
      <div>
        <div className="font-mono text-xs text-gold-400/60 uppercase tracking-widest mb-1">Your Idea</div>
        <p className="text-ivory/80 text-sm leading-relaxed">{idea}</p>
        {toneTags.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {toneTags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/20 rounded text-xs text-gold-400 font-mono">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
