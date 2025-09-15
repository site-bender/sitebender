import flatMap from "@sitebender/toolkit/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"

import joinPath from "../joinPath/index.ts"
import shouldIncludeFile from "../shouldIncludeFile/index.ts"
import shouldProcessDirectory from "../shouldProcessDirectory/index.ts"

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

		const processEntry = async (entry: Deno.DirEntry): Promise<Array<string>> => {
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

		const results = await Promise.all(map(processEntry)(entries))

		return flatMap((files: Array<string>) => files)(results)
	} catch {
		// Directory doesn't exist or can't be read
		return []
	}
}