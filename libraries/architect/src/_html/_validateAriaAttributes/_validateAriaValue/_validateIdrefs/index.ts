import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import slice from "@sitebender/toolsmith/array/slice/index.ts"
import split from "@sitebender/toolsmith/string/split/index.ts"
import trim from "@sitebender/toolsmith/string/trim/index.ts"

import _validateIdref from "../_validateIdref/index.ts"

/*++
 + Validates idrefs value (space-separated element ID references)
 + Assumes value is non-empty (checked by _validateAriaValue)
 */
export default function _validateIdrefs(attributeName: string) {
	return function _validateIdrefsValue(value: string): string | undefined {
		/*++
		 + Value must be defined (defensive check)
		 */
		if (not(isDefined(value))) {
			return `Attribute '${attributeName}' requires a value`
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
			const currentLength = getOrElse(0)(length(currentIds))

			if (isEqual(currentLength)(0)) {
				return undefined
			}

			const firstId = currentIds[0]

			/*++
			 + Guard against undefined elements in array
			 */
			if (not(isDefined(firstId))) {
				return `Attribute '${attributeName}' contains invalid ID reference`
			}

			const error = validateIdref(firstId)

			if (isDefined(error)) {
				return error
			}

			const remainingIds = slice(1)(undefined)(currentIds)

			return validateEachId(remainingIds)
		}

		return validateEachId(ids)
	}
}
