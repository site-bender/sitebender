//++ Processes a single directory entry for file collection
export default function processEntry(options: {
	joinToBase: (name: string) => string
	isFile: (name: string) => boolean
	shouldProcess: (name: string) => boolean
	extensions: ReadonlyArray<string>
	excludedDirNames: Set<string>
	collectFiles: (opts: {
		baseDir: string
		extensions: ReadonlyArray<string>
		excludedDirNames: Set<string>
	}) => Promise<Array<string>>
}): (entry: Deno.DirEntry) => Promise<Array<string>> {
	const { joinToBase, isFile, shouldProcess, extensions, excludedDirNames, collectFiles } = options

	return async function processEntryImpl(entry: Deno.DirEntry): Promise<Array<string>> {
		const fullPath = joinToBase(entry.name)

		if (entry.isFile && isFile(entry.name)) {
			return [fullPath]
		}

		if (entry.isDirectory && shouldProcess(entry.name)) {
			return await collectFiles({
				baseDir: fullPath,
				extensions,
				excludedDirNames,
			})
		}

		return []
	}
}