// Forbid React-style prop names in our framework-free codebase.
// Exposed as a default-exported function and also runnable via CLI.

import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"

import {
	DEFAULT_NO_REACT_GLOBS,
	NO_REACT_ALLOWLIST,
} from "../constants/index.ts"

type Violation = {
	file: string
	line: number
	col: number
	snippet: string
	rule: string
	suggestion?: string
}

const RULES: Array<
	{ name: string; re: RegExp; message: string; suggestion?: string }
> = [
	{
		name: "dangerouslySetInnerHTML",
		// Match when used as an attribute or object key, not when part of a property access (e.g., obj.dangerouslySetInnerHTML)
		re: /(^|[\s,{])dangerouslySetInnerHTML\s*[:=]/,
		message: "Use of dangerouslySetInnerHTML is forbidden.",
	},
	{
		name: "className",
		re: /(^|[\s,{])className\s*[:=]/,
		message: "Use of className is forbidden.",
		suggestion: "Use 'class' instead.",
	},
	{
		name: "htmlFor",
		re: /(^|[\s,{])htmlFor\s*[:=]/,
		message: "Use of htmlFor is forbidden.",
		suggestion: "Use 'for' instead.",
	},
	// New rules to enforce JSX-only usage
	{
		name: "helpers-createElement-import",
		re: /from\s+".*\/helpers\/createElement\/index\.ts"/,
		message: "Do not import helpers/createElement directly; write JSX only.",
		suggestion: "Remove the import and write JSX components.",
	},
	{
		name: "helpers-Fragment-import",
		re: /from\s+".*\/helpers\/Fragment\/index\.ts"/,
		message: "Do not import helpers/Fragment directly; write JSX only.",
		suggestion: "Remove the import and write JSX components.",
	},
	{
		name: "createElement-call",
		re: /(^|[^.])\bcreateElement\s*\(/,
		message: "Direct createElement calls are forbidden in pagewright/recipes.",
		suggestion: "Use JSX instead.",
	},
]

async function* expandGlobs(patterns: string[]): AsyncGenerator<string> {
	const files = new Set<string>()
	const procs = map((raw: string) => {
		const p = raw.replace(/^['"]|['"]$/g, "")
		return new Deno.Command("bash", {
			args: ["-lc", `ls -1 ${p}`],
			stdout: "piped",
			stderr: "null",
		}).output()
	})(patterns)
	const outputs = await Promise.allSettled(procs)

	// Process outputs using reduce instead of for loop
	reduce(
		(acc: void, o) => {
			if (o.status !== "fulfilled" || !o.value.success) return acc
			const text = new TextDecoder().decode(o.value.stdout)
			const lines = split("\\n")(text)
			reduce(
				(acc2: void, line: string) => {
					const fp = trim(line)
					if (fp && !files.has(fp)) files.add(fp)
					return acc2
				},
				undefined,
			)(lines)
			return acc
		},
		undefined,
	)(outputs)

	// Generator function requires yielding, which can't be fully functional
	for (const f of files) yield f
}

function stripComments(source: string): string {
	// Remove block comments
	let s = source.replace(/\/\*[\s\S]*?\*\//g, "")
	// Remove line comments
	s = s.replace(/(^|[^:])\/\/.*$/gm, "$1")
	return s
}

export default async function enforceNoReactJunk(args: string[] = Deno.args) {
	const globs = args.length ? args : DEFAULT_NO_REACT_GLOBS
	const violations: Violation[] = []

	for await (const file of expandGlobs(globs)) {
		if (file.endsWith(".d.ts")) continue
		if (NO_REACT_ALLOWLIST.has(file)) continue
		try {
			const raw = await Deno.readTextFile(file)
			const src = stripComments(raw)
			const lines = src.split(/\r?\n/)

			// Convert forEach and nested for loop to functional approach
			reduce(
				(acc: void, ln: string, idx: number) => {
					reduce(
						(acc2: void, rule) => {
							const m = rule.re.exec(ln)
							if (m) {
								violations.push({
									file,
									line: idx + 1,
									col: m.index + 1,
									snippet: trim(ln),
									rule: rule.name,
									suggestion: rule.suggestion,
								})
							}
							return acc2
						},
						undefined,
					)(RULES)
					return acc
				},
				undefined,
			)(lines)
		} catch {
			// ignore
		}
	}

	if (violations.length) {
		// Group violations by rule using reduce instead of for loop
		const grouped = reduce(
			(map: Map<string, Violation[]>, v: Violation) => {
				const arr = map.get(v.rule) ?? []
				arr.push(v)
				return new Map(map).set(v.rule, arr)
			},
			new Map<string, Violation[]>(),
		)(violations)

		// Report violations using reduce instead of for loop
		reduce(
			(acc: void, [rule, list]: [string, Violation[]]) => {
				const header = RULES.find((r) => r.name === rule)?.message ||
					`Forbidden usage: ${rule}`
				const suggestion = RULES.find((r) => r.name === rule)?.suggestion
				console.error(header)
				if (suggestion) console.error(`  ${suggestion}`)
				console.error("")

				// Print each violation using reduce instead of for loop
				reduce(
					(acc2: void, v: Violation) => {
						console.error(`${v.file}:${v.line}:${v.col}  ${v.snippet}`)
						return acc2
					},
					undefined,
				)(list)

				console.error("")
				return acc
			},
			undefined,
		)(Array.from(grouped.entries()))

		console.error(`Total: ${violations.length}`)
		Deno.exit(1)
	}

	console.log("No forbidden React-style props detected")
}

if (import.meta.main) {
	await enforceNoReactJunk()
}
