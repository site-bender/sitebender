import filter from "@sitebender/toolsmith/array/filter/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"

import type { FileFunction, PerFileAnalysis } from "../types/index.ts"

//++ Collects long functions from a file with file path attached
export default function collectLongFunctions(
	maxFunctionLines: number,
): (
	acc: Array<FileFunction & { file: string }>,
	file: PerFileAnalysis,
) => Array<FileFunction & { file: string }> {
	return function collectLongFunctionsImpl(
		acc: Array<FileFunction & { file: string }>,
		file: PerFileAnalysis,
	): Array<FileFunction & { file: string }> {
		const isLongFunction = (f: FileFunction) => f.loc > maxFunctionLines
		const addFilePath = (f: FileFunction) => ({ ...f, file: file.pathRel })

		const longFunctions = filter(isLongFunction)(file.functions)
		const withFilePath = map(addFilePath)(longFunctions)

		return [...acc, ...withFilePath]
	}
}
