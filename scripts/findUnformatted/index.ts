// Lists files that fail `deno fmt --check`, honoring the repo's include/exclude.
// Exposed as a default export and runnable via CLI.

import {
	FORMAT_EXCLUDES,
	FORMAT_EXTENSIONS,
	FORMAT_ROOTS,
} from "../constants/index.ts"

function isExcluded(path: string): boolean {
	return FORMAT_EXCLUDES.some((p) => path.includes(p))
}

function hasAllowedExtension(path: string): boolean {
	return FORMAT_EXTENSIONS.some((ext) => path.endsWith(`.${ext}`))
}

async function* walkFiles(root: string): AsyncGenerator<string> {
	try {
		for await (const entry of Deno.readDir(root)) {
			const full = `${root}/${entry.name}`
			if (isExcluded(full)) continue
			if (entry.isDirectory) {
				yield* walkFiles(full)
			} else if (entry.isFile && hasAllowedExtension(full)) {
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

export default async function findUnformatted(): Promise<void> {
	const failures: string[] = []
	for (const r of FORMAT_ROOTS) {
		for await (const fp of walkFiles(r)) {
			const ok = await checkFile(fp)
			if (!ok) failures.push(fp)
		}
	}
	if (failures.length) {
		console.log("Unformatted files (failing deno fmt --check):\n")
		failures.sort().forEach((f) => console.log(f))
		Deno.exit(1)
	}
	console.log("All files are formatted.")
}

if (import.meta.main) {
	await findUnformatted()
}
