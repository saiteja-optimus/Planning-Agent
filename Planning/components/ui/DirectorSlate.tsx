'use client'
interface Props { scene: number; label: string }
export default function DirectorSlate({ scene, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-56 h-44 bg-noir-800 border-2 border-gold-500 rounded overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-14 bg-noir-700 border-b-2 border-gold-500 flex items-center px-3 gap-1.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-4 h-10 bg-gold-500 skew-x-6 flex-shrink-0"
              style={{ marginTop: i % 2 === 0 ? 0 : 6 }} />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-14 flex flex-col justify-center items-center gap-1 p-3">
          <div className="font-mono text-xs text-gold-400 uppercase tracking-widest">
            Scene {String(scene).padStart(2, '0')}
          </div>
          <div className="font-display text-xl font-bold text-ivory uppercase tracking-wide text-center">{label}</div>
          <div className="font-mono text-xs text-gold-500/50">Take 1</div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-2 h-2 rounded-full bg-film-red animate-pulse" />
        <span className="font-mono text-xs text-film-red uppercase tracking-widest">Processing</span>
      </div>
    </div>
  )
}
