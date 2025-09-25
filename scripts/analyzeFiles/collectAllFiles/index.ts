import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

import { EXTENSIONS } from "../constants/index.ts"
import walkFolder from "../walkFolder/index.ts"

//++ Collects all files from scan directories
export default async function collectAllFiles(options: {
	root: string
	scanDirs: ReadonlyArray<string>
	excludedDirNames: Set<string>
}): Promise<Array<string>> {
	const { root, scanDirs, excludedDirNames } = options

	async function collectFromDir(
		acc: Array<string>,
		dir: string,
	): Promise<Array<string>> {
		const files: Array<string> = []

		// Async generators require iteration at I/O boundary
		for await (
			const file of walkFolder({
				root,
				dir,
				extensions: EXTENSIONS,
				excludedDirNames,
			})
		) {
			files.push(file)
		}

		return [...acc, ...files]
	}

	// Process directories sequentially using reduce
	return reduce(
		async (accPromise: Promise<Array<string>>, dir: string) => {
			const acc = await accPromise
			return collectFromDir(acc, dir)
		},
	)(Promise.resolve([]))(scanDirs)
}
