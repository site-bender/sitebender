import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import test from "../../../../../../toolsmith/src/vanilla/string/test/index.ts"
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
