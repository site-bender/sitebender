import _cleanDataDuplicates from "./_cleanDataDuplicates/index.ts"
import _convertUnknownToData from "./_convertUnknownToData/index.ts"
import _validateAriaAttributes from "../_validateAriaAttributes/index.ts"
import _validateAttributesByTagName from "../_validateAttributesByTagName/index.ts"
import _validateGlobalAttributes from "../_validateGlobalAttributes/index.ts"
import _validateRole from "../_validateRole/index.ts"

/*++
 + Validates all attributes for an HTML element
 + Main orchestrator that coordinates all validation functions
 + Returns merged and validated attributes object
 */
export default function _validateAttributes(tagName: string) {
	return function _validateAttributesForTagName(
		props: Readonly<Record<string, unknown>>,
	): Readonly<Record<string, string>> {
		const { aria = {}, role, children, ...rest } = props

		const ariaAttrs = _validateAriaAttributes(
			aria as Readonly<Record<string, unknown>>,
		)

		const roleAttr = role ? _validateRole(tagName)(role) : {}

		const { globalAttrs, otherAttrs } = _validateGlobalAttributes(rest)

		const { elementAttrs, dataAttrs } = _validateAttributesByTagName(tagName)(
			otherAttrs,
		)

		const convertedDataAttrs = _convertUnknownToData(dataAttrs)

		const mergedAttrs = {
			...ariaAttrs,
			...roleAttr,
			...globalAttrs,
			...elementAttrs,
			...convertedDataAttrs,
		}

		const cleanedAttrs = _cleanDataDuplicates(mergedAttrs)

		return cleanedAttrs
	}
}
