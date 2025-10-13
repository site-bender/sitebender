import some from "../../../../../../toolsmith/src/array/some/index.ts"
import test from "../../../../../../toolsmith/src/string/test/index.ts"
import { COMMUTATIVE_CODE_PATTERNS } from "../constants/index.ts"

//++ Checks if source contains commutative code patterns
export default function containsCommutativeCode(source: string): boolean {
	return some(function matchesPattern(pattern: RegExp) {
		return test(pattern)(source)
	})(Array.from(COMMUTATIVE_CODE_PATTERNS))
}
