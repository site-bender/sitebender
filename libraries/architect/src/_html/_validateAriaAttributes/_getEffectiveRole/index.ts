import and from "@sitebender/toolsmith/logic/and/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

import { HTML_ELEMENTS } from "../../constants/ariaStandards/index.ts"

/*++
 + Determines the effective ARIA role for an HTML element
 +
 + Logic:
 + 1. If explicit role provided and valid for element → use explicit role
 + 2. If no explicit role or invalid → use implicit role
 + 3. If element has no implicit role → return undefined
 +
 + Returns: effective role name or undefined
 */
export default function _getEffectiveRole(tagName: string) {
	return function _getEffectiveRoleForTagName(
		explicitRole: unknown,
	): string | undefined {
		const elementRules = HTML_ELEMENTS[tagName.toLowerCase()]

		/*++
		 + If element not in our standards data, return undefined
		 + (Will be added in full expansion)
		 */
		if (not(isDefined(elementRules))) {
			return undefined
		}

		/*++
		 + If explicit role provided, validate it's allowed on this element
		 */
		if (and(isDefined(explicitRole))(isString(explicitRole))) {
			const { allowedRoles } = elementRules

			/*++
			 + allowedRoles: "any" → accept any role
			 */
			if (isEqual(allowedRoles)("any")) {
				return explicitRole
			}

			/*++
			 + allowedRoles: false → no explicit role allowed
			 + Ignore explicit role, use implicit
			 */
			if (isEqual(allowedRoles)(false)) {
				return elementRules.implicitRole
			}

			/*++
			 + allowedRoles: array → check if role is in permitted list
			 */
			if (Array.isArray(allowedRoles)) {
				if (includes(allowedRoles)(explicitRole)) {
					return explicitRole
				}

				/*++
				 + Explicit role not in allowed list
				 + Fall through to use implicit role
				 */
			}
		}

		/*++
		 + No valid explicit role → use implicit role
		 */
		return elementRules.implicitRole
	}
}
