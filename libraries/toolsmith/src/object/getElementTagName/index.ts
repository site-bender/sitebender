import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { ElementNode } from "../../types/index.ts"

import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import isElementNode from "../../predicates/isElementNode/index.ts"

/*++
 + Gets the tagName from an ElementNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as ElementNode, any escapes, JSON parsing, etc.
 + Used when extracting tag names for rendering, validation, error messages
 */
export default function getElementTagName(
	node: ElementNode,
): Result<ValidationError, string> {
	/*++
	 + [EXCEPTION] Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (!isElementNode(node)) {
		return error({
			code: "INVALID_ELEMENT_NODE",
			field: "tagName",
			messages: ["Node is not an ElementNode"],
			received: node,
			expected: "ElementNode with _tag='element'",
			suggestion: "Provide a valid ElementNode",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Property check approved for validating tagName exists
	 */
	if (!("tagName" in node)) {
		return error({
			code: "MISSING_TAG_NAME",
			field: "tagName",
			messages: ["ElementNode missing tagName property"],
			received: node,
			expected: "ElementNode with tagName",
			suggestion: "Add tagName property to ElementNode",
			severity: "requirement",
		})
	}

	const tagName = node.tagName

	/*++
	 + [EXCEPTION] typeof operator approved for runtime type checking
	 */
	if (typeof tagName !== "string") {
		return error({
			code: "INVALID_TAG_NAME_TYPE",
			field: "tagName",
			messages: ["tagName must be a string"],
			received: tagName,
			expected: "string",
			suggestion: "Set tagName to a string value",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] length check approved for validating non-empty string
	 */
	if (tagName.length === 0) {
		return error({
			code: "EMPTY_TAG_NAME",
			field: "tagName",
			messages: ["tagName cannot be empty"],
			received: tagName,
			expected: "non-empty string",
			suggestion: "Provide a valid HTML tag name",
			severity: "requirement",
		})
	}

	return ok(tagName)
}
