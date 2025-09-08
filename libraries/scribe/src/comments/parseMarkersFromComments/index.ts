// Adapter: classify RawComment[] (from Parser) into marker semantics for Scribe.
// Non-destructive; produces structured diagnostics + grouped content.

export type RawComment = {
  kind: 'line' | 'block'
  text: string       // trimmed interior
  fullText: string   // original including // or /* */
  start: number
  end: number
  line: number
  column: number
  nodeId?: string
}

export type DiagnosticCategory = 'structure' | 'association' | 'quality' | 'consistency' | 'hygiene' | 'semantic'
export type DiagnosticSeverity = 'info' | 'warn' | 'error'

export type Diagnostic = {
  code: string
  category: DiagnosticCategory
  message: string
  line: number
  column?: number
  functionName?: string
  severity: DiagnosticSeverity
  suggestion?: string
}

export type ParsedExample = {
  code: string
  expected?: string
  line: number
  raw: string
  functionName?: string
}

export type ParsedTechDebt = {
  line: number
  reason: string
  raw: string
  functionName?: string
}

export type ParsedMarkerResult = {
  description?: string
  examples: ParsedExample[]
  techDebt: ParsedTechDebt[]
  diagnostics: Diagnostic[]
}

// Diagnostic codes (central list)
export const DIAGNOSTIC = {
  EXTRA_DESCRIPTION: 'COMMENT_EXTRA_DESCRIPTION',
  UNTERMINATED_BLOCK: 'COMMENT_UNTERMINATED_BLOCK', // (reserved; parser should prevent)
  EMPTY_TECHDEBT: 'TECHDEBT_EMPTY_REASON',
  EMPTY_EXAMPLE_BLOCK: 'EXAMPLE_EMPTY_BLOCK',
  AMBIGUOUS_COMMENT: 'COMMENT_AMBIGUOUS_UNASSOCIATED',
} as const

const FIRST_DESCRIPTION_TAKEN = (existing?: string) => Boolean(existing)

export default function parseMarkersFromComments(comments: RawComment[]): ParsedMarkerResult {
  return comments.reduce<ParsedMarkerResult>((acc, c) => {
    const markerType = classifyMarker(c.fullText)
    if (!markerType) {
      // If no node association in multi-function contexts parser may still leave nodeId empty.
      if (!c.nodeId && couldBeAmbiguous(comments)) {
        acc.diagnostics.push({
          code: DIAGNOSTIC.AMBIGUOUS_COMMENT,
          category: 'association',
          message: 'Unassociated comment in potential multi-function context',
          line: c.line,
          column: c.column,
          severity: 'info',
        })
      }
      return acc
    }

    switch (markerType.kind) {
      case 'description': {
        if (FIRST_DESCRIPTION_TAKEN(acc.description)) {
          acc.diagnostics.push({
            code: DIAGNOSTIC.EXTRA_DESCRIPTION,
            category: 'structure',
            message: 'Extra description marker ignored',
            line: c.line,
            column: c.column,
            functionName: c.nodeId,
            severity: 'warn',
            suggestion: 'Remove or merge with primary description',
          })
        } else {
          acc.description = markerType.value
        }
        return acc
      }
      case 'example': {
        markerType.examples.forEach(ex => acc.examples.push({
          ...ex,
          line: c.line,
          functionName: c.nodeId,
        }))
        if (markerType.examples.length === 0) {
          acc.diagnostics.push({
            code: DIAGNOSTIC.EMPTY_EXAMPLE_BLOCK,
            category: 'quality',
            message: 'Empty example block',
            line: c.line,
            column: c.column,
            severity: 'info',
          })
        }
        return acc
      }
      case 'techDebt': {
        const reason = markerType.reason.trim()
        acc.techDebt.push({ line: c.line, raw: reason, reason, functionName: c.nodeId })
        if (!reason) {
          acc.diagnostics.push({
            code: DIAGNOSTIC.EMPTY_TECHDEBT,
            category: 'quality',
            message: 'Empty tech debt reason',
            line: c.line,
            column: c.column,
            functionName: c.nodeId,
            severity: 'warn',
            suggestion: 'Provide a concise justification after //--',
          })
        }
        return acc
      }
    }
  }, { description: undefined, examples: [], techDebt: [], diagnostics: [] })
}

function classifyMarker(full: string):
  | { kind: 'description'; value: string }
  | { kind: 'example'; examples: Array<{ code: string; expected?: string; raw: string }> }
  | { kind: 'techDebt'; reason: string }
  | undefined {
  const trimmed = full.trim()
  if (trimmed.startsWith('//++')) {
    return { kind: 'description', value: trimmed.slice(4).trim() }
  }
  if (trimmed.startsWith('/*++')) {
    return { kind: 'description', value: stripBlock(trimmed) }
  }
  if (trimmed.startsWith('//??')) {
    const ex = parseExample(trimmed.slice(4).trim())
    return { kind: 'example', examples: [ex] }
  }
  if (trimmed.startsWith('/*??')) {
    const body = stripBlock(trimmed)
    const lines = body.split(/\r?\n/).map(l => l.trim()).filter(Boolean)
    const examples = lines.map(parseExample)
    return { kind: 'example', examples }
  }
  if (trimmed.startsWith('//--')) {
    return { kind: 'techDebt', reason: trimmed.slice(4) }
  }
  if (trimmed.startsWith('/*--')) {
    return { kind: 'techDebt', reason: stripBlock(trimmed) }
  }
  return undefined
}

function stripBlock(full: string): string {
  // Remove /*?? or /*++ or /*-- prefix and trailing */
  return full
    .replace(/^\/\*\+\+/, '')
    .replace(/^\/\*\?\?/, '')
    .replace(/^\/\*--/, '')
    .replace(/\*\/$/, '')
    .trim()
}

function parseExample(raw: string): { code: string; expected?: string; raw: string } {
  if (!raw) return { code: '', raw }
  const parts = raw.split('//')
  if (parts.length > 1) {
    const code = parts[0].trim()
    const expected = parts.slice(1).join('//').trim() || undefined
    return { code, expected, raw }
  }
  return { code: raw.trim(), raw }
}

function couldBeAmbiguous(comments: RawComment[]): boolean {
  // Heuristic: if any comment has nodeId and at least one lacks nodeId, and count of distinct nodeIds > 1
  const withNode = new Set(comments.filter(c => c.nodeId).map(c => c.nodeId))
  const anyWithout = comments.some(c => !c.nodeId)
  return withNode.size > 1 && anyWithout
}
