import type { Predicate } from "@sitebender/toolsmith/types/index.ts"
import type { Value } from "@sitebender/toolsmith/types/index.ts"

import allPass from "@sitebender/toolsmith/validation/allPass/index.ts"
import isString from "@sitebender/toolsmith/validation/isString/index.ts"
import isNotEmpty from "@sitebender/toolsmith/string/isNotEmpty/index.ts"

/*++
 + Example: Using `allPass` for combining predicates instead of `and`
 + Demonstrates proper predicate composition
 + Combines multiple predicates - all must return true for value to be valid
 */
export default function isValidInput(value: Value): boolean {
	const predicates: Array<Predicate<Value>> = [
		isString as Predicate<Value>,
		isNotEmpty as Predicate<Value>,
	]

	/*++
	 + Using allPass instead of chaining with `and`
	 + Reads as: "all predicates pass for this value"
	 + More composable than: and(isString(v))(isNotEmpty(v))
	 */
	return allPass(predicates)(value)
}
