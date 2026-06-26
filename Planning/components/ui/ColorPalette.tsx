'use client'
import { useState } from 'react'
import { ColorSwatch } from '@/types/pipeline'
import { copyToClipboard } from '@/lib/utils/copyToClipboard'

export default function ColorPalette({ palette }: { palette: ColorSwatch[] }) {
  const [copied, setCopied] = useState<string | null>(null)
  const handleCopy = async (hex: string) => {
    await copyToClipboard(hex)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }
  return (
    <div className="space-y-2">
      {palette.map((s) => (
        <button key={s.hex} onClick={() => handleCopy(s.hex)}
          className="w-full flex items-center gap-3 p-2 rounded hover:bg-noir-700 transition-colors group text-left">
          <div className="w-10 h-10 rounded border border-white/10 flex-shrink-0 shadow-inner"
            style={{ backgroundColor: s.hex }} />
          <div className="flex-1 min-w-0">
            <div className="font-display text-xs font-bold text-ivory uppercase tracking-wide">{s.name}</div>
            <div className="font-mono text-xs text-gold-400">{s.hex}</div>
            <div className="text-xs text-ivory/40 truncate">{s.usage}</div>
          </div>
          <span className="text-xs text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
            {copied === s.hex ? 'COPIED' : 'COPY'}
          </span>
        </button>
      ))}
    </div>
  )
}
