import type { ErrorNode } from "../../types/virtualNode/index.ts"

import isVirtualNode from "../isVirtualNode/index.ts"
import isEqual from "../isEqual/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"
import getVirtualNodeTag from "../../object/getVirtualNodeTag/index.ts"

/*++
 + Type guard for VirtualNode error variant
 + Narrows VirtualNode to ErrorNode (error with code, message, optional received/context)
 + Used when you need to access error-specific properties safely
 */
export default function isErrorNode(
	value: unknown,
): value is ErrorNode {
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
	 + Step 3: Verify tag is "error"
	 */
	return isEqual("error")(tag)
}
