#!/usr/bin/env -S deno run -A --unstable-temporal
/**
 * Report all deno-coverage-ignore markers across the repo, grouped by package/app.
 *
 * Markers supported:
 *  - deno-coverage-ignore
 *  - deno-coverage-ignore-start ... deno-coverage-ignore-stop
 *
 * Rules: Every ignore must include an explanation comment on the same line (single-line),
 * or on the first line after -start, beginning with a human-readable reason.
 */

import { join, relative } from "jsr:@std/path@^1.0.8"

// Root directories to scan
const ROOT = new URL("../../", import.meta.url)
const SCAN_DIRS = [
  "docs",
  "jsxer",
  "libraries/engine",
  "libraries/components",
  "libraries/toolkit",
  "scripts",
]

// File globs: consider TS/TSX and JS files
const exts = [".ts", ".tsx", ".js", ".jsx"]

// Regexes/tokens to detect markers and reason text (limit to '//' comment usage)
const SINGLE_RE = /(\/\/.*?deno-coverage-ignore)([^\n]*)/
const START_RE = /(\/\/.*?deno-coverage-ignore-start)([^\n]*)/
const STOP_RE = /\/\/.*?deno-coverage-ignore-stop/

// Try to infer a package/app label from path
function groupLabel(absPath: string): string {
  const rel = relative(fromFileUrl(ROOT), absPath)
  if (rel.startsWith("libraries/")) {
    const seg = rel.split("/")
    return seg.length >= 2 ? `libraries/${seg[1]}` : "libraries"
  }
  if (rel.startsWith("docs/")) return "docs"
  if (rel.startsWith("jsxer/")) return "jsxer"
  if (rel.startsWith("scripts/")) return "scripts"
  return "root"
}

function fromFileUrl(u: URL): string {
  return Deno.build.os === "windows" ? u.href.replace("file:///", "") : u.pathname
}

type IgnoreRecord = {
  file: string
  line: number
  type: "single" | "block"
  reason: string
}

const groups = new Map<string, IgnoreRecord[]>()

async function* walkDir(dir: string): AsyncGenerator<string> {
  for await (const entry of Deno.readDir(dir)) {
    const p = join(dir, entry.name)
    if (entry.isDirectory) {
      // Skip common junk/outputs
      if (/^(dist|coverage|node_modules|temp|tests|fixtures)\/?$/.test(entry.name)) continue
      yield* walkDir(p)
    } else if (entry.isFile) {
      if (exts.some((e) => p.endsWith(e))) yield p
    }
  }
}

function addRecord(label: string, rec: IgnoreRecord) {
  if (!groups.has(label)) groups.set(label, [])
  groups.get(label)!.push(rec)
}

async function scanFile(path: string) {
  const text = await Deno.readTextFile(path)
  const lines = text.split("\n")
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    // Handle block ignore first to avoid misclassifying -start/-stop as single
    let m = line.match(START_RE)
    if (m) {
      const startLine = i
      const firstReason = m[2]?.trim().replace(/^[:\-\s]+/, "") || "<no reason provided>"
      let j = i + 1
      let foundStop = false
      while (j < lines.length) {
        if (STOP_RE.test(lines[j])) { foundStop = true; break }
        j++
      }
      addRecord(groupLabel(path), { file: path, line: startLine + 1, type: "block", reason: firstReason })
      i = foundStop ? j + 1 : i + 1
      continue
    }
    // Skip explicit -stop lines (block already consumed them)
    if (STOP_RE.test(line)) { i++; continue }
    // Single-line ignore (now safe to match)
    m = line.match(SINGLE_RE)
    if (m) {
      const reason = m[2]?.trim().replace(/^[:\-\s]+/, "") || "<no reason provided>"
      addRecord(groupLabel(path), { file: path, line: i + 1, type: "single", reason })
      i++
      continue
    }
    i++
  }
}

async function main() {
  const rootFsPath = fromFileUrl(ROOT)
  for (const dir of SCAN_DIRS) {
    const abs = join(rootFsPath, dir)
    try {
      for await (const f of walkDir(abs)) await scanFile(f)
    } catch (_) {
      // Ignore missing dirs in some checkouts
    }
  }

  // Output report
  if (groups.size === 0) {
    console.log("No deno-coverage-ignore markers found.")
    return
  }

  const labels = Array.from(groups.keys()).sort()
  let total = 0
  for (const label of labels) {
    const recs = groups.get(label)!.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)
    total += recs.length
    console.log(`\n=== ${label} (${recs.length}) ===`)
    for (const r of recs) {
      const rel = relative(rootFsPath, r.file)
      console.log(`- ${r.type.toUpperCase()} | ${rel}:${r.line}`)
      console.log(`  reason: ${r.reason || "<no reason provided>"}`)
    }
  }
  console.log(`\nTotal ignored items: ${total}`)
}

if (import.meta.main) {
  await main()
}
