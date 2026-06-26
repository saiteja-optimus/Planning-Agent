'use client'
import { useEffect, useRef } from 'react'

interface Props {
  text: string
  isStreaming: boolean
  className?: string
}

export default function StreamingText({ text, isStreaming, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current && isStreaming) ref.current.scrollTop = ref.current.scrollHeight
  }, [text, isStreaming])
  return (
    <div ref={ref} className={`overflow-auto ${className}`}>
      <span className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed text-gold-300">
        {text}
        {isStreaming && (
          <span className="ml-0.5 inline-block h-4 w-0.5 bg-gold-400 align-middle animate-caret-blink" />
        )}
      </span>
    </div>
  )
}
