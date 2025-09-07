/*++ Comment taxonomy parser (Phase 1). Supports //++, /*++, //??, /*??, //--. No function binding or example execution yet. */

export type ParsedExample = {
  code: string
  expected?: string
  line: number
  raw: string
}

export type ParsedTechDebt = {
  line: number
  reason: string
  raw: string
}

export type ParsedComments = {
  description?: string
  examples: Array<ParsedExample>
  techDebt: Array<ParsedTechDebt>
  raw: Array<{ line: number; marker: string; text: string }>
  diagnostics: Array<{ line: number; issue: string }>
}

type Acc = {
  idx: number
  descriptionParts: ReadonlyArray<string>
  haveDescription: boolean
  examples: ReadonlyArray<ParsedExample>
  techDebt: ReadonlyArray<ParsedTechDebt>
  raw: ReadonlyArray<{ line: number; marker: string; text: string }>
  diagnostics: ReadonlyArray<{ line: number; issue: string }>
}

export default function parseCommentMarkers(source: string): ParsedComments {
  const lines = source.split(/\r?\n/)


  const initial: Acc = {
    idx: 0,
    descriptionParts: [],
    haveDescription: false,
    examples: [],
    techDebt: [],
    raw: [],
    diagnostics: [],
  }

  const final = processLines(lines, initial)

  const description = final.descriptionParts.length > 0
    ? final.descriptionParts.join(' ').replace(/\s+/g, ' ').trim()
    : undefined

  return {
    description,
    examples: [...final.examples],
    techDebt: [...final.techDebt],
    raw: [...final.raw],
    diagnostics: [...final.diagnostics],
  }
}

// Recursive processor (tail-ish). Each step returns updated accumulator.
function processLines(lines: string[], acc: Acc): Acc {
  if (acc.idx >= lines.length) return acc

  const lineNumber = acc.idx + 1
  const original = lines[acc.idx]
  const line = original.trim()

  // Multi-line description block /*++ ... */
  if (!acc.haveDescription && line.startsWith('/*++')) {
    const consumed = consumeBlock(lines, acc.idx, '/*++')
    const have = consumed.terminated && consumed.collected.length > 0
    const nextAcc = {
      ...acc,
      idx: consumed.nextIdx,
      haveDescription: acc.haveDescription || have,
      descriptionParts: acc.haveDescription
        ? acc.descriptionParts
        : (have ? consumed.collected : acc.descriptionParts),
      raw: consumed.terminated
        ? [...acc.raw, { line: lineNumber, marker: '/*++', text: consumed.collected.join(' ') }]
        : acc.raw,
      diagnostics: consumed.terminated
        ? acc.diagnostics
        : [...acc.diagnostics, { line: lineNumber, issue: 'Unterminated /*++ block' }],
    }
    return processLines(lines, nextAcc)
  }

  // One-line description //++ (with contiguous group)
  if (line.startsWith('//++')) {
    if (!acc.haveDescription) {
      const group = consumeContiguous(lines, acc.idx, '//++')
      const first = group.items[0].slice(4).trim()
      const rest = group.items.slice(1).map((s) => s.slice(4).trim())
      const firstRaw = { line: lineNumber, marker: '//++', text: first }
      const strayRaws = rest.map((text, i) => ({ line: lineNumber + 1 + i, marker: '//++', text }))
      const strayDiagnostics = rest.map((_, i) => ({
        line: lineNumber + 1 + i,
        issue: 'Extra //++ after primary description ignored',
      }))
      const nextAcc = {
        ...acc,
        idx: group.nextIdx,
        haveDescription: true,
        descriptionParts: [first],
        raw: [...acc.raw, firstRaw, ...strayRaws],
        diagnostics: [...acc.diagnostics, ...strayDiagnostics],
      }
      return processLines(lines, nextAcc)
    }
    // Stray //++ after description
    const payload = line.slice(4).trim()
    const nextAcc = {
      ...acc,
      idx: acc.idx + 1,
      raw: [...acc.raw, { line: lineNumber, marker: '//++', text: payload }],
      diagnostics: [...acc.diagnostics, { line: lineNumber, issue: 'Extra //++ after primary description ignored' }],
    }
    return processLines(lines, nextAcc)
  }

  // Example single-line //??
  if (line.startsWith('//??')) {
    const payload = line.slice(4).trim()
    const parsed = parseExamplePayload(payload)
    const example: ParsedExample = { ...parsed, line: lineNumber, raw: payload }
    const nextAcc = {
      ...acc,
      idx: acc.idx + 1,
      examples: [...acc.examples, example],
      raw: [...acc.raw, { line: lineNumber, marker: '//??', text: payload }],
    }
    return processLines(lines, nextAcc)
  }

  // Tech debt //--
  if (line.startsWith('//--')) {
    const reason = line.slice(4).trim()
    const td: ParsedTechDebt = { line: lineNumber, reason, raw: reason }
    const nextAcc = {
      ...acc,
      idx: acc.idx + 1,
      techDebt: [...acc.techDebt, td],
      raw: [...acc.raw, { line: lineNumber, marker: '//--', text: reason }],
      diagnostics: reason ? acc.diagnostics : [...acc.diagnostics, { line: lineNumber, issue: 'Empty tech debt reason' }],
    }
    return processLines(lines, nextAcc)
  }

  // Multi-line example /*?? ... */
  if (line.startsWith('/*??')) {
    const consumed = consumeBlock(lines, acc.idx, '/*??')
    const examples = consumed.collected.map((rawLine) => {
      const parsed = parseExamplePayload(rawLine)
      return { ...parsed, line: lineNumber, raw: rawLine }
    })
    const nextAcc = {
      ...acc,
      idx: consumed.nextIdx,
      examples: [...acc.examples, ...examples],
      raw: [...acc.raw, { line: lineNumber, marker: '/*??', text: consumed.collected.join(' | ') }],
      diagnostics: consumed.collected.length
        ? acc.diagnostics
        : [...acc.diagnostics, { line: lineNumber, issue: 'Empty /*?? block' }],
    }
    return processLines(lines, nextAcc)
  }

  // Default advance
  return processLines(lines, { ...acc, idx: acc.idx + 1 })
}

// Consume a /*++ or /*?? style block starting at index (line already begins with marker)
function consumeBlock(lines: string[], startIdx: number, marker: '/*++' | '/*??'): { collected: string[]; terminated: boolean; nextIdx: number } {
  const first = lines[startIdx].trim()
  const openerPattern = marker === '/*++' ? /^\/\*\+\+/ : /^\/\*\?\?/
  const strippedInitial = first.replace(openerPattern, '')
  const immediateClose = strippedInitial.endsWith('*/')
  if (immediateClose) {
    const inner = strippedInitial.slice(0, -2).trim()
    return {
      collected: inner ? [inner] : [],
      terminated: true,
      nextIdx: startIdx + 1,
    }
  }
  // Walk forward until closing */
  const collected: string[] = []
  const afterFirstIdx = startIdx + 1
  const walk = (
    idx: number,
    accCollected: string[],
  ): { collected: string[]; terminated: boolean; nextIdx: number } => {
    if (idx >= lines.length) {
      return { collected: accCollected, terminated: false, nextIdx: idx }
    }
    const current = lines[idx].trim()
    if (current.endsWith('*/')) {
      const body = current.slice(0, -2).trim()
      const finalCollected = body ? [...accCollected, body] : accCollected
      return { collected: finalCollected, terminated: true, nextIdx: idx + 1 }
    }
    const nextCollected = current ? [...accCollected, current] : accCollected
    return walk(idx + 1, nextCollected)
  }
  return walk(afterFirstIdx, collected)
}

// Consume contiguous //++ lines
function consumeContiguous(lines: string[], startIdx: number, prefix: string): { items: string[]; nextIdx: number } {
  const collect = (idx: number, acc: string[]): { items: string[]; nextIdx: number } => {
    if (idx >= lines.length) return { items: acc, nextIdx: idx }
    const trimmed = lines[idx].trim()
    return trimmed.startsWith(prefix)
      ? collect(idx + 1, [...acc, trimmed])
      : { items: acc, nextIdx: idx }
  }
  return collect(startIdx, [])
}

function parseExamplePayload(payload: string): { code: string; expected?: string } {
  if (!payload) return { code: '' }
  // Split on // for expected result (but ignore leading marker already stripped)
  const parts = payload.split('//')
  if (parts.length > 1) {
    const expected = parts.slice(1).join('//').trim() || undefined
    return { code: parts[0].trim(), expected }
  }
  return { code: payload.trim() }
}
