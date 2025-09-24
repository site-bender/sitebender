import reduce from "../../../../../../../../../toolsmith/src/vanilla/array/reduce/index.ts"

import collectFolderEntries from "./collectFolderEntries/index.ts"
import createFolderEntryExpander from "./createFolderEntryExpander/index.ts"
import concatArrays from "./concatArrays/index.ts"

/*++
 | Recursively lists all file paths under a folder
 |
 | Inputs
 | - folderPath: Filesystem path to a folder
 |
 | Behavior
 | - Reads folder entries and expands subfolders recursively
 | - Returns [] on missing/unreadable paths (defensive I/O)
 | - Produces a flat Array<string> of file paths
 |
 | Notes
 | - No loops: recursion + toolsmith functions only
 | - Single responsibility: traversal only, no filtering beyond fs types
 */
export default async function listFilesRecursive(
	folderPath: string,
): Promise<Array<string>> {
	try {
		const iterator = Deno.readDir(folderPath)[Symbol.asyncIterator]()
		const entries = await collectFolderEntries(iterator)
		const expandFolderEntries =
			createFolderEntryExpander(listFilesRecursive)
		const promises = expandFolderEntries(folderPath, entries)
		const results = await Promise.all(promises)

		return reduce(concatArrays)([] as Array<string>)(
			results as Array<Array<string>>,
		)
	} catch (_e) {
		return []
	}
}
