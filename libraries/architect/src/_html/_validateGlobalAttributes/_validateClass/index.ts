import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import join from "@sitebender/toolsmith/array/join/index.ts"

/*++
 + Validates class global attribute (space-separated class names)
 + Accepts string or Array<string>
 + If array, joins with spaces
 + Returns { class: value } if valid, data-§-bad-class if invalid, {} if absent
 */
export default function _validateClass(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (isDefined(props.class)) {
		const value = props.class

		if (isString(value)) {
			return { class: value }
		}

		if (isArray(value)) {
			const joined = join(" ")(value)
			const classString = getOrElse("")(joined)

			return { class: classString }
		}

		return { "data-§-bad-class": String(value) }
	}

	return {}
}
