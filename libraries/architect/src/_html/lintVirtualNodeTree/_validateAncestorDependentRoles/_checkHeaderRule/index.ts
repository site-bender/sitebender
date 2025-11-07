import includes from "@sitebender/toolsmith/array/includes/index.ts"
import some from "@sitebender/toolsmith/array/some/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type { AncestorContext, ValidationError } from "../../types/index.ts"

/*++
 + Check header with sectioning ancestor rule
 + Cannot have banner role inside sectioning elements
 */
export default function _checkHeaderRule(
	node: VirtualNode,
): (ancestors: AncestorContext) => ReadonlyArray<ValidationError> {
	return function checkHeaderRuleWithNode(
		ancestors: AncestorContext,
	): ReadonlyArray<ValidationError> {
		if (node._tag !== "element" || node.tagName !== "HEADER") {
			return []
		}

		const restrictingTags = ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]

		function isRestrictingElement(ancestor: VirtualNode): boolean {
			return ancestor._tag === "element" &&
				includes(restrictingTags)(ancestor.tagName)
		}

		const hasRestrictingAncestor = some(isRestrictingElement)(ancestors)
		const role = node.attributes.role

		if (hasRestrictingAncestor && role === "banner") {
			return [{
				node,
				errorType: "invalid-ancestor-dependent-role",
				message: `<header> inside sectioning element cannot have role="banner"`,
				context: { role },
			}]
		}

		return []
	}
}
