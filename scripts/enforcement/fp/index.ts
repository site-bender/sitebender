import filter from "@sitebender/toolkit/vanilla/array/filter/index.ts"
import includes from "@sitebender/toolkit/vanilla/array/includes/index.ts"
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"
import pipe from "@sitebender/toolkit/pipe/index.ts"
import split from "@sitebender/toolkit/vanilla/string/split/index.ts"
import trim from "@sitebender/toolkit/vanilla/string/trim/index.ts"

import {
	DEFAULT_FP_GLOBS,
	FP_ALLOWLIST,
	FP_FORBIDDEN,
} from "../../constants/index.ts"
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

//++ Strict FP guardrail that scans files for impermissible patterns (mutable or OOP)
export default async function enforceFP(globsArg: string[] = Deno.args) {
	const pedantic = includes("--pedantic")(globsArg)
	const globs = pedantic ? pipe(
		globsArg,
		filter((a: string) => a !== "--pedantic"),
		Array.from
	) : globsArg
	const patterns = globs.length ? globs : DEFAULT_FP_GLOBS

	const violations: Violation[] = []

	for await (const file of iterFiles(patterns)) {
		if (file.endsWith(".d.ts")) continue
		if (FP_ALLOWLIST.has(file)) continue
		try {
			const raw = await Deno.readTextFile(file)
			const source = pedantic ? raw : stripCommentsAndStrings(raw)
			const lines = split(/\r?\n/)(source)

			// Simple forbidden pattern scan
			function checkForbiddenPatterns() {
				for (const rule of FP_FORBIDDEN) {
					let idx = 0
					for (const ln of lines) {
						if (rule.regex.test(ln)) {
							violations.push({
								file,
								line: idx + 1,
								col: ln.search(rule.regex) + 1,
								rule: rule.name,
								snippet: trim(ln),
							})
						}
						idx++
					}
				}
			}
			checkForbiddenPatterns()

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
				const snippet = lines[line - 1] ? trim(lines[line - 1]) : a.text
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
			console.error(
				`${v.file}:${v.line}:${v.col}  [${v.rule}]  ${v.snippet}`,
			)
		}
		console.error(`\nTotal: ${violations.length}`)
		Deno.exit(1)
	}

	console.log("Strict FP check passed (no violations)")
}

if (import.meta.main) {
	await enforceFP()
}
