import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import some from "@sitebender/toolsmith/array/some/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type {
	AncestorContext,
	ValidationError,
} from "../types/index.ts"

/*++
 + Validates ancestor-dependent role rules
 +
 + From Phase 8 requirements:
 + 1. div child of dl - Only none/presentation roles allowed
 + 2. footer - Different roles based on sectioning ancestors
 + 3. header - Different roles based on sectioning ancestors
 + 4. li - Must have listitem role if child of list with list role
 + 5. summary - If child of details, no role allowed
 +
 + Note: td, th, tr validations deferred (require grid/table role checking)
 +
 + Returns array of validation errors
 */
export default function _validateAncestorDependentRoles(
	node: VirtualNode,
	ancestors: AncestorContext,
): ReadonlyArray<ValidationError> {
	/*++
	 + Only validate element nodes
	 */
	if (node._tag !== "element") {
		return []
	}

	const errors: Array<ValidationError> = []

	/*++
	 + Rule 1: div child of dl
	 + Only none/presentation roles allowed
	 */
	if (node.tagName === "DIV") {
		const immediateParent = ancestors[0]

		if (
			immediateParent?._tag === "element" &&
			immediateParent.tagName === "DL"
		) {
			const role = node.attributes.role

			if (
				isDefined(role) &&
				role !== "none" &&
				role !== "presentation"
			) {
				errors.push({
					node,
					errorType: "invalid-ancestor-dependent-role",
					message: `<div> child of <dl> can only have role="none" or role="presentation", got role="${role}"`,
					context: { parentTag: "DL", role },
				})
			}
		}
	}

	/*++
	 + Rule 2 & 3: footer and header
	 + If descendant of article/aside/main/nav/section, different roles apply
	 */
	if (node.tagName === "FOOTER" || node.tagName === "HEADER") {
		const restrictingTags = ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]

		function isRestrictingElement(ancestor: VirtualNode): boolean {
			return ancestor._tag === "element" &&
				includes(restrictingTags)(ancestor.tagName)
		}

		const hasRestrictingAncestor = some(isRestrictingElement)(ancestors)
		const role = node.attributes.role

		if (node.tagName === "FOOTER") {
			/*++
			 + footer with restricting ancestor:
			 + - Can have: group, none, presentation, doc-footnote
			 + - Cannot have: contentinfo
			 */
			if (hasRestrictingAncestor && role === "contentinfo") {
				errors.push({
					node,
					errorType: "invalid-ancestor-dependent-role",
					message: `<footer> inside sectioning element cannot have role="contentinfo"`,
					context: { role },
				})
			}
		} else {
			/*++
			 + header with restricting ancestor:
			 + - Can have: group, none, presentation
			 + - Cannot have: banner
			 */
			if (hasRestrictingAncestor && role === "banner") {
				errors.push({
					node,
					errorType: "invalid-ancestor-dependent-role",
					message: `<header> inside sectioning element cannot have role="banner"`,
					context: { role },
				})
			}
		}
	}

	/*++
	 + Rule 4: li child of list element
	 + If parent has list role, li must have listitem role
	 + (This is a structural requirement, not strictly ancestor-dependent)
	 */
	if (node.tagName === "LI") {
		const immediateParent = ancestors[0]

		if (
			immediateParent?._tag === "element" &&
			(immediateParent.tagName === "UL" || immediateParent.tagName === "OL")
		) {
			const parentRole = immediateParent.attributes.role || "list"
			const liRole = node.attributes.role

			if (parentRole === "list" && liRole !== "listitem" && isDefined(liRole)) {
				errors.push({
					node,
					errorType: "invalid-role-structure",
					message: `<li> child of list element with role="list" must have role="listitem", got role="${liRole}"`,
					context: { parentRole, liRole },
				})
			}
		}
	}

	/*++
	 + Rule 5: summary child of details
	 + If child of details, no role allowed
	 */
	if (node.tagName === "SUMMARY") {
		const immediateParent = ancestors[0]

		if (
			immediateParent?._tag === "element" &&
			immediateParent.tagName === "DETAILS"
		) {
			const role = node.attributes.role

			if (isDefined(role)) {
				errors.push({
					node,
					errorType: "invalid-ancestor-dependent-role",
					message: `<summary> child of <details> cannot have explicit role, got role="${role}"`,
					context: { parentTag: "DETAILS", role },
				})
			}
		}
	}

	return errors
}
