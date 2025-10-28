import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

/*++
 + Validates id global attribute
 + Accepts any string value
 + Returns { id: value } if valid string, {} if absent or invalid
 */
export default function _validateId(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("id" in props)) {
		return {}
	}

	const value = props.id

	if (isString(value)) {
		return { id: value as string }
	}

	return {}
}
