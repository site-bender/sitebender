#!/usr/bin/env -S deno run --allow-read
/**
 * Enforce repo alias policy for cross-package imports.
 *
 * Policy:
 * - Outside of a package, do NOT import its internal paths directly.
 *   Use the workspace aliases instead:
 *   - libraries/engine/src/**         -> @engineSrc/**
 *   - libraries/engine/types/**       -> @engineTypes/**
 *   - libraries/toolkit/src/**        -> @toolkit/**
 * - Within a package folder, relative imports are allowed.
 *
 * Scope (default):
 *   - libraries/components/src/**
 *   - docs/src/**
 *   - scripts/**
 *
 * Returns violations when used as a library; exits non-zero in CLI mode.
 */

type Violation = {
	file: string
	line: number
	spec: string
	hint: string
}

const ENGINE_SRC = "libraries/engine/src/"
const ENGINE_TYPES = "libraries/engine/types/"
const TOOLKIT_SRC = "libraries/toolkit/src/"

const DEFAULT_SCOPES = [
	"libraries/components/src",
	"docs/src",
	"scripts",
]

const isInside = (file: string, pkgDir: string) => file.includes(`/${pkgDir}/`)

const importPattern = /(import|export)\s+[^;]*?from\s+["']([^"']+)["']/g

async function* globWalk(root: string): AsyncGenerator<string> {
	for await (const entry of Deno.readDir(root)) {
		const full = `${root}/${entry.name}`
		if (entry.isDirectory) {
			yield* globWalk(full)
		} else if (entry.isFile && /\.(ts|tsx)$/.test(entry.name)) {
			yield full
		}
	}
}

async function findViolations(roots: string[]): Promise<Violation[]> {
	const violations: Violation[] = []
	for (const root of roots) {
		try {
			for await (const file of globWalk(root)) {
				const text = await Deno.readTextFile(file)
				const lines = text.split(/\r?\n/)
				lines.forEach((line, idx) => {
					let m: RegExpExecArray | null
					importPattern.lastIndex = 0
					while ((m = importPattern.exec(line))) {
						const spec = m[2]
						// Skip desired alias imports
						if (
							spec.startsWith("@engineSrc/") ||
							spec.startsWith("@engineTypes/") ||
							spec.startsWith("@toolkit/")
						) {
							continue
						}

						// If this file is NOT inside engine/, disallow deep engine paths
						if (!isInside(file, "libraries/engine")) {
							if (spec.includes(ENGINE_SRC)) {
								violations.push({
									file,
									line: idx + 1,
									spec,
									hint: "Use @engineSrc/… instead of libraries/engine/src/…",
								})
							}
							if (spec.includes(ENGINE_TYPES)) {
								violations.push({
									file,
									line: idx + 1,
									spec,
									hint:
										"Use @engineTypes/… instead of libraries/engine/types/…",
								})
							}
						}

						// If this file is NOT inside toolkit/, disallow deep toolkit paths
						if (!isInside(file, "libraries/toolkit")) {
							if (spec.includes(TOOLKIT_SRC)) {
								violations.push({
									file,
									line: idx + 1,
									spec,
									hint: "Use @toolkit/… instead of libraries/toolkit/src/…",
								})
							}
						}
					}
				})
			}
		} catch (err) {
			// Non-fatal: missing scope directory
			if (!(err instanceof Deno.errors.NotFound)) throw err
		}
	}
	return violations
}

export default async function runAliasGuards(
	rootsArg?: string[],
): Promise<Violation[]> {
	const roots = rootsArg?.length ? rootsArg : DEFAULT_SCOPES
	return await findViolations(roots)
}

if (import.meta.main) {
	const roots = Deno.args.length ? Deno.args : DEFAULT_SCOPES
	const violations = await runAliasGuards(roots)
	if (violations.length) {
		console.error("Alias policy violations:\n")
		for (const v of violations) {
			console.error(`${v.file}:${v.line} -> '${v.spec}'  (${v.hint})`)
		}
		console.error(`\nTotal: ${violations.length} violation(s).`)
		Deno.exit(1)
	}
	console.log("Alias policy: OK (no violations found).")
}
