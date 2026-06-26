'use client'
import { AppStage } from '@/types/pipeline'

const PROGRESS: Record<AppStage, number> = {
  idle: 0, thinking: 33, planning: 66, directing: 90, complete: 100,
}

export default function ProgressRail({ stage }: { stage: AppStage }) {
  const pct = PROGRESS[stage] ?? 0
  return (
    <div className="fixed top-[57px] left-0 right-0 z-40 h-0.5 bg-noir-800">
      <div className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-1000 ease-out"
        style={{ width: `${pct}%` }} />
    </div>
  )
}
