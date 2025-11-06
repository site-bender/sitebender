import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import stringIncludes from "@sitebender/toolsmith/string/includes/index.ts"

/*++
 + Validates idref value (element ID reference)
 */
export default function _validateIdref(attributeName: string) {
	return function _validateIdrefValue(value: string): string | undefined {
		/*++
		 + ID references must be non-empty strings
		 + They cannot contain spaces
		 */
		if (isEqual(length(value))(0)) {
			return `Attribute '${attributeName}' cannot be empty`
		}

		if (stringIncludes(value)(" ")) {
			return `Attribute '${attributeName}' cannot contain spaces (use 'idrefs' for multiple IDs)`
		}

		return undefined
	}
}
