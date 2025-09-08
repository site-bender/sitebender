import some from "../../../../../../../libraries/toolkit/src/simple/array/some/index.ts"
import contains from "../../../../../../../libraries/toolkit/src/simple/string/contains/index.ts"
import test from "../../../../../../../libraries/toolkit/src/simple/string/test/index.ts"
import { ASSOCIATIVE_CODE_PATTERNS } from "../constants/index.ts"

//++ Checks if source contains associative code patterns (excluding Math.abs)
export default function containsAssociativeCode(source: string): boolean {
	// Special case: Math.abs is not associative
	if (contains("Math.abs")(source)) {
		return false
	}
	
	return some(function matchesPattern(pattern: RegExp) {
		return test(pattern)(source)
	})(Array.from(ASSOCIATIVE_CODE_PATTERNS))
}

//?? [EXAMPLE] containsAssociativeCode("Math.max(a, b)") // true
//?? [EXAMPLE] containsAssociativeCode("arr.concat(other)") // true
//?? [EXAMPLE] containsAssociativeCode("Math.abs(value)") // false