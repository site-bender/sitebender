import type { Match } from "../types/index.ts"

import filter from "../../../../../../toolsmith/src/vanilla/array/filter/index.ts"
import map from "../../../../../../toolsmith/src/vanilla/array/map/index.ts"
import isSearchableFile from "../isSearchableFile/index.ts"
import isNonNullMatch from "./isNonNullMatch/index.ts"
import toMatchOrNull from "./toMatchOrNull/index.ts"

/*++
 | Reads a file and returns line positions that match a regex
 |
 | Inputs
 | - filePath: Path to a file to read
 | - pattern: RegExp to test each line against
 |
 | Behavior
 | - Returns [] for non-searchable files or read errors
 | - Produces Array<{ file, line }>, 1-based line numbers
 | - I/O: reads the file contents
 */
export default async function findInFile(
	filePath: string,
	pattern: RegExp,
): Promise<Array<Match>> {
	try {
		if (!isSearchableFile(filePath)) return []

		const content = await Deno.readTextFile(filePath)
		const lines = content.split(/\r?\n/)
		const re = new RegExp(pattern.source, pattern.flags)

		const candidates: Array<Match | null> = map(
			toMatchOrNull(filePath, re),
		)(lines)

		return filter(isNonNullMatch)(candidates) as Array<Match>
	} catch (_e) {
		return []
	}
}
