#!/usr/bin/env -S deno run --allow-read --allow-write
// Rewrite deep import specifiers like "libraries/toolkit/src/..." to proper relative paths
// within libraries/components/src/**/*.ts and .tsx.
import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts"
import * as path from "https://deno.land/std@0.224.0/path/mod.ts"

const ROOT = Deno.cwd()
const COMPONENTS_ROOT = path.join(ROOT, "libraries/components/src")

const TARGET_PREFIXES = [
	"libraries/toolkit/src/",
	"libraries/engine/src/",
	"libraries/engine/types/",
	"libraries/engine-types/src/", // safety if present
	"libraries/engine-types/", // safety if present
]

function needsRewrite(spec: string): string | null {
	for (const p of TARGET_PREFIXES) {
		if (spec.startsWith(p)) return p
	}
	return null
}

function toRelative(fromFile: string, absoluteTarget: string): string {
	const fromDir = path.dirname(fromFile)
	let rel = path.relative(fromDir, absoluteTarget)
	// Normalize to posix form for import specifiers
	// Normalize to posix separators for import specifiers
	rel = rel.replaceAll("\\\\", "/")
	if (!rel.startsWith(".")) rel = "./" + rel
	return rel
}

async function processFile(filePath: string) {
	const orig = await Deno.readTextFile(filePath)
	let changed = orig

	// Match import/export ... from "..." | '...'
	const re = /(from\s*["'])([^"']+)(["'])/g

	changed = changed.replace(re, (m, p1, spec, p3) => {
		const prefix = needsRewrite(spec)
		if (!prefix) return m

		// Compute absolute target path on disk
		const absTarget = path.join(ROOT, spec)

		// If the spec points to a directory, try to resolve index.ts or index.tsx
		let target = absTarget
		try {
			const stat = Deno.statSync(absTarget)
			if (stat.isDirectory) {
				// Prefer index.ts, fallback to index.tsx
				const ts = path.join(absTarget, "index.ts")
				const tsx = path.join(absTarget, "index.tsx")
				if (existsSync(ts)) target = ts
				else if (existsSync(tsx)) target = tsx
			}
		} catch {
			// ignore, will attempt as-is
		}

		// Ensure extension is preserved as in original spec when possible
		const finalRel = toRelative(filePath, target)
		return `${p1}${finalRel}${p3}`
	})

	if (changed !== orig) {
		await Deno.writeTextFile(filePath, changed)
		return true
	}
	return false
}

function existsSync(p: string): boolean {
	try {
		Deno.statSync(p)
		return true
	} catch {
		return false
	}
}

let touched = 0
for await (
	const entry of walk(COMPONENTS_ROOT, {
		includeDirs: false,
		exts: [".ts", ".tsx"],
	})
) {
	const filePath = entry.path
	const did = await processFile(filePath)
	if (did) touched++
}

console.log(`normalize-deep-paths: updated ${touched} files`)
