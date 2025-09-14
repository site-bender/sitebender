import replaceAll from "@sitebender/toolkit/vanilla/string/replaceAll/index.ts"

//++ [GROUP] Constants for replace-package-aliases-with-deep codemod

//++ Root directory of the project
export const ROOT = new URL("../../../..", import.meta.url).pathname

//++ Directories to include in processing
export const INCLUDE = ["libraries/components/src"]

//++ Transforms @sitebender/engine package alias to deep path
function replaceEngine(s: string): string {
	return replaceAll("@sitebender/engine/")("libraries/engine/src/")(s)
}

//++ Transforms @sitebender/engine-types package alias to deep path
function replaceEngineTypes(s: string): string {
	return replaceAll("@sitebender/engine-types/")("libraries/engine/types/")(s)
}

//++ Transforms @sitebender/toolkit package alias to deep path
function replaceToolkit(s: string): string {
	return replaceAll("@sitebender/toolkit/")("libraries/toolkit/src/")(s)
}

//++ Replacement functions to transform package aliases to deep paths
export const REPLACERS: Array<(s: string) => string> = [
	replaceEngine,
	replaceEngineTypes,
	replaceToolkit,
]

//++ [END]