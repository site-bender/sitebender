// Scribe style / structural enforcement
// Usage: deno run --allow-read scripts/enforceScribeStyle/index.ts
// Reads libraries/scribe/SCRIBE_RULES.json and scans targetGlobs.

import { globToRegExp } from "https://deno.land/std@0.224.0/path/mod.ts" // pinned

type ScribeRules = {
  requireMarkerAboveExport: boolean
  requireBlankLineAfterGuardReturn: boolean
  enforceCurriedNesting: boolean
  curriedNestingDepth: number
  forbidNativeArrayMethods: string[]
  guardReturnPattern: string
  targetGlobs: string[]
}

type Violation = { file: string; line: number; rule: string; detail: string }

async function readRules(): Promise<ScribeRules> {
  const raw = await Deno.readTextFile("libraries/scribe/SCRIBE_RULES.json")
  return JSON.parse(raw)
}

async function* iterFiles(globs: string[]) {
  for (const g of globs) {
    const re = globToRegExp(g, { globstar: true })
    for await (const path of walkDir(".")) {
      const rel = path.startsWith("./") ? path.slice(2) : path.replace(/^\.\//, "")
      if (re.test(rel)) yield rel
    }
  }
}

async function* walkDir(dir: string): AsyncGenerator<string> {
  for await (const e of Deno.readDir(dir)) {
    const path = dir === "." ? e.name : `${dir}/${e.name}`
    if (e.isDirectory) {
      yield* walkDir(path)
    } else yield path
  }
}

function checkFile(rules: ScribeRules, file: string, text: string): Violation[] {
  const out: Violation[] = []
  const lines = text.split(/\r?\n/)

  if (rules.requireMarkerAboveExport) {
    lines.forEach((ln, i) => {
      if (/^export default function/.test(ln)) {
        const prev = lines[i - 1] ?? ""
        if (!/^\/\/\+\+/.test(prev)) {
          out.push({ file, line: i + 1, rule: "marker-above-export", detail: "Missing //++ line immediately above export" })
        }
      }
    })
  }

  if (rules.requireBlankLineAfterGuardReturn) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(rules.guardReturnPattern)) {
        const next = lines[i + 1] ?? ""
        if (next.trim() !== "") {
          out.push({ file, line: i + 2, rule: "blank-after-guard", detail: "Expected blank line after guard return" })
        }
      }
    }
  }

  if (rules.enforceCurriedNesting) {
    // simple heuristic: count nested 'return function' in file
    const nestMatches = text.match(/return function /g) || []
    if (nestMatches.length < rules.curriedNestingDepth - 1) {
      out.push({ file, line: 1, rule: "curried-nesting", detail: `Expected >= ${rules.curriedNestingDepth} curried layers` })
    }
  }

  if (rules.forbidNativeArrayMethods.length) {
    const forbid = new RegExp(`\\.(${rules.forbidNativeArrayMethods.join("|")})\\(`)
    lines.forEach((ln, i) => {
      if (forbid.test(ln)) {
        out.push({ file, line: i + 1, rule: "native-array-method", detail: ln.trim() })
      }
    })
  }

  return out
}

export default async function enforceScribeStyle() {
  const rules = await readRules()
  const violations: Violation[] = []
  for await (const file of iterFiles(rules.targetGlobs)) {
    if (!file.endsWith('.ts')) continue
    try {
      const text = await Deno.readTextFile(file)
      violations.push(...checkFile(rules, file, text))
    } catch (e) {
      // ignore unreadable file (permissions / deleted race)
      if (Deno.env.get('SCRIBE_STYLE_DEBUG')) {
        console.error('skip file', file, e)
      }
    }
  }
  if (violations.length) {
    console.error("Scribe style violations:\n")
    for (const v of violations) {
      console.error(`${v.file}:${v.line} [${v.rule}] ${v.detail}`)
    }
    console.error(`\nTotal: ${violations.length}`)
    Deno.exit(1)
  }
  console.log("Scribe style check passed (no violations)")
}

if (import.meta.main) {
  await enforceScribeStyle()
}
