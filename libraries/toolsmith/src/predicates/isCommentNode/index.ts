import type { CommentNode } from "../../types/virtualNode/index.ts"

import isVirtualNode from "../isVirtualNode/index.ts"
import isEqual from "../isEqual/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"
import getVirtualNodeTag from "../../object/getVirtualNodeTag/index.ts"

/*++
 + Type guard for VirtualNode comment variant
 + Narrows VirtualNode to CommentNode (comment with content string)
 + Used when you need to access comment-specific properties safely
 */
export default function isCommentNode(
	value: unknown,
): value is CommentNode {
	/*++
	 + Step 1: Must be a valid VirtualNode first
	 */
	if (!isVirtualNode(value)) {
		return false
	}

	/*++
	 + Step 2: Get the _tag value safely using Result monad
	 */
	const tagResult = getVirtualNodeTag(value)
	const tag = getOrElse("")(tagResult)

	/*++
	 + Step 3: Verify tag is "comment"
	 */
	return isEqual("comment")(tag)
}
