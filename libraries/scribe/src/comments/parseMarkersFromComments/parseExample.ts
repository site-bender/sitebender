export default function parseExample(raw: string): { code: string; expected?: string; raw: string } {
  if (!raw) return { code: '', raw }
  const parts = raw.split('//')
  if (parts.length > 1) {
    const code = parts[0].trim()
    const expected = parts.slice(1).join('//').trim() || undefined
    return { code, expected, raw }
  }
  return { code: raw.trim(), raw }
}
