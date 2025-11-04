import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"

/*++
 + Validates role attribute for <img> element
 + Conditional validation based on alt attribute
 +
 + With accessible name (non-empty alt): Specific permitted roles
 + With empty alt (alt=""): Only none/presentation allowed
 + Without alt: Permissive (but technically invalid HTML)
 +
 + Returns:
 + - { role }: Valid role
 + - { "data-§-bad-role" }: Invalid role
 + - {}: No role provided (valid)
 */
export default function _validateImgRole(
	hasAccessibleName: boolean,
	hasEmptyAlt: boolean,
) {
	return function _validateImgRoleWithContext(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		if (hasEmptyAlt) {
			// With empty alt (alt=""), only none/presentation allowed
			const allowedRoles = [
				"none",
				"presentation",
			] as const

			if (includes(allowedRoles)(role)) {
				return { role }
			}

			return { "data-§-bad-role": role }
		}

		if (hasAccessibleName) {
			// With accessible name (non-empty alt), specific roles allowed
			const allowedRoles = [
				"button",
				"checkbox",
				"doc-cover",
				"link",
				"math",
				"menuitem",
				"menuitemcheckbox",
				"menuitemradio",
				"meter",
				"none",
				"option",
				"presentation",
				"progressbar",
				"radio",
				"scrollbar",
				"separator",
				"slider",
				"switch",
				"tab",
				"treeitem",
			] as const

			if (includes(allowedRoles)(role)) {
				return { role }
			}

			return { "data-§-bad-role": role }
		}

		// Without alt: be permissive but prefer none/presentation
		const allowedRoles = [
			"none",
			"presentation",
		] as const

		if (includes(allowedRoles)(role)) {
			return { role }
		}

		return { "data-§-bad-role": role }
	}
}
