import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type {
	AncestorContext,
	ValidationError,
} from "../../types/index.ts"

/*++
 + Check summary child of details rule
 + If child of details, no role allowed
 */
export default function _checkSummaryInDetailsRule(
	node: VirtualNode,
): (ancestors: AncestorContext) => ReadonlyArray<ValidationError> {
	return function checkSummaryInDetailsRuleWithNode(
		ancestors: AncestorContext,
	): ReadonlyArray<ValidationError> {
		if (node._tag !== "element" || node.tagName !== "SUMMARY") {
			return []
		}

		const immediateParent = ancestors[0]

		if (
			immediateParent?._tag === "element" &&
			immediateParent.tagName === "DETAILS"
		) {
			const role = node.attributes.role

			if (isDefined(role)) {
				return [{
					node,
					errorType: "invalid-ancestor-dependent-role",
					message: `<summary> child of <details> cannot have explicit role, got role="${role}"`,
					context: { parentTag: "DETAILS", role },
				}]
			}
		}

		return []
	}
}
