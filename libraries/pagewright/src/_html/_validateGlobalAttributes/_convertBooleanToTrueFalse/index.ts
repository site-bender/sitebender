import isBoolean from "@sitebender/toolsmith/predicates/isBoolean/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/*++
 + Converts boolean to "true" or "false" string, passes through existing strings
 + Used for HTML attributes like spellcheck where true → "true", false → "false"
 */
export default function _convertBooleanToTrueFalse(
	value: unknown,
): string | undefined {
	if (isBoolean(value)) {
		return String(value)
	}

	if (isString(value)) {
		return value
	}

	return undefined
}
