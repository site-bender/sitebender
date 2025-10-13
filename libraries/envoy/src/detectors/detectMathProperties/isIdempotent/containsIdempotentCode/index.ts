import some from "../../../../../../toolsmith/src/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/string/contains/index.ts"
import { IDEMPOTENT_CODE_PATTERNS } from "../constants/index.ts"

//++ Checks if source contains idempotent code patterns
export default function containsIdempotentCode(source: string): boolean {
	return some(function hasPattern(pattern: string) {
		return contains(pattern)(source)
	})(Array.from(IDEMPOTENT_CODE_PATTERNS))
}
