//++ [GROUP] Constants for replace-aliases codemod

//++ Root directory of the project
export const ROOT = new URL("../../../..", import.meta.url).pathname

//++ Directories to include in processing
export const INCLUDE_DIRS = [
	"applications/mission-control",
	"applications/the-workshop",
	"libraries/codewright",
	"libraries/architect",
	"libraries/toolsmith",
	"scripts",
]

//++ Replacement patterns (from, to) - currently no-op as they're identical
export const REPLACEMENTS: Array<[string, string]> = [
	["@sitebender/architect-types/", "@sitebender/architect-types/"],
	["@sitebender/architect/", "@sitebender/architect/"],
	["@sitebender/toolsmith/", "@sitebender/toolsmith/"],
]

//++ [END]
