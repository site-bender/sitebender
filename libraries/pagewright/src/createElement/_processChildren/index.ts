import type { Child, ElementConfig } from "../../types/index.ts"

import map from "@sitebender/toolsmith/array/map/index.ts"
import flatMap from "@sitebender/toolsmith/array/flatMap/index.ts"

import _processChild from "../_processChild/index.ts"
import _flattenChild from "./_flattenChild/index.ts"

/*++
 + Processes array of children into array of ElementConfigs
 + Invalid children become error nodes
 + Flattens nested arrays
 + Converts strings/numbers to text nodes
 */
export default function _processChildren(
	children: ReadonlyArray<Child>,
): ReadonlyArray<ElementConfig> {
	/*++
	 + Process each child (strings → text configs, invalid → error configs, etc.)
	 + Then flatten any nested arrays
	 */

	/*++
	 + Step 1: Map over children to process each one
	 */
	const processed = map(_processChild)(children)

	/*++
	 + Step 2: Flatten nested arrays using helper function
	 + _processChild can return: ElementConfig | ReadonlyArray<Child>
	 + _flattenChild recursively processes any returned arrays
	 */
	const flattened = flatMap(_flattenChild)(processed)

	return flattened
}
