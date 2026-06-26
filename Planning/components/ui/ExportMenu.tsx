'use client'
import { useState } from 'react'
import { useSessionStore } from '@/lib/store/sessionStore'
import { exportToMarkdown } from '@/lib/export/toMarkdown'
import { copyToClipboard } from '@/lib/utils/copyToClipboard'

export default function ExportMenu() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const { idea, think, plan, direct } = useSessionStore()

  const copy = async (key: string, content: string) => {
    await copyToClipboard(content)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
    setOpen(false)
  }

  const md = exportToMarkdown(idea, think.data, plan.data, direct.data)
  const json = JSON.stringify({ idea, think: think.data, plan: plan.data, direct: direct.data }, null, 2)
  const shots = (direct.data.shotList || [])
    .map(s => `SC.${s.scene} [${s.shotType}] ${s.framing} | ${s.movement} | ${s.duration}`)
    .join('\n')
  const prompts = (direct.data.aiImagePrompts || [])
    .map(p => `SC.${p.scene} [${p.aspectRatio}]\n${p.prompt}`)
    .join('\n\n')

  const items = [
    { label: "Director's Brief (Markdown)", key: 'md', content: md },
    { label: 'Full JSON Data', key: 'json', content: json },
    { label: 'Shot List Only', key: 'shots', content: shots },
    { label: 'AI Image Prompts', key: 'prompts', content: prompts },
  ]

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-noir-900 font-mono text-xs uppercase tracking-widest rounded font-bold transition-colors">
        {copied ? 'COPIED' : 'EXPORT'}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-noir-800 border border-gold-500/30 rounded shadow-2xl z-20 overflow-hidden">
          {items.map(item => (
            <button key={item.key} onClick={() => copy(item.key, item.content)}
              className="w-full text-left px-4 py-3 text-xs text-ivory/80 hover:bg-noir-700 hover:text-gold-400 font-mono uppercase tracking-wide transition-colors border-b border-noir-700 last:border-0">
              {copied === item.key ? 'Copied!' : item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
