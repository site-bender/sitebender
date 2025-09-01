// deno run -A scripts/migrate/adaptiveTypesAndConstants.ts
// Moves libraries/adaptive/src/{types,constants} to libraries/adaptive/{types,constants}
// and rewrites imports accordingly. Also removes transitional re-export files.

import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts"
import * as path from "https://deno.land/std@0.224.0/path/mod.ts"

const ROOT = Deno.cwd()
const ADAPTIVE = path.join(ROOT, "libraries", "adaptive")
const SRC = path.join(ADAPTIVE, "src")
const SRC_TYPES = path.join(SRC, "types")
const SRC_CONSTANTS = path.join(SRC, "constants")
const DST_TYPES = path.join(ADAPTIVE, "types")
const DST_CONSTANTS = path.join(ADAPTIVE, "constants")

const ensureDir = async (p: string) => {
	await Deno.mkdir(p, { recursive: true }).catch(() => {})
}

async function copyFile(src: string, dst: string) {
	await ensureDir(path.dirname(dst))
	await Deno.copyFile(src, dst)
}

async function copyDir(
	srcDir: string,
	dstDir: string,
	{ skip = new Set<string>() } = {},
) {
	for await (
		const entry of walk(srcDir, { includeDirs: true, includeFiles: true })
	) {
		const rel = path.relative(srcDir, entry.path)
		if (!rel || skip.has(rel.split(path.SEPARATOR)[0])) continue
		const to = path.join(dstDir, rel)
		if (entry.isDirectory) {
			await ensureDir(to)
		} else if (entry.isFile) {
			await copyFile(entry.path, to)
		}
	}
}

async function removeDirIfExists(dir: string) {
	try {
		await Deno.remove(dir, { recursive: true })
	} catch { /* ignore */ }
}

async function updateImports() {
	const fileGlobs = [
		path.join(ADAPTIVE, "src"),
		path.join(ADAPTIVE, "tests"),
		path.join(ROOT, "docs"),
	]
	const tsLike = (p: string) => p.endsWith(".ts") || p.endsWith(".tsx")
	const updates: string[] = []

	for (const base of fileGlobs) {
		try {
			for await (
				const entry of walk(base, {
					includeDirs: false,
					includeFiles: true,
					exts: ["ts", "tsx"],
				})
			) {
				const filePath = entry.path
				if (!tsLike(filePath)) continue
				const text = await Deno.readTextFile(filePath)
				let changed = text

				// Replace absolute-style references to src/types and src/constants if any
				changed = changed.replaceAll("/src/types/", "/types/")
				changed = changed.replaceAll("/src/constants/", "/constants/")

				// Rewrite relative references by resolving and re-relativizing
				changed = rewriteRelativeImports(filePath, changed)

				if (changed !== text) {
					await Deno.writeTextFile(filePath, changed)
					updates.push(path.relative(ROOT, filePath))
				}
			}
		} catch { /* dir may not exist; ignore */ }
	}

	return updates
}

function rewriteRelativeImports(filePath: string, code: string) {
	const importRE =
		/(import\s+[^'"\n]+?from\s+|export\s+\*\s+from\s+|export\s+\{[^}]*\}\s+from\s+)["']([^"']+)["']/g
	const dir = path.dirname(filePath)
	return code.replace(importRE, (_m, prefix, spec) => {
		if (!(spec.startsWith(".") || spec.startsWith(".."))) return _m
		const abs = path.normalize(path.join(dir, spec))
		const relToTypes = path.relative(SRC_TYPES, abs)
		const relToConsts = path.relative(SRC_CONSTANTS, abs)

		const isUnder = (rel: string) =>
			rel && !rel.startsWith("..") && !path.isAbsolute(rel)

		if (isUnder(relToTypes)) {
			const destAbs = path.join(DST_TYPES, relToTypes)
			const newSpec = path.relative(dir, destAbs).split(path.SEPARATOR).join(
				"/",
			)
			return `${prefix}"${newSpec}"`
		}
		if (isUnder(relToConsts)) {
			const destAbs = path.join(DST_CONSTANTS, relToConsts)
			const newSpec = path.relative(dir, destAbs).split(path.SEPARATOR).join(
				"/",
			)
			return `${prefix}"${newSpec}"`
		}
		return _m
	})
}

async function main() {
	console.log("== Adaptive migration: types/constants ==")
	await ensureDir(DST_TYPES)
	await ensureDir(DST_CONSTANTS)

	// Copy types, skipping the canonical ones already at destination
	const skipTop = new Set(["ir", "bus"]) // already canonical at DST_TYPES
	try {
		await copyDir(SRC_TYPES, DST_TYPES, { skip: skipTop })
		console.log("Copied types ->", path.relative(ROOT, DST_TYPES))
	} catch (e) {
		const err = e as unknown as { message?: string }
		console.warn("Types copy skipped or failed:", err?.message ?? e)
	}

	// Copy constants if destination files are missing
	try {
		for await (
			const entry of walk(SRC_CONSTANTS, {
				includeDirs: false,
				includeFiles: true,
			})
		) {
			const rel = path.relative(SRC_CONSTANTS, entry.path)
			const dst = path.join(DST_CONSTANTS, rel)
			try {
				await Deno.lstat(dst)
				// exists -> keep canonical
			} catch {
				await copyFile(entry.path, dst)
			}
		}
		console.log("Synchronized constants")
	} catch { /* ignore missing */ }

	// Remove transitional re-export files if present
	const transitional = [
		path.join(SRC_TYPES, "json", "ir.ts"),
		path.join(SRC_TYPES, "json", "ir", "index.ts"),
	]
	await Promise.all(transitional.map((f) => Deno.remove(f).catch(() => {})))

	// Rewrite imports across the workspace
	const changed = await updateImports()
	console.log(`Rewrote imports in ${changed.length} files`)

	// Remove legacy folders (they should now be unused)
	await removeDirIfExists(SRC_CONSTANTS)
	// If ir/ and bus/ were kept in src/types, try removing entire src/types
	await removeDirIfExists(SRC_TYPES)

	console.log("Migration complete")
}

if (import.meta.main) {
	await main()
}
