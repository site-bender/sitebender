import type { Child, VirtualNode } from "../../../types/index.ts"

import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"

import _processChildren from "../index.ts"

/*++
 + Flattens a single child item
 + If item is an array, recursively process it
 + If item is VirtualNode, wrap in array
 + Used by flatMap in _processChildren
 */
export default function _flattenChild(
	item: VirtualNode | ReadonlyArray<Child>,
): ReadonlyArray<VirtualNode> {
	if (isArray(item)) {
		/*++
		 + Recursively process nested children
		 */
		return _processChildren(item)
	}

	/*++
	 + item is VirtualNode at this point
	 */
	return [item as VirtualNode]
}
