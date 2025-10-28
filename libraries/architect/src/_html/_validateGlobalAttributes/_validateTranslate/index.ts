import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import isBoolean from "@sitebender/toolsmith/predicates/isBoolean/index.ts"

import _convertBooleanToYesNo from "../_convertBooleanToYesNo/index.ts"

/*++
 + Validates translate global attribute
 + Accepts boolean (converted to "yes"/"no") or string "yes"/"no"
 + Returns { translate: value } if valid, {} if absent or invalid
 */
export default function _validateTranslate(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("translate" in props)) {
		return {}
	}

	const value = props.translate

	if (or(isBoolean(value))(isString(value))) {
		const converted = _convertBooleanToYesNo(value)

		if (converted && includes(["yes", "no"])(converted)) {
			return { translate: converted }
		}
	}

	return {}
}
