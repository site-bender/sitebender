import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/*++
 + Validates role attribute for <area> element
 + Conditional validation based on href attribute
 +
 + With href: Specific permitted roles (button, link, generic)
 + Without href: Only generic role allowed
 +
 + Returns:
 + - { role }: Valid role
 + - { "data-§-bad-role" }: Invalid role
 + - {}: No role provided (valid)
 */
export default function _validateAreaRole(hasHref: boolean) {
	return function _validateAreaRoleWithHasHref(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		if (hasHref) {
			const allowedRoles = [
				"button",
				"link",
			] as const

			if (includes(allowedRoles)(role)) {
				return { role }
			}

			return { "data-§-bad-role": role }
		}

		// Without href: generic role only
		if (role === "generic") {
			return { role }
		}

		return { "data-§-bad-role": role }
	}
}
