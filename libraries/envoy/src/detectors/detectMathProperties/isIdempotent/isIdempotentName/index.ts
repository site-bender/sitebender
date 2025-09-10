import some from "../../../../../../../libraries/toolkit/src/simple/array/some/index.ts"
import contains from "../../../../../../../libraries/toolkit/src/simple/string/contains/index.ts"
import { IDEMPOTENT_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if a function name indicates idempotent behavior
export default function isIdempotentName(functionName: string | null): boolean {
	if (!functionName) {
		return false
	}

	const lowerName = functionName.toLowerCase()

	return some(function containsName(idempotentName: string) {
		return contains(idempotentName)(lowerName)
	})(Array.from(IDEMPOTENT_FUNCTION_NAMES))
}

//?? [EXAMPLE] isIdempotentName("normalize") // true
//?? [EXAMPLE] isIdempotentName("sanitizeInput") // true (contains "sanitize")
//?? [EXAMPLE] isIdempotentName("increment") // false
