'use client'
export default function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundRepeat: 'repeat',
        backgroundSize: '3px 3px',
      }}
    />
  )
}
