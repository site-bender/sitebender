import type { PerFileAnalysis } from "../types/index.ts"

import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"

//++ Collects files with non-default exports
export default function collectNonDefaultExports(
	acc: Array<{ file: string; names: Array<string> }>,
	file: PerFileAnalysis
): Array<{ file: string; names: Array<string> }> {
	if (file.nonDefaultExported && length(file.nonDefaultExported) > 0) {
		return [...acc, { file: file.pathRel, names: file.nonDefaultExported }]
	}

	return acc
}
