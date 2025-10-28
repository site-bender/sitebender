import isBoolean from "@sitebender/toolsmith/predicates/isBoolean/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/*++
 + Converts boolean to "yes" or "no" string, passes through existing strings
 + Used for HTML attributes like translate where true → "yes", false → "no"
 */
export default function _convertBooleanToYesNo(
	value: unknown,
): string | undefined {
	if (isBoolean(value)) {
		return value ? "yes" : "no"
	}

	if (isString(value)) {
		return value
	}

	return undefined
}
