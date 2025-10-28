import type { ElementNode } from "../../types/virtualNode/index.ts"

import isVirtualNode from "../isVirtualNode/index.ts"
import isEqual from "../isEqual/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"
import getVirtualNodeTag from "../../object/getVirtualNodeTag/index.ts"

/*++
 + Type guard for VirtualNode element variant
 + Narrows VirtualNode to ElementNode (element with tagName, attributes, children)
 + Used when you need to access element-specific properties safely
 */
export default function isElementNode(
	value: unknown,
): value is ElementNode {
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
	 + Step 3: Verify tag is "element"
	 */
	return isEqual("element")(tag)
}
