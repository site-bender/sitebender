import isNumber from "@sitebender/toolsmith/predicates/isNumber/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

/*++
 + Validates tabindex global attribute (tab order)
 + Accepts number or numeric string
 + Returns { tabindex: value } if valid, data-§-bad-tabindex if invalid, {} if absent
 */
export default function _validateTabindex(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if ("tabindex" in props) {
		const value = props.tabindex

		if (or(isNumber(value))(isString(value))) {
			const stringValue = String(value)

			if (stringValue && stringValue.length > 0) {
				return { tabindex: stringValue }
			}
		}

		return { "data-§-bad-tabindex": String(value) }
	}

	return {}
}
