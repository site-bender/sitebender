import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { ElementNode } from "../../types/index.ts"

import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import isElementNode from "../../predicates/isElementNode/index.ts"

/*++
 + Gets the attributes from an ElementNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as ElementNode, any escapes, JSON parsing, etc.
 + Used when extracting attributes for rendering, validation, DOM operations
 */
export default function getElementAttributes(
	node: ElementNode,
): Result<ValidationError, Readonly<Record<string, string>>> {
	/*++
	 + [EXCEPTION] Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (!isElementNode(node)) {
		return error({
			code: "INVALID_ELEMENT_NODE",
			field: "attributes",
			messages: ["Node is not an ElementNode"],
			received: node,
			expected: "ElementNode with _tag='element'",
			suggestion: "Provide a valid ElementNode",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Property check approved for validating attributes exists
	 */
	if (!("attributes" in node)) {
		return error({
			code: "MISSING_ATTRIBUTES",
			field: "attributes",
			messages: ["ElementNode missing attributes property"],
			received: node,
			expected: "ElementNode with attributes",
			suggestion: "Add attributes property to ElementNode",
			severity: "requirement",
		})
	}

	const attributes = node.attributes

	/*++
	 + [EXCEPTION] typeof operator approved for runtime type checking
	 */
	if (typeof attributes !== "object" || attributes === null) {
		return error({
			code: "INVALID_ATTRIBUTES_TYPE",
			field: "attributes",
			messages: ["attributes must be an object"],
			received: attributes,
			expected: "Record<string, string>",
			suggestion: "Set attributes to an object",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Array.isArray approved for validating not an array
	 */
	if (Array.isArray(attributes)) {
		return error({
			code: "ATTRIBUTES_IS_ARRAY",
			field: "attributes",
			messages: ["attributes cannot be an array"],
			received: attributes,
			expected: "Record<string, string>",
			suggestion: "Use an object for attributes",
			severity: "requirement",
		})
	}

	return ok(attributes)
}
