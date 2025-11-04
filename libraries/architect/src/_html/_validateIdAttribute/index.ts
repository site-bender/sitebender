import generateShortId from "@sitebender/toolsmith/random/generateShortId/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
/*++
 + Validates or generates ID attribute
 + If valid string: returns { id: value }
 + If absent: generates UUID prefixed with underscore and returns { id: generatedId }
 + If invalid type: returns { "data-§-bad-id": stringified value }
 */
export default function _validateIdAttribute(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (isDefined(props.id)) {
		const value = props.id

		if (isString(value)) {
			return { id: value }
		}

		return { "data-§-bad-id": String(value), id: generateShortId() }
	}

	return { id: generateShortId() }
}
