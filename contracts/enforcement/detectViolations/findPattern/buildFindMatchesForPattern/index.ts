import findInFile from "../findInFile/index.ts"

//++ Builds a function that finds matches for a given regex in a file path
export default function buildFindMatchesForPattern(
	pattern: RegExp,
) {
	function findForFile(filePath: string) {
		return findInFile(filePath, pattern)
	}

	return findForFile
}
