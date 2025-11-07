import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import stringIncludes from "@sitebender/toolsmith/string/includes/index.ts"

/*++
 + Validates idref value (element ID reference)
 + Assumes value is non-empty (checked by _validateAriaValue)
 */
export default function _validateIdref(attributeName: string) {
	return function _validateIdrefValue(value: string): string | undefined {
		/*++
		 + Value must be defined (defensive check)
		 */
		if (not(isDefined(value))) {
			return `Attribute '${attributeName}' requires a value`
		}

		/*++
		 + ID references cannot contain spaces
		 */
		if (stringIncludes(value)(" ")) {
			return `Attribute '${attributeName}' cannot contain spaces (use 'idrefs' for multiple IDs)`
		}

		return undefined
	}
}
