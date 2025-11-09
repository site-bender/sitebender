import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { TextNode } from "../../types/index.ts"

import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import isTextNode from "../../predicates/isTextNode/index.ts"

/*++
 + Gets the content from a TextNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as TextNode, any escapes, JSON parsing, etc.
 + Used when extracting text content for rendering, validation
 */
export default function getTextContent(
	node: TextNode,
): Result<ValidationError, string> {
	/*++
	 + [EXCEPTION] Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (!isTextNode(node)) {
		return error({
			code: "INVALID_TEXT_NODE",
			field: "content",
			messages: ["Node is not a TextNode"],
			received: node,
			expected: "TextNode with _tag='text'",
			suggestion: "Provide a valid TextNode",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Property check approved for validating content exists
	 */
	if (!("content" in node)) {
		return error({
			code: "MISSING_CONTENT",
			field: "content",
			messages: ["TextNode missing content property"],
			received: node,
			expected: "TextNode with content",
			suggestion: "Add content property to TextNode",
			severity: "requirement",
		})
	}

	const content = node.content

	/*++
	 + [EXCEPTION] typeof operator approved for runtime type checking
	 */
	if (typeof content !== "string") {
		return error({
			code: "INVALID_CONTENT_TYPE",
			field: "content",
			messages: ["content must be a string"],
			received: content,
			expected: "string",
			suggestion: "Set content to a string value",
			severity: "requirement",
		})
	}

	return ok(content)
}
