import includes from "@sitebender/toolsmith/array/includes/index.ts"
import some from "@sitebender/toolsmith/array/some/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type { AncestorContext, ValidationError } from "../../types/index.ts"

/*++
 + Check footer with sectioning ancestor rule
 + Cannot have contentinfo role inside sectioning elements
 */
export default function _checkFooterRule(
	node: VirtualNode,
): (ancestors: AncestorContext) => ReadonlyArray<ValidationError> {
	return function checkFooterRuleWithNode(
		ancestors: AncestorContext,
	): ReadonlyArray<ValidationError> {
		if (node._tag !== "element" || node.tagName !== "FOOTER") {
			return []
		}

		const restrictingTags = ["ARTICLE", "ASIDE", "MAIN", "NAV", "SECTION"]

		function isRestrictingElement(ancestor: VirtualNode): boolean {
			return ancestor._tag === "element" &&
				includes(restrictingTags)(ancestor.tagName)
		}

		const hasRestrictingAncestor = some(isRestrictingElement)(ancestors)
		const role = node.attributes.role

		if (hasRestrictingAncestor && role === "contentinfo") {
			return [{
				node,
				errorType: "invalid-ancestor-dependent-role",
				message:
					`<footer> inside sectioning element cannot have role="contentinfo"`,
				context: { role },
			}]
		}

		return []
	}
}
