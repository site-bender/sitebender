/// <reference lib="deno.ns" />
/**
 * Structural & style rule auditor for scribe (Phase 1).
 * Exits non-zero if violations found.
 */
import { walk } from "https://deno.land/std@0.218.0/fs/walk.ts"

type Manifest = {
  version: string
  rules: Record<string, boolean>
  forbiddenMutableMethods: Array<string>
  sourceGlobs: Array<string>
  testFilePattern: string
}

const manifest: Manifest = JSON.parse(await Deno.readTextFile(new URL('./rules.manifest.json', import.meta.url)))

type Violation = { file: string; line?: number; rule: string; detail: string }

const violations: Array<Violation> = []

function isTestFile(path: string) {
  return /\.test\.ts$/.test(path)
}

function simpleMatch(pattern: string, value: string): boolean {
  // Normalize consecutive ** segments
  const norm = pattern.replace(/\*\*+/g, '**')
  const escaped = norm
    .replace(/[-/\\^$+?.()|[\]{}]/g, '\\$&')
    .replace(/\\\*\\\*/g, '.*') // ** -> .*
    .replace(/\\\*/g, '[^/]*') // * -> segment wildcard
  try {
    const rx = new RegExp('^' + escaped + '$')
    return rx.test(value)
  } catch {
    return false
  }
}

function matchesPositive(path: string) {
  return manifest.sourceGlobs.some(g => !g.startsWith('!') && simpleMatch(g, path))
}

function matchesNegative(path: string) {
  return manifest.sourceGlobs.some(g => g.startsWith('!') && simpleMatch(g.slice(1), path))
}

// Collect candidate files
const candidates: Array<string> = []
for await (const entry of walk(new URL('../../src', import.meta.url))) {
  if (!entry.isFile) continue
  if (!entry.path.endsWith('.ts')) continue
  const rel = entry.path.split('/libraries/scribe/')[1]
  if (!matchesPositive(rel) || matchesNegative(rel)) continue
  candidates.push(entry.path)
}

// Helper: read file once
async function analyzeFile(path: string) {
  const text = await Deno.readTextFile(path)
  const rel = path.split('/libraries/scribe/')[1]
  const lines = text.split(/\r?\n/)

  if (manifest.rules.oneFunctionPerFile && !isTestFile(rel)) {
    const topLevelFunctionCount = lines.filter(l => /^export default function /.test(l.trim())).length
    if (topLevelFunctionCount !== 1) {
      violations.push({ file: rel, rule: 'oneFunctionPerFile', detail: `Expected exactly 1 exported default function, found ${topLevelFunctionCount}` })
    }
  }

  if (manifest.rules.arrayGenericNotation) {
    lines.forEach((l, i) => {
      if (/[^A-Za-z0-9_]\w+\[\]/.test(l) || /:\s*\w+\[\]/.test(l)) {
        if (!l.includes('[] // allow')) {
          violations.push({ file: rel, line: i + 1, rule: 'arrayGenericNotation', detail: 'Use Array<T> instead of T[]' })
        }
      }
    })
  }

  if (manifest.rules.noMutableArrayMethods) {
    manifest.forbiddenMutableMethods.forEach(m => {
      const rx = new RegExp(`\.${m}\(`)
      lines.forEach((l, i) => {
        if (rx.test(l)) violations.push({ file: rel, line: i + 1, rule: 'noMutableArrayMethods', detail: `Found .${m}()` })
      })
    })
  }

  if (manifest.rules.requireScribeMarker && !isTestFile(rel)) {
    const exportIdx = lines.findIndex(l => /^export default function /.test(l.trim()))
    if (exportIdx >= 0) {
      const windowLines = lines.slice(Math.max(0, exportIdx - 6), exportIdx)
      const hasMarker = windowLines.some(l => l.trim().startsWith('//++') || l.trim().startsWith('/*++'))
      if (!hasMarker) violations.push({ file: rel, rule: 'requireScribeMarker', detail: 'Missing Scribe //++ or /*++ marker near exported function' })
    }
  }
}

await Promise.all(candidates.map(analyzeFile))

if (violations.length) {
  console.error('\nSTRUCTURAL VIOLATIONS:')
  for (const v of violations) {
    console.error(`- ${v.rule}: ${v.file}${v.line ? ':' + v.line : ''} :: ${v.detail}`)
  }
  Deno.exit(1)
} else {
  console.log('No structural violations.')
}
