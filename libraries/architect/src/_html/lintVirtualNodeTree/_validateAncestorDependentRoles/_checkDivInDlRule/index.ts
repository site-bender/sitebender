import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type { AncestorContext, ValidationError } from "../../types/index.ts"

/*++
 + Check div child of dl rule
 + Only none/presentation roles allowed
 */
export default function _checkDivInDlRule(
	node: VirtualNode,
): (ancestors: AncestorContext) => ReadonlyArray<ValidationError> {
	return function checkDivInDlRuleWithNode(
		ancestors: AncestorContext,
	): ReadonlyArray<ValidationError> {
		if (node._tag !== "element" || node.tagName !== "DIV") {
			return []
		}

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
				return [{
					node,
					errorType: "invalid-ancestor-dependent-role",
					message:
						`<div> child of <dl> can only have role="none" or role="presentation", got role="${role}"`,
					context: { parentTag: "DL", role },
				}]
			}
		}

		return []
	}
}
