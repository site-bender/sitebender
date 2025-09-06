// Forbid React-style prop names in our framework-free codebase.
// Exposed as a default-exported function and also runnable via CLI.

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
		message: "Direct createElement calls are forbidden in components/recipes.",
		suggestion: "Use JSX instead.",
	},
]

async function* expandGlobs(patterns: string[]): AsyncGenerator<string> {
	const files = new Set<string>()
	const procs = patterns.map((raw) => {
		const p = raw.replace(/^['"]|['"]$/g, "")
		return new Deno.Command("bash", {
			args: ["-lc", `ls -1 ${p}`],
			stdout: "piped",
			stderr: "null",
		}).output()
	})
	const outputs = await Promise.allSettled(procs)
	for (const o of outputs) {
		if (o.status !== "fulfilled" || !o.value.success) continue
		const text = new TextDecoder().decode(o.value.stdout)
		for (const line of text.split("\n")) {
			const fp = line.trim()
			if (fp && !files.has(fp)) files.add(fp)
		}
	}
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
			lines.forEach((ln: string, idx: number) => {
				for (const rule of RULES) {
					const m = rule.re.exec(ln)
					if (m) {
						violations.push({
							file,
							line: idx + 1,
							col: m.index + 1,
							snippet: ln.trim(),
							rule: rule.name,
							suggestion: rule.suggestion,
						})
					}
				}
			})
		} catch {
			// ignore
		}
	}

	if (violations.length) {
		const grouped = new Map<string, Violation[]>()
		for (const v of violations) {
			const arr = grouped.get(v.rule) ?? []
			arr.push(v)
			grouped.set(v.rule, arr)
		}

		for (const [rule, list] of grouped) {
			const header = RULES.find((r) => r.name === rule)?.message ||
				`Forbidden usage: ${rule}`
			const suggestion = RULES.find((r) => r.name === rule)?.suggestion
			console.error(header)
			if (suggestion) console.error(`  ${suggestion}`)
			console.error("")
			for (const v of list) {
				console.error(`${v.file}:${v.line}:${v.col}  ${v.snippet}`)
			}
			console.error("")
		}
		console.error(`Total: ${violations.length}`)
		Deno.exit(1)
	}

	console.log("No forbidden React-style props detected")
}

if (import.meta.main) {
	await enforceNoReactJunk()
}
