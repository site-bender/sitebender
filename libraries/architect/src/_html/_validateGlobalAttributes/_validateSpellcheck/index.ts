import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import isBoolean from "@sitebender/toolsmith/predicates/isBoolean/index.ts"

import _convertBooleanToTrueFalse from "../_convertBooleanToTrueFalse/index.ts"

/*++
 + Validates spellcheck global attribute
 + Accepts boolean (converted to "true"/"false") or string "true"/"false"
 + Returns { spellcheck: value } if valid, {} if absent or invalid
 */
export default function _validateSpellcheck(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("spellcheck" in props)) {
		return {}
	}

	const value = props.spellcheck

	if (or(isBoolean(value))(isString(value))) {
		const converted = _convertBooleanToTrueFalse(value)

		if (converted && includes(["true", "false"])(converted)) {
			return { spellcheck: converted }
		}
	}

	return {}
}
