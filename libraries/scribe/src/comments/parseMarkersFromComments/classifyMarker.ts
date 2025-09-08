import parseExample from './parseExample.ts'
import stripBlock from './stripBlock.ts'

export type ClassifiedMarker =
  | { kind: 'description'; value: string }
  | { kind: 'example'; examples: Array<{ code: string; expected?: string; raw: string }> }
  | { kind: 'techDebt'; reason: string }

export default function classifyMarker(full: string): ClassifiedMarker | undefined {
  const trimmed = full.trim()
  if (trimmed.startsWith('//++')) return { kind: 'description', value: trimmed.slice(4).trim() }
  if (trimmed.startsWith('/*++')) return { kind: 'description', value: stripBlock(trimmed) }
  if (trimmed.startsWith('//??')) return { kind: 'example', examples: [parseExample(trimmed.slice(4).trim())] }
  if (trimmed.startsWith('/*??')) {
    const body = stripBlock(trimmed)
    const lines = body.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
    const examples = lines.map(parseExample)
    return { kind: 'example', examples }
  }
  if (trimmed.startsWith('//--')) return { kind: 'techDebt', reason: trimmed.slice(4) }
  if (trimmed.startsWith('/*--')) return { kind: 'techDebt', reason: stripBlock(trimmed) }
  return undefined
}
