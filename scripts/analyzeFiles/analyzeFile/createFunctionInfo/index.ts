import type { FileFunction } from "../../types/index.ts"

import split from "@sitebender/toolkit/vanilla/string/split/index.ts"
import length from "@sitebender/toolkit/vanilla/array/length/index.ts"
import slice from "@sitebender/toolkit/vanilla/string/slice/index.ts"
import not from "@sitebender/toolkit/vanilla/logic/not/index.ts"

//++ Creates function info from a regex match
export default function createFunctionInfo(text: string): (match: RegExpExecArray) => FileFunction {
	return function createFromMatch(match: RegExpExecArray): FileFunction {
		const hasExportDefault = not(not(match[1]))
		const functionName = match[3]
		const name = functionName || (hasExportDefault ? "<default>" : "<anonymous>")
		const beforeMatch = slice(0)(match.index || 0)(text)
		const linesBeforeMatch = split("\n")(beforeMatch)
		const startLine = length(linesBeforeMatch)

		return {
			name,
			loc: 1,
			startLine,
			endLine: startLine,
		}
	}
}