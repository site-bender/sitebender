import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import join from "@sitebender/toolsmith/array/join/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

import type { AriaAttributeDefinition } from "../../../constants/ariaStandards/index.ts"

/*++
 + Validates nmtoken value against enumerated values if present
 */
export default function _validateNmtoken(attributeName: string) {
	return function _validateNmtokenForAttribute(
		attrDefinition: AriaAttributeDefinition,
	) {
		return function _validateNmtokenValue(value: string): string | undefined {
			/*++
			 + If no enumerated values, accept any token
			 */
			if (not(isDefined(attrDefinition.values))) {
				return undefined
			}

			const { values } = attrDefinition

			if (includes(values)(value)) {
				return undefined
			}

			const valuesList = join('", "')(values)

			return `Attribute '${attributeName}' must be one of: "${valuesList}", got "${value}"`
		}
	}
}
