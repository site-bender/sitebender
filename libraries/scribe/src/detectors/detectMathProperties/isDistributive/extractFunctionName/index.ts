import reduce from "../../../../../../../libraries/toolkit/src/simple/array/reduce/index.ts"
import { FUNCTION_NAME_PATTERNS } from "../constants/index.ts"

//++ Extracts the function name from source code
export default function extractFunctionName(source: string): string | null {
	return reduce(function findFirstMatch(
		result: string | null,
		pattern: RegExp,
	): string | null {
		if (result) {
			return result
		}

		const match = source.match(pattern)

		return match ? match[1] || match[2] || match[3] : null
	})(null)(Array.from(FUNCTION_NAME_PATTERNS))
}

//?? [EXAMPLE] extractFunctionName("function add(a, b)") // "add"
//?? [EXAMPLE] extractFunctionName("const multiply = (a) =>") // "multiply"
//?? [EXAMPLE] extractFunctionName("export default function scale()") // "scale"
