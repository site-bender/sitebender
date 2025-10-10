import map from "../../../../../../../../toolsmith/src/vanilla/array/map/index.ts"
import reduce from "../../../../../../../../toolsmith/src/vanilla/array/reduce/index.ts"
import buildFindMatchesForPattern from "./buildFindMatchesForPattern/index.ts"
import concatMatchArrays from "./concatMatchArrays/index.ts"
import listFilesRecursive from "./listFilesRecursive/index.ts"
import repoRootUrl from "./repoRootUrl/index.ts"
import resolvePath from "./resolvePath/index.ts"

/*++
 | Recursively scans files under a repo-relative path and finds lines
 | matching a provided regular expression.
 |
 | Inputs
 | - path: Repo-relative or relative to current file. Leading "/" is
 |   treated as repo-rooted (NOT absolute filesystem).
 | - pattern: RegExp to test each line against (flags are respected).
 |
 | Behavior
 | - Ignores non-source file types (only ts, tsx, js, jsx, md, json).
 | - Non-existent or unreadable paths return an empty array.
 | - Returns Array<{ file, line }> where line is 1-based.
 |
 | Notes
 | - Uses toolsmith functions (map, reduce) instead of array methods to
 |   adhere to strict FP style and avoid OOP collection methods.
 */
export default async function findPattern(
	path: string,
	pattern: RegExp,
): Promise<Array<{ file: string; line: number }>> {
	const base = repoRootUrl()
	const dir = resolvePath(base, path)
	const files = await listFilesRecursive(dir)

	const findForFile = buildFindMatchesForPattern(pattern)
	const matchPromises = map(findForFile)(files)
	const matches = await Promise.all(matchPromises)

	return reduce(concatMatchArrays)([] as Array<{ file: string; line: number }>)(
		matches as Array<Array<{ file: string; line: number }>>,
	)
}
