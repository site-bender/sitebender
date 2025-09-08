import some from "../../../../../../../libraries/toolkit/src/simple/array/some/index.ts"
import contains from "../../../../../../../libraries/toolkit/src/simple/string/contains/index.ts"
import { DISTRIBUTIVE_FUNCTION_NAMES } from "../constants/index.ts"

//++ Checks if source code contains any distributive function names
export default function containsDistributiveName(source: string): boolean {
	return some(function hasName(name: string) {
		return contains(name)(source)
	})(Array.from(DISTRIBUTIVE_FUNCTION_NAMES))
}

//?? [EXAMPLE] containsDistributiveName("function multiply(a, b)") // true
//?? [EXAMPLE] containsDistributiveName("const result = scale(5)") // true
//?? [EXAMPLE] containsDistributiveName("function add(a, b)") // false
