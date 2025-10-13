import not from "@sitebender/toolsmith/logic/not/index.ts"
import has from "@sitebender/toolsmith/set/has/index.ts"

//++ Checks if a directory should be processed based on exclusion list
export default function shouldProcessDirectory(
	excludedDirNames: Set<string>,
): (dirName: string) => boolean {
	return function checkDirectory(dirName: string): boolean {
		const isExcluded = has(dirName)(excludedDirNames)

		return not(isExcluded)
	}
}
