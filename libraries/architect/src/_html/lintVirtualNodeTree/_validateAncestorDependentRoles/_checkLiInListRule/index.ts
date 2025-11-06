import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type {
	AncestorContext,
	ValidationError,
} from "../../types/index.ts"

/*++
 + Check li child of list element rule
 + If parent has list role, li must have listitem role
 */
export default function _checkLiInListRule(
	node: VirtualNode,
): (ancestors: AncestorContext) => ReadonlyArray<ValidationError> {
	return function checkLiInListRuleWithNode(
		ancestors: AncestorContext,
	): ReadonlyArray<ValidationError> {
		if (node._tag !== "element" || node.tagName !== "LI") {
			return []
		}

		const immediateParent = ancestors[0]

		if (
			immediateParent?._tag === "element" &&
			(immediateParent.tagName === "UL" || immediateParent.tagName === "OL")
		) {
			const parentRole = immediateParent.attributes.role || "list"
			const liRole = node.attributes.role

			if (parentRole === "list" && liRole !== "listitem" && isDefined(liRole)) {
				return [{
					node,
					errorType: "invalid-role-structure",
					message: `<li> child of list element with role="list" must have role="listitem", got role="${liRole}"`,
					context: { parentRole, liRole },
				}]
			}
		}

		return []
	}
}
