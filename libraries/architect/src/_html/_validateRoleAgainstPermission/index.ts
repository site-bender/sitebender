import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/*++
 + Validates role against a specific permission
 + Used for conditional role validation where permission is computed in component
 +
 + Permission types:
 + - "none": No role attribute allowed
 + - "any": Any valid ARIA role allowed
 + - ReadonlyArray<string>: Specific permitted roles
 +
 + Returns:
 + - { role }: Valid role
 + - { "data-§-bad-role" }: Invalid role
 + - {}: No role provided (valid)
 */
export default function _validateRoleAgainstPermission(
	permission: "none" | "any" | ReadonlyArray<string>,
) {
	return function _validateRoleAgainstPermissionWithRole(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		if (permission === "none") {
			return { "data-§-bad-role": role }
		}

		if (permission === "any") {
			return { role }
		}

		if (includes(permission)(role)) {
			return { role }
		}

		return { "data-§-bad-role": role }
	}
}
