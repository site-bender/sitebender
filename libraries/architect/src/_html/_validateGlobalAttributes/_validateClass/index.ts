import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import join from "@sitebender/toolsmith/array/join/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

/*++
 + Validates class global attribute (space-separated class names)
 + Accepts string or Array<string>
 + If array, joins with spaces
 + Returns { class: value } if valid, {} if absent or invalid
 */
export default function _validateClass(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("class" in props)) {
		return {}
	}

	const value = props.class

	if (isString(value)) {
		return { class: value }
	}

	if (isArray(value)) {
		const joined = join(" ")(value)
		const classString = getOrElse("")(joined)

		return { class: classString }
	}

	return {}
}
