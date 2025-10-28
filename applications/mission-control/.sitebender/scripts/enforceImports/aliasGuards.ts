/**
 * Enforce repo alias policy for cross-package imports.
 *
 * Policy:
 * - Outside of a package, do NOT import its internal paths directly.
 *   Use the workspace aliases instead:
 *   - libraries/artificer/src/**         -> @sitebender/artificer/**
 *   - libraries/artificer/types/**       -> @sitebender/artificer-types/**
 *   - libraries/toolsmith/src/**        -> @sitebender/toolsmith/**
 * - Within a package folder, relative imports are allowed.
 *
 * Scope (default):
 *   - libraries/architect/src/**
 *   - mission-control/src/**
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

const ARCHITECT_SRC = "libraries/artificer/src/"
const ARCHITECT_TYPES = "libraries/artificer/types/"
const TOOLSMITH_SRC = "libraries/toolsmith/src/"

const DEFAULT_SCOPES = [
	"libraries/architect/src",
	"mission-control/src",
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
						spec.startsWith("@sitebender/artificer/") ||
						spec.startsWith("@sitebender/artificer-types/") ||
						spec.startsWith("@sitebender/artificer/") ||
						spec.startsWith("@sitebender/artificer-types/") ||
						spec.startsWith("@sitebender/toolsmith/")
					) {
						continue
					}

					// If this file is NOT inside artificer/, disallow deep artificer paths
					if (
						!isInside(file, "libraries/artificer") &&
						!isInside(file, "libraries/artificer")
					) {
						if (spec.includes(ARCHITECT_SRC)) {
							violations.push({
								file,
								line: idx + 1,
								spec,
								hint:
									"Use @sitebender/artificer/… instead of libraries/artificer/src/…",
							})
						}
						if (spec.includes(ARCHITECT_TYPES)) {
							violations.push({
								file,
								line: idx + 1,
								spec,
								hint:
									"Use @sitebender/artificer-types/… instead of libraries/artificer/types/…",
							})
						}

						if (spec.includes(ARCHITECT_SRC)) {
							violations.push({
								file,
								line: idx + 1,
								spec,
								hint:
									"Use @sitebender/artificer/… instead of libraries/artificer/src/…",
							})
						}
						if (spec.includes(ARCHITECT_TYPES)) {
							violations.push({
								file,
								line: idx + 1,
								spec,
								hint:
									"Use @sitebender/artificer-types/… instead of libraries/artificer/types/…",
							})
						}
					}

					// If this file is NOT inside toolsmith/, disallow deep toolsmith paths
					if (!isInside(file, "libraries/toolsmith")) {
						if (spec.includes(TOOLSMITH_SRC)) {
							violations.push({
								file,
								line: idx + 1,
								spec,
								hint:
									"Use @sitebender/toolsmith/… instead of libraries/toolsmith/src/…",
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
