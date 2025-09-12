import some from "../../../../../../toolkit/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolkit/src/vanilla/string/contains/index.ts"
import { IDEMPOTENT_CODE_PATTERNS } from "../constants/index.ts"

//++ Checks if source contains idempotent code patterns
export default function containsIdempotentCode(source: string): boolean {
	return some(function hasPattern(pattern: string) {
		return contains(pattern)(source)
	})(Array.from(IDEMPOTENT_CODE_PATTERNS))
}

//?? [EXAMPLE] containsIdempotentCode("Math.abs(value)") // true
//?? [EXAMPLE] containsIdempotentCode("str.trim()") // true
//?? [EXAMPLE] containsIdempotentCode("x + y") // false
