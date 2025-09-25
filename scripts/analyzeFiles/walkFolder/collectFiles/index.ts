import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

import joinPath from "../joinPath/index.ts"
import shouldIncludeFile from "../shouldIncludeFile/index.ts"
import shouldProcessDirectory from "../shouldProcessDirectory/index.ts"
import extractFiles from "./extractFiles/index.ts"
import processEntry from "./processEntry/index.ts"

//++ Recursively collects all files matching extensions from a directory
export default async function collectFiles(options: {
	baseDir: string
	extensions: ReadonlyArray<string>
	excludedDirNames: Set<string>
}): Promise<Array<string>> {
	const { baseDir, extensions, excludedDirNames } = options

	try {
		const entries = await Array.fromAsync(Deno.readDir(baseDir))

		const isFile = shouldIncludeFile(extensions)
		const shouldProcess = shouldProcessDirectory(excludedDirNames)
		const joinToBase = joinPath(baseDir)

		const entryProcessor = processEntry({
			joinToBase,
			isFile,
			shouldProcess,
			extensions,
			excludedDirNames,
			collectFiles,
		})

		const results = await Promise.all(map(entryProcessor)(entries))

		return flatMap(extractFiles)(results)
	} catch {
		// Directory doesn't exist or can't be read
		return []
	}
}
