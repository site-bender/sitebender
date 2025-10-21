import or from "@sitebender/toolsmith/logic/or/index.ts"
import isNull from "@sitebender/toolsmith/validation/isNull/index.ts"
import isUndefined from "@sitebender/toolsmith/validation/isUndefined/index.ts"

/*++
 + Example: Using `or` for combining boolean conditions
 + Demonstrates readable disjunction that returns guaranteed boolean
 */
export default function isMissing(value: unknown): boolean {
	/*++
	 + Using `or` to check if value is null or undefined
	 + Reads as: "value is null or value is undefined"
	 + Returns guaranteed boolean (not first truthy value like ||)
	 */
	const valueIsNull = isNull(value)
	const valueIsUndefined = isUndefined(value)

	return or(valueIsNull)(valueIsUndefined)
}
