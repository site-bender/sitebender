import some from "../../../../../../toolsmith/src/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/string/contains/index.ts"
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
