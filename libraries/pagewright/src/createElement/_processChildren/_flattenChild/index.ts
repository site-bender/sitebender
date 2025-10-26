import type { Child, ElementConfig } from "../../../types/index.ts"

import isArray from "@sitebender/toolsmith/predicates/isArray/index.ts"

import _processChildren from "../index.ts"

/*++
 + Flattens a single child item
 + If item is an array, recursively process it
 + If item is ElementConfig, wrap in array
 + Used by flatMap in _processChildren
 */
export default function _flattenChild(
	item: ElementConfig | ReadonlyArray<Child>,
): ReadonlyArray<ElementConfig> {
	if (isArray(item)) {
		/*++
		 + Recursively process nested children
		 */
		return _processChildren(item)
	}

	/*++
	 + item is ElementConfig at this point
	 */
	return [item as ElementConfig]
}
