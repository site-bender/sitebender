import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/*++
 + Validates role attribute for <label> element
 + Conditional validation based on for attribute and labelable element association
 +
 + With for attribute (associated with labelable element): No role allowed
 + Without for attribute: Any role allowed
 +
 + Note: Full validation requires checking if label contains a labelable element,
 + which requires tree analysis. This validator only checks the for attribute.
 + Tree lint will catch remaining violations.
 +
 + Returns:
 + - { role }: Valid role
 + - { "data-§-bad-role" }: Invalid role
 + - {}: No role provided (valid)
 */
export default function _validateLabelRole(hasForAttribute: boolean) {
	return function _validateLabelRoleWithAssociation(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		if (hasForAttribute) {
			// With for attribute: no role allowed
			return { "data-§-bad-role": role }
		}

		// Without for attribute: any role allowed
		// (Tree lint will validate if it contains a labelable element)
		return { role }
	}
}
