//++ [GROUP] Constants for replace-aliases codemod

//++ Root directory of the project
export const ROOT = new URL("../../../..", import.meta.url).pathname

//++ Directories to include in processing
export const INCLUDE_DIRS = [
	"applications/mission-control",
	"applications/the-workshop",
	"libraries/architect",
	"libraries/artificer",
	"libraries/toolsmith",
	"scripts",
]

//++ Replacement patterns (from, to) - currently no-op as they're identical
export const REPLACEMENTS: Array<[string, string]> = [
	["@sitebender/artificer-types/", "@sitebender/artificer-types/"],
	["@sitebender/artificer/", "@sitebender/artificer/"],
	["@sitebender/toolsmith/", "@sitebender/toolsmith/"],
]

//++ [END]
