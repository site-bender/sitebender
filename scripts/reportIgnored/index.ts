#!/usr/bin/env -S deno run -A --unstable-temporal
/**
 * Report all deno-coverage-ignore markers across the repo, grouped by package/app.
 * Default export is provided; script also runnable via CLI.
 */

import { join, relative } from "jsr:@std/path@^1.0.8"

import runCli, { type CliRunArgs } from "../utilities/cli/runCli/index.ts"

// Determine repo root (assume task is run from repo root)
const DEFAULT_REPO_ROOT = Deno.cwd()
const DEFAULT_SCAN_DIRS = [
	"docs",
	"playground",
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
function groupLabel(root: string, absPath: string): string {
	const rel = relative(root, absPath)
	if (rel.startsWith("libraries/")) {
		const seg = rel.split("/")
		return seg.length >= 2 ? `libraries/${seg[1]}` : "libraries"
	}
	if (rel.startsWith("docs/")) return "docs"
	if (rel.startsWith("playground/")) return "playground"
	if (rel.startsWith("scripts/")) return "scripts"
	return "root"
}

// no-op helper removed (was only used for URL → path)

type IgnoreRecord = {
	file: string
	line: number
	type: "single" | "block"
	reason: string
}

async function* walkFolder(dir: string): AsyncGenerator<string> {
	for await (const entry of Deno.readDir(dir)) {
		const p = join(dir, entry.name)
		if (entry.isDirectory) {
			// Skip common junk/outputs
			if (
				/^(dist|coverage|node_modules|temp|tests|fixtures)\/?$/.test(
					entry.name,
				)
			) continue
			yield* walkFolder(p)
		} else if (entry.isFile) {
			if (exts.some((e) => p.endsWith(e))) yield p
		}
	}
}

function addRecord(
	groups: Map<string, IgnoreRecord[]>,
	label: string,
	rec: IgnoreRecord,
) {
	if (!groups.has(label)) groups.set(label, [])
	groups.get(label)!.push(rec)
}

async function scanFile(
	groups: Map<string, IgnoreRecord[]>,
	root: string,
	path: string,
) {
	const text = await Deno.readTextFile(path)
	const lines = text.split("\n")
	let i = 0
	while (i < lines.length) {
		const line = lines[i]
		// Handle block ignore first to avoid misclassifying -start/-stop as single
		let m = line.match(START_RE)
		if (m) {
			const startLine = i
			const firstReason = m[2]?.trim().replace(/^[:\-\s]+/, "") ||
				"<no reason provided>"
			let j = i + 1
			let foundStop = false
			while (j < lines.length) {
				if (STOP_RE.test(lines[j])) {
					foundStop = true
					break
				}
				j++
			}
			addRecord(groups, groupLabel(root, path), {
				file: path,
				line: startLine + 1,
				type: "block",
				reason: firstReason,
			})
			i = foundStop ? j + 1 : i + 1
			continue
		}
		// Skip explicit -stop lines (block already consumed them)
		if (STOP_RE.test(line)) {
			i++
			continue
		}
		// Single-line ignore (now safe to match)
		m = line.match(SINGLE_RE)
		if (m) {
			const reason = m[2]?.trim().replace(/^[:\-\s]+/, "") ||
				"<no reason provided>"
			addRecord(groups, groupLabel(root, path), {
				file: path,
				line: i + 1,
				type: "single",
				reason,
			})
			i++
			continue
		}
		i++
	}
}

export default async function reportCoverageIgnores(
	opts?: { root?: string; scanDirs?: string[]; json?: boolean },
) {
	const rootFsPath = opts?.root ?? DEFAULT_REPO_ROOT
	const dirs = opts?.scanDirs ?? DEFAULT_SCAN_DIRS
	const groups = new Map<string, IgnoreRecord[]>()
	for (const dir of dirs) {
		const abs = join(rootFsPath, dir)
		try {
			for await (const f of walkFolder(abs)) {
				await scanFile(groups, rootFsPath, f)
			}
		} catch (_) {
			// Ignore missing dirs in some checkouts
		}
	}

	// Output report
	if (opts?.json) {
		const json = Object.fromEntries(
			Array.from(groups.entries()).map(([label, recs]) => [
				label,
				recs
					.slice()
					.sort((a, b) =>
						a.file.localeCompare(b.file) || a.line - b.line
					)
					.map((r) => ({ ...r, file: relative(rootFsPath, r.file) })),
			]),
		)
		console.log(JSON.stringify(json, null, 2))
		return
	}

	if (groups.size === 0) {
		console.log("No deno-coverage-ignore markers found.")
		return
	}

	const labels = Array.from(groups.keys()).sort()
	let total = 0
	for (const label of labels) {
		const recs = groups.get(label)!.sort((a, b) =>
			a.file.localeCompare(b.file) || a.line - b.line
		)
		total += recs.length
		console.log(`\n=== ${label} (${recs.length}) ===`)
		for (const r of recs) {
			const rel = relative(rootFsPath, r.file)
			const hasNoReason = r.reason === "<no reason provided>"
			console.log(`- ${r.type.toUpperCase()} | ${rel}:${r.line}`)
			if (hasNoReason) {
				// Bright red ANSI color code for missing reasons
				console.log(`  \x1b[91mreason: ${r.reason}\x1b[0m`)
			} else {
				console.log(`  reason: ${r.reason}`)
			}
		}
	}
	console.log(`\nTotal ignored items: ${total}`)
}

if (import.meta.main) {
	await runCli({
		name: "coverage-report-ignored",
		version: "1.0.0",
		usage:
			"coverage-report-ignored [--json] [--root <path>] [--folders a,b,c]\n\nExamples:\n  coverage-report-ignored --json\n  coverage-report-ignored --root . --folders libraries/engine,docs",
		booleans: ["json"],
		aliases: { j: "json", d: "dirs", f: "folders", r: "root" },
		onRun: async ({ flags, options }: CliRunArgs) => {
			const dirsOpt = options["folders"] ?? options["dirs"]
			const scanDirs = typeof dirsOpt === "string"
				? (dirsOpt as string).split(",").map((s) => s.trim()).filter(
					Boolean,
				)
				: Array.isArray(dirsOpt)
				? (dirsOpt as string[])
				: undefined
			const root = typeof options["root"] === "string"
				? String(options["root"])
				: undefined
			await reportCoverageIgnores({ root, scanDirs, json: flags.json })
			return 0
		},
	})
}
