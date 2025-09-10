import some from "../../../../../../../libraries/toolkit/src/simple/array/some/index.ts"
import test from "../../../../../../../libraries/toolkit/src/simple/string/test/index.ts"
import { COMMUTATIVE_CODE_PATTERNS } from "../constants/index.ts"

//++ Checks if source contains commutative code patterns
export default function containsCommutativeCode(source: string): boolean {
	return some(function matchesPattern(pattern: RegExp) {
		return test(pattern)(source)
	})(Array.from(COMMUTATIVE_CODE_PATTERNS))
}

//?? [EXAMPLE] containsCommutativeCode("Math.max(a, b)") // true
//?? [EXAMPLE] containsCommutativeCode("arr.concat(other)") // true
//?? [EXAMPLE] containsCommutativeCode("a - b") // false
