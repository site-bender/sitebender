import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import { ROLES_BY_ELEMENT } from "../constants/index.ts"

/*++
 + Validates role attribute for a specific HTML element
 + Returns { role } if valid, or { data-§-bad-role } if invalid
 +
 + NOTE: This validates element→role permission only.
 + Does NOT validate:
 + - Role structure (required children/parents)
 + - Conditional permissions (handled in element-specific validators)
 + - Ancestor-dependent rules (handled in tree lint)
 */
export default function _validateRole(tagName: string) {
	return function _validateRoleForTagName(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		const permission = ROLES_BY_ELEMENT[tagName]

		if (!isDefined(permission)) {
			return { "data-§-bad-role": role }
		}

		if (permission === "none") {
			return { "data-§-bad-role": role }
		}

		if (permission === "any") {
			return { role }
		}

		if (includes(permission as ReadonlyArray<string>)(role)) {
			return { role }
		}

		return { "data-§-bad-role": role }
	}
}
