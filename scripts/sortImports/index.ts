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

async function main() {
	const files: string[] = []

	const roots = ["docs", "inspector", "libraries", "scripts"]

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
}

if (import.meta.main) {
	main()
}
