import isNumber from "@sitebender/toolsmith/predicates/isNumber/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

/*++
 + Validates tabindex global attribute (tab order)
 + Accepts number or numeric string
 + Returns { tabindex: value } if valid, {} if absent or invalid
 */
export default function _validateTabindex(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("tabindex" in props)) {
		return {}
	}

	const value = props.tabindex

	if (or(isNumber(value))(isString(value))) {
		const stringValue = String(value)

		if (stringValue && stringValue.length > 0) {
			return { tabindex: stringValue }
		}
	}

	return {}
}
