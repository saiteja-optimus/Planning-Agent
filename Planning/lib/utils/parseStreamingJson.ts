export function parsePartialJson<T>(raw: string): Partial<T> {
  if (!raw.trim()) return {}
  try {
    return JSON.parse(raw) as T
  } catch {
    // Try to fix incomplete JSON by closing open structures
    let fixed = raw.trim()
    const opens = (fixed.match(/\{/g) || []).length
    const closes = (fixed.match(/\}/g) || []).length
    const arrOpens = (fixed.match(/\[/g) || []).length
    const arrCloses = (fixed.match(/\]/g) || []).length

    // Remove trailing comma if any
    fixed = fixed.replace(/,\s*$/, '')

    for (let i = 0; i < arrOpens - arrCloses; i++) fixed += ']'
    for (let i = 0; i < opens - closes; i++) fixed += '}'

    try {
      return JSON.parse(fixed) as T
    } catch {
      return {}
    }
  }
}
