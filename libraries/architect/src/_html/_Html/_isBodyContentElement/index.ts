import type { VirtualNode } from "../../../types/index.ts"

import includes from "@sitebender/toolsmith/array/includes/index.ts"
import isElementNode from "@sitebender/toolsmith/predicates/isElementNode/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

import { HEAD_ELEMENTS } from "../../constants/index.ts"

/*++
 + Private predicate that checks if an element belongs in BODY
 + Used to separate orphaned children into head vs body content
 + Returns true if NOT an element node OR NOT in HEAD_ELEMENTS
 + Uses Toolsmith's isElementNode for safe type narrowing
 */
export default function _isBodyContentElement(
	child: VirtualNode,
): boolean {
	/*++
	 + If not an element node (text, comment, error), it goes in body
	 */
	if (!isElementNode(child)) {
		return true
	}

	/*++
	 + If it's an element, check if it's NOT in HEAD_ELEMENTS
	 + Safe to access tagName because isElementNode narrowed the type
	 */
	return not(includes(HEAD_ELEMENTS)(child.tagName))
}
