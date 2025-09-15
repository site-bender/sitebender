import filter from "@sitebender/toolkit/vanilla/array/filter/index.ts"
import flatMap from "@sitebender/toolkit/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"

import collectFromSubdir from "./collectFromSubdir/index.ts"
import filterByExtension from "./filterByExtension/index.ts"
import filterDirectory from "./filterDirectory/index.ts"
import flattenFiles from "./flattenFiles/index.ts"
import isDirectory from "./isDirectory/index.ts"
import isFile from "./isFile/index.ts"
import toFullPath from "./toFullPath/index.ts"

//++ Recursively collects all matching files from a directory
export default async function collectFiles(opts: {
	baseDir: string
	exts: ReadonlyArray<string>
	excludedDirNames: Set<string>
}): Promise<Array<string>> {
	try {
		const entries = Array.from(Deno.readDirSync(opts.baseDir))

		const files = filter(isFile)(entries)
		const filePaths = map(toFullPath(opts.baseDir))(files)
		const matchingFiles = filter(filterByExtension(opts.exts))(filePaths)

		const directories = filter(isDirectory)(entries)
		const processableDirectories = filter(filterDirectory(opts.excludedDirNames))(directories)

		const subdirPromises = map(
			collectFromSubdir(collectFiles, opts.exts, opts.excludedDirNames, opts.baseDir)
		)(processableDirectories)

		const subdirResults = await Promise.all(subdirPromises)
		const allSubdirFiles = flatMap(flattenFiles)(subdirResults)

		return [...matchingFiles, ...allSubdirFiles]
	} catch (_) {
		// Return empty array for missing directories
		return []
	}
}