import some from "../../../../../../toolsmith/src/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/string/contains/index.ts"
import { ASSOCIATIVE_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if a function name indicates associative behavior (excluding abs)
export default function isAssociativeName(
	functionName: string | null,
): boolean {
	if (!functionName) {
		return false
	}

	const lowerName = functionName.toLowerCase()

	// Special case: abs is not associative
	if (contains("abs")(lowerName)) {
		return false
	}

	return some(function containsName(associativeName: string) {
		return contains(associativeName)(lowerName)
	})(Array.from(ASSOCIATIVE_FUNCTION_NAMES))
}
