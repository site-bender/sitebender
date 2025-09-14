//++ [GROUP] Constants for replace-aliases codemod

//++ Root directory of the project
export const ROOT = new URL("../../../..", import.meta.url).pathname

//++ Directories to include in processing
export const INCLUDE_DIRS = [
	"applications/docs",
	"applications/playground",
	"libraries/components",
	"libraries/engine",
	"libraries/toolkit",
	"scripts",
]

//++ Replacement patterns (from, to) - currently no-op as they're identical
export const REPLACEMENTS: Array<[string, string]> = [
	["@sitebender/engine-types/", "@sitebender/engine-types/"],
	["@sitebender/engine/", "@sitebender/engine/"],
	["@sitebender/toolkit/", "@sitebender/toolkit/"],
]

//++ [END]