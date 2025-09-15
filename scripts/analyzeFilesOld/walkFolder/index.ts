import collectFiles from "./collectFiles/index.ts"
import createAsyncGenerator from "./createAsyncGenerator/index.ts"
import joinPath from "./joinPath/index.ts"

//++ Walks a directory tree and yields all files matching the specified extensions
export default async function* walkFolder(opts: {
	root: string
	dir: string
	exts: ReadonlyArray<string>
	excludedDirNames: Set<string>
}): AsyncGenerator<string> {
	const baseDir = joinPath(opts.root, opts.dir)
	const files = await collectFiles({
		baseDir,
		exts: opts.exts,
		excludedDirNames: opts.excludedDirNames,
	})

	yield* createAsyncGenerator(files)
}
