import type { VirtualNode } from "../../../types/index.ts"

import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isElementNode from "@sitebender/toolsmith/predicates/isElementNode/index.ts"

import { HEAD_ELEMENTS } from "../../constants/index.ts"

/*++
 + Private predicate that checks if an element belongs in HEAD
 + Used to separate orphaned children into head vs body content
 + Uses Toolsmith's isElementNode for safe type narrowing
 */
export default function _isHeadContentElement(
	child: VirtualNode,
): boolean {
	/*++
	 + Step 1: Must be an element node (not text, comment, or error)
	 */
	if (!isElementNode(child)) {
		return false
	}

	/*++
	 + Step 2: Check if tagName is in HEAD_ELEMENTS array
	 + Safe to access tagName because isElementNode narrowed the type
	 */
	return includes(HEAD_ELEMENTS)(child.tagName)
}
