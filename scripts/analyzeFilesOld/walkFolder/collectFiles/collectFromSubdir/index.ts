import joinPath from "../../joinPath/index.ts"

//++ Creates a function to collect files from a subdirectory
export default function collectFromSubdir(
	collectFiles: (opts: {
		baseDir: string
		exts: ReadonlyArray<string>
		excludedDirNames: Set<string>
	}) => Promise<Array<string>>,
	exts: ReadonlyArray<string>,
	excludedDirNames: Set<string>,
	baseDir: string,
): (entry: Deno.DirEntry) => Promise<Array<string>> {
	return function collectSubdirFiles(entry: Deno.DirEntry): Promise<Array<string>> {
		return collectFiles({
			baseDir: joinPath(baseDir, entry.name),
			exts,
			excludedDirNames,
		})
	}
}