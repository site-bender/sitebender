import some from "../../../../../../../libraries/toolkit/src/simple/array/some/index.ts"
import contains from "../../../../../../../libraries/toolkit/src/simple/string/contains/index.ts"
import { COMMUTATIVE_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if a function name indicates commutative behavior
export default function isCommutativeName(functionName: string | null): boolean {
	if (!functionName) {
		return false
	}
	
	const lowerName = functionName.toLowerCase()
	
	return some(function containsName(commutativeName: string) {
		return contains(commutativeName)(lowerName)
	})(Array.from(COMMUTATIVE_FUNCTION_NAMES))
}

//?? [EXAMPLE] isCommutativeName("multiply") // true
//?? [EXAMPLE] isCommutativeName("addNumbers") // true (contains "add")
//?? [EXAMPLE] isCommutativeName("subtract") // false