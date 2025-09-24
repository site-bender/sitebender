import type { PerFileAnalysis, FolderAggregate, FileFunction } from "../types/index.ts"

import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import slice from "@sitebender/toolsmith/vanilla/array/slice/index.ts"
import join from "@sitebender/toolsmith/vanilla/array/join/index.ts"
import isLongFunction from "./isLongFunction/index.ts"

//++ Processes a single file for folder aggregation
export default function processFile(
	maxFunctionLines: number
): (folderMap: Map<string, FolderAggregate>) => (file: PerFileAnalysis) => void {
	return function processFileImpl(
		folderMap: Map<string, FolderAggregate>
	): (file: PerFileAnalysis) => void {
		return function processFileInner(file: PerFileAnalysis): void {
		const pathParts = split("/")(file.pathRel)
		const folderParts = slice(0)(-1)(pathParts)
		const folder = length(folderParts) > 0 ? join("/")(folderParts) : "."

		if (!folderMap.has(folder)) {
			folderMap.set(folder, {
				folder,
				files: 0,
				lines: 0,
				functions: 0,
				longFunctions: 0,
				nonDefaultCount: 0,
			})
		}

		const agg = folderMap.get(folder)!
		const checkIsLongFunction = isLongFunction(maxFunctionLines)
		const longFunctions = filter(checkIsLongFunction)(file.functions)

		agg.files++
		agg.lines += file.lines
		agg.functions += length(file.functions)
		agg.longFunctions += length(longFunctions)
		agg.nonDefaultCount += file.nonDefaultExported ? length(file.nonDefaultExported) : 0
		}
	}
}
