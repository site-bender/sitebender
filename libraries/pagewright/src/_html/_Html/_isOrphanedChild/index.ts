import type { ElementNode } from "@sitebender/toolsmith/types/index.ts"

import isElementNode from "@sitebender/toolsmith/predicates/isElementNode/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"

/*++
 + Private predicate that checks if a child is orphaned (not HEAD or BODY)
 + Used to filter children and identify elements that need to be moved
 + Uses Toolsmith's isElementNode for safe type narrowing
 */
export default function _isOrphanedChild(
	child: unknown,
): child is ElementNode {
	/*++
	 + Step 1: Must be a valid VirtualNode element first
	 */
	if (!isElementNode(child)) {
		return false
	}

	/*++
	 + Step 2: Check that it's neither HEAD nor BODY
	 + Safe to access tagName because isElementNode narrowed the type
	 */
	const isHead = isEqual("HEAD")(child.tagName)
	const isBody = isEqual("BODY")(child.tagName)

	return and(not(isHead))(not(isBody))
}
