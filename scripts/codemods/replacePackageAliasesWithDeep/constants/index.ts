import replaceAll from "@sitebender/toolsmith/string/replaceAll/index.ts"

//++ [GROUP] Constants for replace-package-aliases-with-deep codemod

//++ Root directory of the project
export const ROOT = new URL("../../../..", import.meta.url).pathname

//++ Directories to include in processing
export const INCLUDE = ["libraries/architect/src"]

//++ Transforms @sitebender/artificer package alias to deep path
function replaceArchitect(s: string): string {
	return replaceAll("@sitebender/artificer/")("libraries/artificer/src/")(s)
}

//++ Transforms @sitebender/artificer-types package alias to deep path
function replaceArchitectTypes(s: string): string {
	return replaceAll("@sitebender/artificer-types/")(
		"libraries/artificer/types/",
	)(s)
}

//++ Transforms @sitebender/toolsmith package alias to deep path
function replaceToolsmith(s: string): string {
	return replaceAll("@sitebender/toolsmith/")("libraries/toolsmith/src/")(s)
}

//++ Replacement functions to transform package aliases to deep paths
export const REPLACERS: Array<(s: string) => string> = [
	replaceArchitect,
	replaceArchitectTypes,
	replaceToolsmith,
]

//++ [END]
