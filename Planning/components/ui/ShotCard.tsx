'use client'
import { Shot } from '@/types/pipeline'
const ICONS: Record<string, string> = {
  wide: '🎬', medium: '📷', close: '🔍', 'extreme close': '👁', aerial: '🦅', POV: '👤',
}
export default function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  const rot = index % 2 === 0 ? '-0.5deg' : '0.5deg'
  return (
    <div className="bg-ivory/95 text-noir-900 rounded p-3 shadow-lg animate-slide-in"
      style={{ transform: `rotate(${rot})`, animationDelay: `${index * 80}ms` }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span>{ICONS[shot.shotType] || '🎬'}</span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider">SC.{shot.scene} {shot.shotType}</span>
        </div>
        <span className="font-mono text-xs border border-noir-300 rounded px-1">{shot.duration}</span>
      </div>
      <p className="text-xs mb-1"><strong>Frame:</strong> {shot.framing}</p>
      <p className="text-xs mb-1"><strong>Move:</strong> {shot.movement}</p>
      <p className="text-xs italic text-noir-600">{shot.mood}</p>
    </div>
  )
}
