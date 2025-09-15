import has from "@sitebender/toolkit/vanilla/set/has/index.ts"

//++ Determines if a directory should be processed based on exclusion list
export default function shouldProcessDirectory(
	name: string,
	excludedDirNames: Set<string>,
): boolean {
	// Always exclude node_modules and .git directories
	if (name === "node_modules" || name === ".git") {
		return false
	}
	return !has(name)(excludedDirNames)
}