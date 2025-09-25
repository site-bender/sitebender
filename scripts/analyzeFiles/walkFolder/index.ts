import collectFiles from "./collectFiles/index.ts"
import joinPath from "./joinPath/index.ts"

//++ Async generator that yields all files matching extensions in a directory tree
export default async function* walkFolder(options: {
	root: string
	dir: string
	extensions: ReadonlyArray<string>
	excludedDirNames: Set<string>
}): AsyncGenerator<string> {
	const { root, dir, extensions, excludedDirNames } = options

	const baseDir = joinPath(root)(dir)

	const files = await collectFiles({
		baseDir,
		extensions,
		excludedDirNames,
	})

	// I/O boundary: async generator yields from collected array
	yield* files
}
