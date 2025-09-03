import { walk } from "https://deno.land/std@0.220.1/fs/walk.ts"

import sortFileImports from "./sortFileImports/index.ts"
import parseRoots from "./parseRoots/index.ts"

export default async function sortImports(): Promise<void> {
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
	sortImports()
}
