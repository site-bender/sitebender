import concat from "@sitebender/toolsmith/array/concat/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import type {
	AncestorContext,
	ValidationError,
} from "../types/index.ts"

/*++
 + Traverses VirtualNode tree with ancestor context
 +
 + Signature (curried):
 + _traverseWithAncestors(validator)(ancestors)(node) => errors
 +
 + Logic:
 + 1. Call validator function with (node, ancestors)
 + 2. If node has children, recursively traverse them
 + 3. Add current node to ancestors for child traversal
 + 4. Accumulate all errors from node + children
 +
 + Example:
 + const validator = (node, ancestors) => {
 +   // Validate based on node and ancestors
 +   return errors
 + }
 + const errors = _traverseWithAncestors(validator)([])(rootNode)
 */
export default function _traverseWithAncestors(
	validator: (
		node: VirtualNode,
		ancestors: AncestorContext,
	) => ReadonlyArray<ValidationError>,
) {
	return function _traverseWithAncestorsWithValidator(
		ancestors: AncestorContext,
	) {
		return function _traverseWithAncestorsWithAncestors(
			node: VirtualNode,
		): ReadonlyArray<ValidationError> {
			/*++
			 + Validate current node
			 */
			const nodeErrors = validator(node, ancestors)

			/*++
			 + If not an element node, no children to traverse
			 */
			if (node._tag !== "element") {
				return nodeErrors
			}

			/*++
			 + Traverse children with updated ancestor context
			 + Add current node to ancestors for child context
			 */
			const newAncestors = concat([node])(ancestors)

			/*++
			 + Accumulate errors from all children
			 */
			function processChild(
				accumulatedErrors: ReadonlyArray<ValidationError>,
				child: VirtualNode,
			): ReadonlyArray<ValidationError> {
				const childErrors = _traverseWithAncestorsWithValidator(
					newAncestors,
				)(child)

				return concat(accumulatedErrors)(childErrors)
			}

			const childErrors = reduce(processChild)(
				[] as ReadonlyArray<ValidationError>,
			)(node.children)

			/*++
			 + Combine node errors + child errors
			 */
			return concat(nodeErrors)(childErrors)
		}
	}
}
