import some from "../../../../../../../libraries/toolkit/src/simple/array/some/index.ts"
import contains from "../../../../../../../libraries/toolkit/src/simple/string/contains/index.ts"
import { DISTRIBUTIVE_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if a function name indicates distributive behavior
export default function isDistributiveName(
	functionName: string | null,
): boolean {
	if (!functionName) {
		return false
	}

	const lowerName = functionName.toLowerCase()

	return some(function containsName(distributiveName: string) {
		return contains(distributiveName)(lowerName)
	})(Array.from(DISTRIBUTIVE_FUNCTION_NAMES))
}

//?? [EXAMPLE] isDistributiveName("multiply") // true
//?? [EXAMPLE] isDistributiveName("scaleTransform") // true (contains "scale")
//?? [EXAMPLE] isDistributiveName("add") // false
