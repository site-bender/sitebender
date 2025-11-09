import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { ElementNode, VirtualNode } from "../../types/index.ts"

import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import isElementNode from "../../predicates/isElementNode/index.ts"

/*++
 + Gets the children from an ElementNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as ElementNode, any escapes, JSON parsing, etc.
 + Used when traversing VirtualNode trees, rendering, validation
 */
export default function getElementChildren(
	node: ElementNode,
): Result<ValidationError, ReadonlyArray<VirtualNode>> {
	/*++
	 + [EXCEPTION] Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (!isElementNode(node)) {
		return error({
			code: "INVALID_ELEMENT_NODE",
			field: "children",
			messages: ["Node is not an ElementNode"],
			received: node,
			expected: "ElementNode with _tag='element'",
			suggestion: "Provide a valid ElementNode",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Property check approved for validating children exists
	 */
	if (!("children" in node)) {
		return error({
			code: "MISSING_CHILDREN",
			field: "children",
			messages: ["ElementNode missing children property"],
			received: node,
			expected: "ElementNode with children",
			suggestion: "Add children property to ElementNode",
			severity: "requirement",
		})
	}

	const children = node.children

	/*++
	 + [EXCEPTION] Array.isArray approved for runtime type checking
	 */
	if (!Array.isArray(children)) {
		return error({
			code: "INVALID_CHILDREN_TYPE",
			field: "children",
			messages: ["children must be an array"],
			received: children,
			expected: "ReadonlyArray<VirtualNode>",
			suggestion: "Set children to an array",
			severity: "requirement",
		})
	}

	return ok(children)
}
