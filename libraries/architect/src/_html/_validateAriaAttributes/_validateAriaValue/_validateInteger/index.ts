import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
// TODO: Replace native < with isLessThan when available in Toolsmith (ASAP)
// TODO: Replace native String() with toString when available in Toolsmith (ASAP)
import isUnequal from "@sitebender/toolsmith/predicates/isUnequal/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"

import type { AriaAttributeDefinition } from "../../../constants/ariaStandards/index.ts"

/*++
 + Validates integer value
 */
export default function _validateInteger(attributeName: string) {
	return function _validateIntegerForAttribute(
		attrDefinition: AriaAttributeDefinition,
	) {
		return function _validateIntegerValue(value: string): string | undefined {
			/*++
			 + Check if value is a valid integer
			 */
			const intValue = parseInt(value, 10)

			// TODO: Replace String() with toString when available in Toolsmith (ASAP)
			if (or(isNaN(intValue))(isUnequal(String(intValue))(value))) {
				return `Attribute '${attributeName}' must be an integer, got "${value}"`
			}

			/*++
			 + Check minValue constraint if present
			 */
			if (isDefined(attrDefinition.minValue)) {
				// TODO: Replace < with isLessThan when available in Toolsmith (ASAP)
				if (intValue < attrDefinition.minValue) {
					return `Attribute '${attributeName}' must be >= ${attrDefinition.minValue}, got ${intValue}`
				}
			}

			return undefined
		}
	}
}
