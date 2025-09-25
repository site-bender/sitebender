import replaceAll from "@sitebender/toolsmith/vanilla/string/replaceAll/index.ts"

//++ [GROUP] Constants for replace-package-aliases-with-deep codemod

//++ Root directory of the project
export const ROOT = new URL("../../../..", import.meta.url).pathname

//++ Directories to include in processing
export const INCLUDE = ["libraries/pagewright/src"]

//++ Transforms @sitebender/architect package alias to deep path
function replaceArchitect(s: string): string {
	return replaceAll("@sitebender/architect/")("libraries/architect/src/")(s)
}

//++ Transforms @sitebender/architect-types package alias to deep path
function replaceArchitectTypes(s: string): string {
	return replaceAll("@sitebender/architect-types/")(
		"libraries/architect/types/",
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
