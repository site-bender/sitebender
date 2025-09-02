/**
 * Enforce repo alias policy for cross-package imports.
 *
 * Policy:
 * - Outside of a package, do NOT import its internal paths directly.
 *   Use the workspace aliases instead:
 *   - libraries/engine/src/**         -> @engineSrc/** (preferred)
 *   - libraries/engine/types/**       -> @engineTypes/** (preferred)
 *   - libraries/adaptive/src/**       -> @adaptiveSrc/** (legacy)
 *   - libraries/adaptive/types/**     -> @adaptiveTypes/** (legacy)
 *   - libraries/toolkit/src/**        -> @toolkit/**
 * - Within a package folder, relative imports are allowed.
 *
 * Scope (default):
 *   - libraries/components/src/**
 *   - docs/src/**
 *   - scripts/**
 *
 * Exit non-zero when violations are found; prints file:line with a fix hint.
 */

const globWalk = async function* (
	root: string,
): AsyncGenerator<string, void, unknown> {
	for await (const entry of Deno.readDir(root)) {
		const full = `${root}/${entry.name}`
		if (entry.isDirectory) {
			yield* globWalk(full)
		} else if (entry.isFile && /\.(ts|tsx)$/.test(entry.name)) {
			yield full
		}
	}
}

type Violation = {
	file: string
	line: number
	spec: string
	hint: string
}

const isInside = (file: string, pkgDir: string) => file.includes(`/${pkgDir}/`)

const ADAPTIVE_SRC = "libraries/adaptive/src/"
const ADAPTIVE_TYPES = "libraries/adaptive/types/"
const ENGINE_SRC = "libraries/engine/src/"
const ENGINE_TYPES = "libraries/engine/types/"
const TOOLKIT_SRC = "libraries/toolkit/src/"

const DEFAULT_SCOPES = [
	"libraries/components/src",
	"docs/src",
	"scripts",
]

const roots = Deno.args.length ? Deno.args : DEFAULT_SCOPES

const violations: Violation[] = []

for (const root of roots) {
	try {
		for await (const file of globWalk(root)) {
			const text = await Deno.readTextFile(file)
			const lines = text.split(/\r?\n/)
			lines.forEach((line, idx) => {
				// crude import matcher (import ... from "..."), also handles export ... from
				const importRe = /(import|export)\s+[^;]*?from\s+["\']([^"\']+)["\']/g
				let m: RegExpExecArray | null
				while ((m = importRe.exec(line))) {
					const spec = m[2]
					// Skip alias imports (desired)
					if (
						spec.startsWith("@adaptiveSrc/") ||
						spec.startsWith("@adaptiveTypes/") ||
						spec.startsWith("@engineSrc/") ||
						spec.startsWith("@engineTypes/") ||
						spec.startsWith("@toolkit/")
					) {
						continue
					}

					// If this file is NOT inside adaptive/, disallow deep adaptive paths
					if (!isInside(file, "libraries/adaptive") && !isInside(file, "libraries/engine")) {
						if (spec.includes(ADAPTIVE_SRC)) {
							violations.push({
								file,
								line: idx + 1,
								spec,
								hint: "Use @adaptiveSrc/… instead of libraries/adaptive/src/…",
							})
						}
						if (spec.includes(ADAPTIVE_TYPES)) {
							violations.push({
								file,
								line: idx + 1,
								spec,
								hint:
									"Use @adaptiveTypes/… instead of libraries/adaptive/types/…",
							})
						}

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
								hint: "Use @engineTypes/… instead of libraries/engine/types/…",
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

if (violations.length) {
	console.error("Alias policy violations:\n")
	for (const v of violations) {
		console.error(`${v.file}:${v.line} -> '${v.spec}'  (${v.hint})`)
	}
	console.error(`\nTotal: ${violations.length} violation(s).`)
	Deno.exit(1)
}

console.log("Alias policy: OK (no violations found).")
