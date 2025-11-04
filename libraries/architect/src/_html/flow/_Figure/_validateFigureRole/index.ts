import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import some from "@sitebender/toolsmith/array/some/index.ts"

/*++
 + Validates role attribute for <figure> element
 + Conditional validation based on presence of <figcaption> child
 +
 + With figcaption child: Only figure, none, or presentation roles allowed
 + Without figcaption child: Any role allowed
 +
 + Returns:
 + - { role }: Valid role
 + - { "data-§-bad-role" }: Invalid role
 + - {}: No role provided (valid)
 */
export default function _validateFigureRole(
	children: ReadonlyArray<VirtualNode>,
) {
	return function _validateFigureRoleWithChildren(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		function isFigcaption(child: VirtualNode): boolean {
			return child._tag === "element" && child.tagName === "FIGCAPTION"
		}

		const hasFigcaption = some(isFigcaption)(children)

		if (hasFigcaption) {
			// With figcaption: only figure, none, or presentation
			const allowedRoles = [
				"figure",
				"none",
				"presentation",
			] as const

			if (includes(allowedRoles)(role)) {
				return { role }
			}

			return { "data-§-bad-role": role }
		}

		// Without figcaption: any role allowed
		return { role }
	}
}
