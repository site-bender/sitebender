#!/usr/bin/env -S deno run --allow-read --allow-write

// Rewrite @sitebender/* imports to deep library paths in components

const ROOT = new URL("../../", import.meta.url).pathname
const INCLUDE = ["libraries/components/src"]

const REPLACERS: Array<(s: string) => string> = [
	// engine runtime code
	(s) => s.replaceAll("@sitebender/engine/", "libraries/engine/src/"),
	// engine types (top-level and subpaths)
	(s) => s.replaceAll("@sitebender/engine-types/", "libraries/engine/types/"),
	// toolkit
	(s) => s.replaceAll("@sitebender/toolkit/", "libraries/toolkit/src/"),
]

function shouldProcess(path: string) {
	return path.endsWith(".ts") || path.endsWith(".tsx")
}

async function* walk(dir: string): AsyncGenerator<string> {
	for await (const ent of Deno.readDir(dir)) {
		const p = `${dir}/${ent.name}`
		if (ent.isDirectory) yield* walk(p)
		else if (ent.isFile && shouldProcess(p)) yield p
	}
}

let changed = 0
for (const rel of INCLUDE) {
	const dir = `${ROOT}${rel}`
	try {
		for await (const file of walk(dir)) {
			const before = await Deno.readTextFile(file)
			let after = before
			for (const r of REPLACERS) after = r(after)
			if (after !== before) {
				await Deno.writeTextFile(file, after)
				console.log(`updated: ${file}`)
				changed++
			}
		}
	} catch (err) {
		if (!(err instanceof Deno.errors.NotFound)) throw err
	}
}

console.log(`done. files changed: ${changed}`)
