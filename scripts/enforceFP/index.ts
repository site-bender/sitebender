// Strict FP guardrail: scans files for impermissible patterns (mutable or OOP)
// Usage: deno run --allow-read --allow-run scripts/enforceFP/index.ts [globs...]
// Defaults to scanning libraries/**/src/**/*.{ts,tsx}

import {
	DEFAULT_FP_GLOBS,
	FP_ALLOWLIST,
	FP_FORBIDDEN,
} from "../constants/index.ts"
import assignMatcher from "./assignMatcher/index.ts"
import iterFiles from "./iterFiles/index.ts"
import stripCommentsAndStrings from "./stripCommentsAndStrings/index.ts"

type Violation = {
	file: string
	line: number
	col: number
	rule: string
	snippet: string
}

export default async function enforceFP(globsArg: string[] = Deno.args) {
	const pedantic = globsArg.includes("--pedantic")
	const globs = pedantic ? globsArg.filter((a) => a !== "--pedantic") : globsArg
	const patterns = globs.length ? globs : DEFAULT_FP_GLOBS

	const violations: Violation[] = []

	for await (const file of iterFiles(patterns)) {
		if (file.endsWith(".d.ts")) continue
		if (FP_ALLOWLIST.has(file)) continue
		try {
			const raw = await Deno.readTextFile(file)
			const source = pedantic ? raw : stripCommentsAndStrings(raw)
			const lines = source.split(/\r?\n/)

			// Simple forbidden pattern scan
			FP_FORBIDDEN.forEach((rule) => {
				lines.forEach((ln: string, idx: number) => {
					if (rule.regex.test(ln)) {
						violations.push({
							file,
							line: idx + 1,
							col: ln.search(rule.regex) + 1,
							rule: rule.name,
							snippet: ln.trim(),
						})
					}
				})
			})

			// Object.assign special-case
			const assigns = assignMatcher(source)
			for (const a of assigns) {
				// best-effort line/col
				let line = 1, col = 1
				for (let i = 0; i < source.length && i < a.index; i++) {
					if (source[i] === "\n") {
						line++
						col = 1
					} else col++
				}
				const snippet = lines[line - 1]?.trim() ?? a.text
				violations.push({
					file,
					line,
					col,
					rule: "Object.assign(non-literal-target)",
					snippet,
				})
			}
		} catch {
			// ignore missing or unreadable files from glob expansion
		}
	}

	if (violations.length) {
		console.error("Strict FP violations found:\n")
		for (const v of violations) {
			console.error(`${v.file}:${v.line}:${v.col}  [${v.rule}]  ${v.snippet}`)
		}
		console.error(`\nTotal: ${violations.length}`)
		Deno.exit(1)
	}

	console.log("Strict FP check passed (no violations)")
}

if (import.meta.main) {
	await enforceFP()
}
