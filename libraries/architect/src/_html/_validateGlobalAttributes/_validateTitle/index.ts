import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

/*++
 + Validates title global attribute (tooltip text)
 + Accepts any string value
 + Returns { title: value } if valid string, {} if absent or invalid
 */
export default function _validateTitle(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("title" in props)) {
		return {}
	}

	const value = props.title

	if (isString(value)) {
		return { title: value as string }
	}

	return {}
}
