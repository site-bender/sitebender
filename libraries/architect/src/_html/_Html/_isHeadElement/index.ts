import type { ElementNode } from "@sitebender/toolsmith/types/index.ts"

import isElementNode from "@sitebender/toolsmith/predicates/isElementNode/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

/*++
 + Private predicate that checks if a value is a HEAD element
 + Used to filter children and extract HEAD elements
 + Uses Toolsmith's isElementNode for safe type narrowing
 */
export default function _isHeadElement(
	child: unknown,
): child is ElementNode {
	/*++
	 + Step 1: Must be a valid VirtualNode element first
	 */
	if (!isElementNode(child)) {
		return false
	}

	/*++
	 + Step 2: Check if tagName is HEAD
	 + Safe to access tagName because isElementNode narrowed the type
	 */
	return isEqual("HEAD")(child.tagName)
}
