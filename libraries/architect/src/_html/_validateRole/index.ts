import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import { ROLES_BY_ELEMENT } from "../constants/index.ts"

/*++
 + Validates role attribute for a specific HTML element
 + Returns { role } if valid, or { data-§-bad-role } if invalid
 + First pass - simplified role validation
 */
export default function _validateRole(tagName: string) {
	return function _validateRoleForTagName(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isString(role)) {
			return {}
		}

		const permittedRoles = ROLES_BY_ELEMENT[tagName] || []

		if (includes(permittedRoles)(role)) {
			return { role }
		}

		return { "data-§-bad-role": role }
	}
}
