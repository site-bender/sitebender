import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/*++
 + Validates role attribute for <a> element
 + Conditional validation based on href attribute
 +
 + With href: Specific permitted roles
 + Without href: Any role allowed
 +
 + Returns:
 + - { role }: Valid role
 + - { "data-§-bad-role" }: Invalid role
 + - {}: No role provided (valid)
 */
export default function _validateARole(hasHref: boolean) {
	return function _validateARoleWithHasHref(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		if (hasHref) {
			const allowedRoles = [
				"button",
				"checkbox",
				"doc-backlink",
				"doc-biblioref",
				"doc-glossref",
				"doc-noteref",
				"menuitem",
				"menuitemcheckbox",
				"menuitemradio",
				"option",
				"radio",
				"switch",
				"tab",
				"treeitem",
			] as const

			if (includes(allowedRoles)(role)) {
				return { role }
			}

			return { "data-§-bad-role": role }
		}

		return { role }
	}
}
