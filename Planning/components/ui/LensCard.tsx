'use client'
interface Props {
  title: string
  icon: string
  children: React.ReactNode
  isDone?: boolean
  isActive?: boolean
}
export default function LensCard({ title, icon, children, isDone, isActive }: Props) {
  const border = isDone
    ? 'border-gold-500/60 bg-noir-800 animate-develop shadow-lg shadow-gold-500/10'
    : isActive
    ? 'border-gold-400/30 bg-noir-800/60'
    : 'border-noir-600 bg-noir-800/20 opacity-25'
  return (
    <div className={`rounded-lg border p-4 transition-all duration-700 ${border}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className="font-display text-xs font-bold uppercase tracking-widest text-gold-400">{title}</h3>
        {isDone && <span className="ml-auto text-gold-500 text-xs font-mono tracking-widest">LOCKED</span>}
        {isActive && !isDone && <div className="ml-auto w-2 h-2 rounded-full bg-gold-400 animate-pulse" />}
      </div>
      <div className="text-ivory/80 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
