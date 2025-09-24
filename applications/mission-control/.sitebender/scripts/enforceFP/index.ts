// Strict FP guardrail: scans files for impermissible patterns (mutable or OOP)
// Usage: deno run --allow-read scripts/enforceFP/index.ts [globs...]
// Defaults to scanning libraries/**/src/**/*.{ts,tsx}

const DEFAULT_GLOBS = [
	"libraries/*/src/**/*.ts",
	"libraries/*/src/**/*.tsx",
]

const FORBIDDEN = [
	{ name: "let", regex: /\blet\b/ },
	{ name: "var", regex: /\bvar\b/ },
	{ name: "for-loop", regex: /\bfor\s*\(/ }, // covers for, for..of, for..in
	{ name: "class", regex: /\bclass\s+[A-Za-z0-9_]/ },
	{ name: "inc", regex: /\+\+|--/ },
	{ name: "throw", regex: /\bthrow\b/ },
	// Common array/object mutators
	{ name: "push", regex: /\.push\(/ },
	{ name: "pop", regex: /\.pop\(/ },
	{ name: "shift", regex: /\.shift\(/ },
	{ name: "unshift", regex: /\.unshift\(/ },
	{ name: "splice", regex: /\.splice\(/ },
	{ name: "sort", regex: /\.sort\(/ },
	{ name: "reverse", regex: /\.reverse\(/ },
	{ name: "copyWithin", regex: /\.copyWithin\(/ },
	{ name: "fill", regex: /\.fill\(/ },
]

// Special-case: flag Object.assign unless first arg is a literal {}
const assignMatcher = (source: string) => {
	const re = /Object\.assign\(([^)]*)\)/g
	const findings: Array<{ index: number; text: string }> = []
	let match: RegExpExecArray | null
	while ((match = re.exec(source))) {
		const args = match[1].trim()
		if (!args.startsWith("{}")) {
			findings.push({ index: match.index, text: match[0] })
		}
	}
	return findings
}

async function* iterFiles(patterns: string[]) {
	const files = new Set<string>()
	const procs = patterns.map((raw) => {
		const p = raw.replace(/^['"]|['"]$/g, "") // strip surrounding quotes if provided
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

// Remove comments and string literals for safer scanning
function stripCommentsAndStrings(input: string): string {
	// Remove block comments
	let s = input.replace(/\/\*[\s\S]*?\*\//g, "")
	// Remove line comments
	s = s.replace(/(^|[^:])\/\/.*$/gm, "$1")
	// Remove template strings (greedy but fine for scanning)
	s = s.replace(/`[\s\S]*?`/g, "``")
	// Remove single and double quoted strings
	s = s.replace(/'(?:\\.|[^'\\])*'/g, "''").replace(
		/"(?:\\.|[^"\\])*"/g,
		'""',
	)
	return s
}

async function main() {
	const args = Deno.args
	const pedantic = args.includes("--pedantic")
	const globs =
		(pedantic ? args.filter((a) => a !== "--pedantic") : args).length
			? (pedantic ? args.filter((a) => a !== "--pedantic") : args)
			: DEFAULT_GLOBS
	const ALLOWLIST = new Set<string>([
		// Add files here that are explicitly approved exceptions (stateful adapters, etc.)
		"libraries/toolsmith/src/state/store.ts",
	])
	const violations: Array<
		{
			file: string
			line: number
			col: number
			rule: string
			snippet: string
		}
	> = []

	for await (const file of iterFiles(globs)) {
		if (file.endsWith(".d.ts")) continue
		if (ALLOWLIST.has(file)) continue
		try {
			const raw = await Deno.readTextFile(file)
			const source = pedantic ? raw : stripCommentsAndStrings(raw)
			const lines = source.split(/\r?\n/)

			// Simple forbidden pattern scan
			FORBIDDEN.forEach((rule) => {
				lines.forEach((ln, idx) => {
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
			console.error(
				`${v.file}:${v.line}:${v.col}  [${v.rule}]  ${v.snippet}`,
			)
		}
		console.error(`\nTotal: ${violations.length}`)
		Deno.exit(1)
	} else {
		console.log("Strict FP check passed (no violations)")
	}
}

if (import.meta.main) {
	await main()
}
