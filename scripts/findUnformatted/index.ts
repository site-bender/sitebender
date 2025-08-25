#!/usr/bin/env -S deno run --allow-read --allow-run
// Lists files that fail `deno fmt --check`, honoring the repo's include/exclude.
// Usage: deno run --allow-read --allow-run scripts/findUnformatted/index.ts

const ROOTS = ["docs", "jexer", "libraries", "scripts"]
const EXCLUDES = [
	"/dist/",
	"/temp/",
	"/static/",
	"/node_modules/",
	"/coverage/",
]
const EXT_RE = /\.(ts|tsx|js|jsx|json|jsonc|md)$/

function isExcluded(path: string): boolean {
	return EXCLUDES.some((p) => path.includes(p))
}

async function* iterFiles(root: string): AsyncGenerator<string, void, unknown> {
	try {
		for await (const entry of Deno.readDir(root)) {
			const full = `${root}/${entry.name}`
			if (isExcluded(full)) continue
			if (entry.isDirectory) {
				yield* iterFiles(full)
			} else if (entry.isFile && EXT_RE.test(full)) {
				yield full
			}
		}
	} catch {
		// skip missing roots
	}
}

async function checkFile(fp: string): Promise<boolean> {
	const proc = new Deno.Command("deno", {
		args: ["fmt", "--check", fp],
		stdout: "null",
		stderr: "null",
	})
	const { success } = await proc.output()
	return success
}

async function main() {
	const failures: string[] = []
	for (const r of ROOTS) {
		for await (const fp of iterFiles(r)) {
			const ok = await checkFile(fp)
			if (!ok) failures.push(fp)
		}
	}
	if (failures.length) {
		console.log("Unformatted files (failing deno fmt --check):\n")
		failures.sort().forEach((f) => console.log(f))
		Deno.exit(1)
	} else {
		console.log("All files are formatted.")
	}
}

if (import.meta.main) {
	await main()
}
