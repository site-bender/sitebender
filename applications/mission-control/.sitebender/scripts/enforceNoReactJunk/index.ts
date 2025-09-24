// Forbid React-style prop names in our framework-free codebase.
// Rules:
//  - dangerouslySetInnerHTML -> forbidden
//  - className -> use 'class'
//  - htmlFor   -> use 'for'
// Scopes: mission-control/src and libraries/*/src.
// Allowlist: internal renderer may reference these names for compatibility.

const DEFAULT_GLOBS = [
	"mission-control/src/**/*.ts",
	"mission-control/src/**/*.tsx",
	"libraries/*/src/**/*.ts",
	"libraries/*/src/**/*.tsx",
]

const ALLOWLIST = new Set<string>([
	// Our custom renderer is allowed to reference these names for compatibility
	"scripts/build/generatePages/buildRoute/renderPageWithApp/renderToString/index.ts",
])

async function* iterFiles(patterns: string[]) {
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

async function main() {
	const args = Deno.args.length ? Deno.args : DEFAULT_GLOBS
	const violations: Array<
		{
			file: string
			line: number
			col: number
			snippet: string
			rule: string
			suggestion?: string
		}
	> = []
	const rules: Array<
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
	]

	for await (const file of iterFiles(args)) {
		if (file.endsWith(".d.ts")) continue
		if (ALLOWLIST.has(file)) continue
		try {
			const raw = await Deno.readTextFile(file)
			const src = stripComments(raw)
			const lines = src.split(/\r?\n/)
			lines.forEach((ln, idx) => {
				for (const rule of rules) {
					const m = rule.re.exec(ln)
					if (m) {
						violations.push({
							file,
							line: idx + 1,
							col: (m.index + 1),
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
		const grouped = new Map<string, Array<typeof violations[number]>>()
		for (const v of violations) {
			const key = v.rule
			const arr = grouped.get(key) ?? []
			arr.push(v)
			grouped.set(key, arr)
		}

		for (const [rule, list] of grouped) {
			const header = rules.find((r) => r.name === rule)?.message ||
				`Forbidden usage: ${rule}`
			const suggestion = rules.find((r) => r.name === rule)?.suggestion
			console.error(`${header}`)
			if (suggestion) console.error(`  ${suggestion}`)
			console.error("")
			for (const v of list) {
				console.error(`${v.file}:${v.line}:${v.col}  ${v.snippet}`)
			}
			console.error("")
		}
		console.error(`Total: ${violations.length}`)
		Deno.exit(1)
	} else {
		console.log("No forbidden React-style props detected")
	}
}

if (import.meta.main) {
	await main()
}
