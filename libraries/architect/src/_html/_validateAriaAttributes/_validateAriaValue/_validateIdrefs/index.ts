import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import slice from "@sitebender/toolsmith/array/slice/index.ts"
import split from "@sitebender/toolsmith/string/split/index.ts"
import trim from "@sitebender/toolsmith/string/trim/index.ts"

import _validateIdref from "../_validateIdref/index.ts"

/*++
 + Validates idrefs value (space-separated element ID references)
 */
export default function _validateIdrefs(attributeName: string) {
	return function _validateIdrefsValue(value: string): string | undefined {
		/*++
		 + ID references list must be non-empty
		 */
		if (isEqual(length(value))(0)) {
			return `Attribute '${attributeName}' cannot be empty`
		}

		/*++
		 + Split by whitespace and validate each ID
		 */
		const ids = split(/\s+/)(trim(value))

		const validateIdref = _validateIdref(attributeName)

		/*++
		 + Validate each ID individually
		 + Check each ID and return first error found
		 */
		function validateEachId(
			currentIds: ReadonlyArray<string>,
		): string | undefined {
			if (isEqual(length(currentIds))(0)) {
				return undefined
			}

			const firstId = currentIds[0]
			const error = validateIdref(firstId)

			if (isDefined(error)) {
				return error
			}

			const remainingIds = slice(1)(currentIds)

			return validateEachId(remainingIds)
		}

		return validateEachId(ids)
	}
}
