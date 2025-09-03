import { walk } from "https://deno.land/std@0.220.1/fs/walk.ts"

import sortFileImports from "./sortFileImports/index.ts"

export type ImportInfo = {
	type: "type" | "value"
	source: string
	text: string
	line: number
	category:
		| "types"
		| "components"
		| "utilities"
		| "constants"
		| "external"
		| "local"
}

function parseRoots(args: Array<string>): Array<string> {
	const defaults = ["agent", "docs", "inspector", "libraries", "scripts"]
	const selected: Array<string> = []

	for (const arg of args) {
		if (arg.startsWith("--dir=")) {
			selected.push(arg.slice("--dir=".length))
		} else if (!arg.startsWith("-")) {
			selected.push(arg)
		}
	}

	return selected.length > 0 ? selected : defaults
}

async function main() {
	const files: string[] = []

	const roots = parseRoots(Deno.args)

	for (const root of roots) {
		for await (
			const entry of walk(root, {
				exts: [".ts", ".tsx"],
				includeDirs: false,
			})
		) {
			files.push(entry.path)
		}
	}

	const sortPromises = files.map((file) => sortFileImports(file))
	await Promise.all(sortPromises)

	console.log(`🎉 Processed ${files.length} files`)

	return
}

if (import.meta.main) {
	main()
}
