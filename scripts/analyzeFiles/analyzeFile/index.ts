import { relative } from "jsr:@std/path"

import type { PerFileAnalysis, FileFunction } from "../types/index.ts"

import stripCommentsAndStrings from "../../enforceFP/stripCommentsAndStrings/index.ts"

export default async function analyzeFile(opts: { absPath: string; root: string; onlyDefault?: boolean }): Promise<PerFileAnalysis> {
  const text = await Deno.readTextFile(opts.absPath)
  const lines = text.split("\n")
  // Strip comments/strings to avoid false positives
  const clean = stripCommentsAndStrings(text)

  const fns: FileFunction[] = []
  type Hit = { index: number; name: string; kind: "block" | "concise" }
  const hits: Hit[] = []
  const nonDefaultExported: Set<string> = new Set()
  const defaultNames: Set<string> = new Set()

  // 1) Function declarations (supports async/generator and optional name)
  const reDecl = /(export\s+default\s+)?(async\s+)?function(\s*\*)?\s*([A-Za-z0-9_$]+)?\s*\(/g
  // 2) Named function expressions: const x = function() {}/async/generator
  const reNamedExpr = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(async\s+)?function(\s*\*)?\s*\(/g
  // 3) Arrow with block body: const x = (...) => { ... }
  const reArrowBlock = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*\{/g
  // 4) Arrow with concise body: const x = (...) => expr
  const reArrowConcise = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(?!\{)/g
  // 5) export default arrow/function without name
  const reExportDefaultArrow = /export\s+default\s+(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(\{)?/g
  // capture `export default Name` (identifier or function name); not arrow/function keyword ahead
  const reExportDefaultName = /\bexport\s+default\s+([A-Za-z0-9_$]+)\b(?!\s*\()/g
  // `export { X as default }`
  const reLocalExportAsDefault = /\bexport\s*\{([\s\S]*?)\}/g
  // 6) Exported named const function/arrow: export const X = function|=>
  const reExportNamedExprFunc = /\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?function/g
  const reExportNamedExprArrow = /\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>/g
  // 7) Exported function declaration (named, non-default)
  const reExportFunctionDecl = /\bexport\s+(?:async\s+)?function\s+([A-Za-z0-9_$]+)/g
  // 8) Local named export list (no 'from'): export { A, B as C }
  const reLocalNamedExportList = /\bexport\s*\{([\s\S]*?)\}\s*(?!from\b)/g

  let m: RegExpExecArray | null
  // function declarations
  while ((m = reDecl.exec(clean))) {
    const idx = m.index
    const isDefault = !!m[1]
    const name = (m[4] && m[4].trim().length ? m[4] : (isDefault ? "<default>" : "<anonymous>"))
    // if onlyDefault is set, skip non-default declarations
    if (!opts.onlyDefault || isDefault) hits.push({ index: idx, name, kind: "block" })
    // Track non-default exported function declarations separately
    if (!isDefault && m[0].startsWith("export")) {
      if (name && name !== "<anonymous>") nonDefaultExported.add(name)
    }
    // Track default name if present on default function decl: export default function Name() {}
    if (isDefault && name && name !== "<default>" && name !== "<anonymous>") {
      defaultNames.add(name)
    }
  }
  // named function expressions
  while ((m = reNamedExpr.exec(clean))) {
    if (!opts.onlyDefault) hits.push({ index: m.index, name: m[1], kind: "block" })
  }
  // arrow with block
  while ((m = reArrowBlock.exec(clean))) {
    if (!opts.onlyDefault) hits.push({ index: m.index, name: m[1], kind: "block" })
  }
  // arrow concise
  while ((m = reArrowConcise.exec(clean))) {
    if (!opts.onlyDefault) hits.push({ index: m.index, name: m[1], kind: "concise" })
  }
  // export default arrow (name unknown)
  while ((m = reExportDefaultArrow.exec(clean))) {
    // If group 1 exists, it has a block body, else concise
    const kind: Hit["kind"] = m[1] ? "block" : "concise"
    hits.push({ index: m.index, name: "<default>", kind })
  }
  // export default Name
  while ((m = reExportDefaultName.exec(clean))) {
    defaultNames.add(m[1])
  }
  // export { X as default }
  while ((m = reLocalExportAsDefault.exec(clean))) {
    const inside = m[1]
    const entries = inside.split(",").map((s) => s.trim()).filter(Boolean)
    for (const entry of entries) {
      const parts = entry.split(/\s+as\s+/i).map((s) => s.trim()).filter(Boolean)
      if (parts.length === 2 && /^(default)$/i.test(parts[1]) && parts[0]) {
        defaultNames.add(parts[0])
      }
    }
  }
  // exported named const function
  while ((m = reExportNamedExprFunc.exec(clean))) {
    nonDefaultExported.add(m[1])
  }
  // exported named const arrow
  while ((m = reExportNamedExprArrow.exec(clean))) {
    nonDefaultExported.add(m[1])
  }
  // exported function declaration (non-default)
  while ((m = reExportFunctionDecl.exec(clean))) {
    nonDefaultExported.add(m[1])
  }
  // local export list without 'from' — include names that correspond to detected functions
  const functionNames = new Set<string>()
  for (const h of hits) if (h.name && !h.name.startsWith("<")) functionNames.add(h.name)
  let listMatch: RegExpExecArray | null
  while ((listMatch = reLocalNamedExportList.exec(clean))) {
    const inside = listMatch[1]
    const names = inside.split(",").map((s) => s.trim()).filter(Boolean)
    for (const entry of names) {
      // support "Name as Alias" — take the exported alias name (after 'as')
      const parts = entry.split(/\s+as\s+/i).map((s) => s.trim()).filter(Boolean)
      const exportedName = parts[parts.length - 1]
      // Only flag if this corresponds to a function we detected in this file
      if (functionNames.has(exportedName)) nonDefaultExported.add(exportedName)
    }
  }

  // Sort hits by index to produce stable ordering, then compute line/loc
  hits.sort((a, b) => a.index - b.index)

  for (const h of hits) {
    const before = clean.slice(0, h.index)
    const startLine = before.split("\n").length
    let loc: number
    if (h.kind === "block") {
      // Estimate by brace balancing from the starting line in the ORIGINAL text
      loc = estimateFunctionLoc(text, startLine)
    } else {
      // Concise body arrow: best-effort 1 LOC
      loc = 1
    }
    const endLine = startLine + Math.max(0, loc - 1)
    fns.push({ name: h.name, loc, startLine, endLine })
  }

  return {
    pathAbs: opts.absPath,
    pathRel: relative(opts.root, opts.absPath),
    lines: lines.length,
  functions: fns,
  nonDefaultExported: nonDefaultExported.size ? Array.from(nonDefaultExported).sort() : undefined,
  defaultNames: defaultNames.size ? Array.from(defaultNames).sort() : undefined,
  }
}

function estimateFunctionLoc(source: string, startLine: number): number {
  // very rough: from startLine, search forward for balanced braces; fallback to 1 line
  const lines = source.split("\n")
  let depth = 0
  let started = false
  for (let i = startLine - 1; i < lines.length; i++) {
    const l = lines[i]
    for (const ch of l) {
      if (ch === "{") { depth++; started = true }
      else if (ch === "}") { depth--; }
    }
    if (started && depth <= 0) {
      return i - (startLine - 1) + 1
    }
  }
  return 1
}
