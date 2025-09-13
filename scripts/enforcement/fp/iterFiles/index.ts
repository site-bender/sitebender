// Expand simple shell globs by delegating to bash ls -1 pattern

export default async function* iterFiles(
	patterns: string[],
): AsyncGenerator<string> {
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
