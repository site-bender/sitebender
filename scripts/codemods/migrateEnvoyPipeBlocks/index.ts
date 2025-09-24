#!/usr/bin/env -S deno run -A
/**
 * Migrate all Envoy multi-line example/help blocks from mixed asterisk lines to pipe-prefixed style.
 *
 * Example before:
 *   [OPEN]
 *    * [EXAMPLE] Something
 *    * more lines
 *   [CLOSE]
 *
 * Example after:
 *   [OPEN]
 *    | [EXAMPLE] Something
 *    | more lines
 *   [CLOSE]
 *
 * Scope: only .ts / .tsx sources under applications/, libraries/, plugins/, scripts/
 * Docs (md) and other files are excluded.
 *
 * Usage:
 *   deno run -A scripts/codemods/migrateEnvoyPipeBlocks/index.ts             # default roots
 *   deno run -A scripts/codemods/migrateEnvoyPipeBlocks/index.ts path/to/dir # limit scope
 *   deno run -A scripts/codemods/migrateEnvoyPipeBlocks/index.ts --dry       # preview only
 */

// Uses Deno namespace; script is intended to run with Deno permissions

import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import includes from "@sitebender/toolsmith/vanilla/array/includes/index.ts"
import join from "@sitebender/toolsmith/vanilla/array/join/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import indexOf from "@sitebender/toolsmith/vanilla/string/indexOf/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"
import slice from "@sitebender/toolsmith/vanilla/string/slice/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import startsWith from "@sitebender/toolsmith/vanilla/string/startsWith/index.ts"
import endsWith from "@sitebender/toolsmith/vanilla/string/endsWith/index.ts"
import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"

const ROOT: string = Deno.cwd()
const TARGET_DIRS = [
	"applications",
	"libraries",
	"plugins",
	"scripts",
]

const isTsFile = (p: string) => /\.(ts|tsx)$/.test(p)
const OPEN = "/*??"
const CLOSE = "*/"

function transformBlockBody(body: string, indent: string): string {
	const lines = split(body, "\n")
	const out = map(lines, function transformLine(raw: string): string {
		// Remove leading whitespace
		let s = replace(raw, /^\s+/, "")
		// Strip a single leading '*' if present, plus a single following space
		if (startsWith(s, "*")) s = slice(s, 1)
		if (startsWith(s, " ")) s = slice(s, 1)
		// If it already starts with a pipe, strip the first pipe and at most one space
		if (startsWith(s, "|")) {
			s = replace(s, /^\|\s?/, "")
		}
		// Normalize empty vs non-empty lines
		const trimmed = replace(s, /\r?$/, "")
		if (trim(trimmed).length === 0) {
			return `${indent} |`
		} else {
			return `${indent} | ${trimmed}`
		}
	})
	return join(out, "\n")
}

function migrate(content: string): { changed: boolean; text: string } {
	let i = 0
	let changed = false
	let out = ""

	let inSingle = false
	let inDouble = false
	let inTemplate = false
	let inLineComment = false
	let inBlockComment = false

	const len = content.length
	while (i < len) {
		const ch = content[i]!
		const next = content[i + 1] ?? ""

		// Handle end of line comment
		if (inLineComment) {
			out += ch
			if (ch === "\n") inLineComment = false
			i++
			continue
		}

		// Handle block comments that are not our target: just copy until close
		if (inBlockComment) {
			out += ch
			if (ch === "*" && next === "/") {
				out += next
				i += 2
				inBlockComment = false
			} else {
				i++
			}
			continue
		}

		// Handle strings
		if (inSingle) {
			out += ch
			if (ch === "\\") {
				out += next
				i += 2
				continue
			}
			if (ch === "'") inSingle = false
			i++
			continue
		}
		if (inDouble) {
			out += ch
			if (ch === "\\") {
				out += next
				i += 2
				continue
			}
			if (ch === '"') inDouble = false
			i++
			continue
		}
		if (inTemplate) {
			out += ch
			if (ch === "\\") {
				out += next
				i += 2
				continue
			}
			if (ch === "`") inTemplate = false
			i++
			continue
		}

		// Not in string/comment: look for comment/string starts
		if (ch === "/" && next === "/") {
			inLineComment = true
			out += ch + next
			i += 2
			continue
		}
		if (ch === "/" && next === "*") {
			// Check if it's our /*?? marker
			const maybe = slice(content, i, i + OPEN.length)
			if (maybe === OPEN) {
				// Determine indentation (spaces before this on the current line)
				const lineStart = content.lastIndexOf("\n", i - 1) + 1
				const indent = slice(content, lineStart, i).match(/^\s*/)?.[0] ?? ""

				const bodyStart = i + OPEN.length
				const closeIdx = indexOf(content, CLOSE, bodyStart)
				if (closeIdx === -1) {
					out += ch
					i++
					continue
				}

				const rawBody = slice(content, bodyStart, closeIdx)
				// Skip single-line blocks (no newline)
				if (!includes(rawBody, "\n")) {
					out += slice(content, i, closeIdx + CLOSE.length)
					i = closeIdx + CLOSE.length
					continue
				}

				const body = replace(replace(rawBody, /^\n/, ""), /\n$/, "")
				const lines = split(body, "\n")
				const nonEmpty = filter(lines, (l) => trim(l).length > 0)
				const pipeStyled = nonEmpty.length > 0 &&
					nonEmpty.every((l) => startsWith(l.trimStart(), "|"))

				if (pipeStyled) {
					// Already migrated; preserve original
					out += content.slice(i, closeIdx + CLOSE.length)
				} else {
					const transformed = transformBlockBody(body, indent)
					out += `${OPEN}\n${transformed}\n${indent}${CLOSE}`
					changed = true
				}
				i = closeIdx + CLOSE.length
				continue
			} else {
				// some other block comment; copy normally until close
				inBlockComment = true
				out += ch + next
				i += 2
				continue
			}
		}
		if (ch === "'") {
			inSingle = true
			out += ch
			i++
			continue
		}
		if (ch === '"') {
			inDouble = true
			out += ch
			i++
			continue
		}
		if (ch === "`") {
			inTemplate = true
			out += ch
			i++
			continue
		}

		// default copy
		out += ch
		i++
	}
	return { changed, text: out }
}

type RunOpts = { roots: string[]; dryRun: boolean }

async function* iteratePaths(roots: string[]): AsyncGenerator<string> {
	async function* walkDir(dir: string): AsyncGenerator<string> {
		try {
			for await (const entry of Deno.readDir(dir)) {
				const full = (endsWith(dir, "/") ? dir : dir + "/") + entry.name
				if (entry.isDirectory) {
					yield* walkDir(full)
				} else if (entry.isFile) {
					yield full
				}
			}
		} catch (_e) {
			// ignore permission or missing errors for this pass
		}
	}

	// Precompute absolute roots
	const absRoots = roots.map((root) =>
		root.startsWith("/") ? root : (ROOT.endsWith("/") ? ROOT : ROOT + "/") + root,
	)

	// Batch stat calls to avoid await-in-loop
	const stats = await Promise.all(
		absRoots.map((abs) =>
			Deno.stat(abs).then((s) => ({ abs, s })).catch(() => ({ abs, s: null })),
		),
	)

	for (const { abs, s } of stats) {
		if (s?.isFile) {
			if (isTsFile(abs)) yield abs
			continue
		}
		for await (const p of walkDir(abs)) {
			if (isTsFile(p)) yield p
		}
	}
}

async function run({ roots, dryRun }: RunOpts) {
	let updated: string[] = []
	for await (const path of iteratePaths(roots)) {
		const raw = await Deno.readTextFile(path)
		if (!includes(raw, OPEN)) continue
		const { changed, text } = migrate(raw)
		if (changed && text !== raw) {
			if (!dryRun) await Deno.writeTextFile(path, text)
			updated = [...updated, path]
		}
	}
	const action = dryRun ? "Would migrate" : "Migrated"
	console.log(`${action} ${updated.length} files to pipe-styled Envoy blocks.`)
	if (updated.length) {
		for (const p of updated) console.log(` - ${p}`)
	}
}

function parseArgs(): RunOpts {
	let roots: string[] = []
	let dryRun = false
	for (const a of Deno.args) {
		if (a === "--dry" || a === "--dry-run") {
			dryRun = true
			continue
		}
		roots = [...roots, a]
	}
	if (roots.length === 0) {
		roots = [...roots,
			...map(TARGET_DIRS, (d) => (endsWith(ROOT, "/") ? ROOT : ROOT + "/") + d),
		]
	}
	return { roots, dryRun }
}

if (import.meta.main) {
	run(parseArgs())
}
