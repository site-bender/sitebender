import type { VirtualNode } from "../../types/virtualNode/index.ts"

import isPlainObject from "../isPlainObject/index.ts"
import includes from "../../array/includes/index.ts"
import getOrElse from "../../monads/result/getOrElse/index.ts"
import getVirtualNodeTag from "../../object/getVirtualNodeTag/index.ts"
import { VIRTUAL_NODE_TAGS } from "../../types/index.ts"

/*++
 + Type guard for VirtualNode
 + Validates object structure and _tag value
 + Narrows unknown to VirtualNode for safe property access
 + Used in predicates, filters, and validators throughout Sitebender libraries
 */
export default function isVirtualNode(
	value: unknown,
): value is VirtualNode {
	/*++
	 + Step 1: Must be a plain object
	 + Filters out arrays, null, primitives, functions, etc.
	 */
	if (!isPlainObject(value)) {
		return false
	}

	/*++
	 + Step 2: Must have _tag property
	 + [EXCEPTION] Property check approved for validation
	 */
	if (!("_tag" in value)) {
		return false
	}

	/*++
	 + Step 3: Cast to minimal type for getVirtualNodeTag
	 + [EXCEPTION] Type assertion approved after validating _tag exists
	 + This is safe because we verified _tag exists above
	 */
	const node = value as { _tag: string }

	/*++
	 + Step 4: Validate _tag value using Result monad
	 + getVirtualNodeTag performs runtime validation even with type assertions
	 + Defends against: {} as VirtualNode, any escapes, malicious JSON
	 */
	const tagResult = getVirtualNodeTag(node as VirtualNode)
	const tag = getOrElse("")(tagResult)

	/*++
	 + Step 5: Verify tag is one of the valid VirtualNode tags
	 + Returns true only if tag is "element", "text", "comment", or "error"
	 */
	return includes(VIRTUAL_NODE_TAGS)(tag)
}
