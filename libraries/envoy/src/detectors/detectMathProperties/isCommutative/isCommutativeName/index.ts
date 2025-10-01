import some from "../../../../../../toolsmith/src/vanilla/array/some/index.ts"
import contains from "../../../../../../toolsmith/src/vanilla/string/contains/index.ts"
import { COMMUTATIVE_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if a function name indicates commutative behavior
export default function isCommutativeName(
	functionName: string | null,
): boolean {
	if (!functionName) {
		return false
	}

	const lowerName = functionName.toLowerCase()

	return some(function containsName(commutativeName: string) {
		return contains(commutativeName)(lowerName)
	})(Array.from(COMMUTATIVE_FUNCTION_NAMES))
}
