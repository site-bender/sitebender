import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isLessThan from "@sitebender/toolsmith/predicates/isLessThan/index.ts"
import isUnequal from "@sitebender/toolsmith/predicates/isUnequal/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import toString from "@sitebender/toolsmith/string/toString/index.ts"

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

			if (or(isNaN(intValue))(isUnequal(toString(intValue))(value))) {
				return `Attribute '${attributeName}' must be an integer, got "${value}"`
			}

			/*++
			 + Check minValue constraint if present
			 */
			if (isDefined(attrDefinition.minValue)) {
				if (isLessThan(intValue)(attrDefinition.minValue)) {
					return `Attribute '${attributeName}' must be >= ${attrDefinition.minValue}, got ${intValue}`
				}
			}

			return undefined
		}
	}
}
