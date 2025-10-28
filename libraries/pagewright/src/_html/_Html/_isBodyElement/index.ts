import type { ElementNode } from "@sitebender/toolsmith/types/index.ts"

import isElementNode from "@sitebender/toolsmith/predicates/isElementNode/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

/*++
 + Private predicate that checks if a value is a BODY element
 + Used to filter children and extract BODY elements
 + Uses Toolsmith's isElementNode for safe type narrowing
 */
export default function _isBodyElement(
	child: unknown,
): child is ElementNode {
	/*++
	 + Step 1: Must be a valid VirtualNode element first
	 */
	if (!isElementNode(child)) {
		return false
	}

	/*++
	 + Step 2: Check if tagName is BODY
	 + Safe to access tagName because isElementNode narrowed the type
	 */
	return isEqual("BODY")(child.tagName)
}
