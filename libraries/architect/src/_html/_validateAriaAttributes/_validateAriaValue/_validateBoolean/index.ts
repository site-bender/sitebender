import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

/*++
 + Validates boolean value: only "true" or "false"
 */
export default function _validateBoolean(attributeName: string) {
	return function _validateBooleanValue(value: string): string | undefined {
		if (or(isEqual(value)("true"))(isEqual(value)("false"))) {
			return undefined
		}

		return `Attribute '${attributeName}' must be "true" or "false", got "${value}"`
	}
}
