import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { CommentNode } from "../../types/index.ts"

import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import isCommentNode from "../../predicates/isCommentNode/index.ts"

/*++
 + Gets the content from a CommentNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as CommentNode, any escapes, JSON parsing, etc.
 + Used when extracting comment content for rendering, validation
 */
export default function getCommentContent(
	node: CommentNode,
): Result<ValidationError, string> {
	/*++
	 + [EXCEPTION] Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (!isCommentNode(node)) {
		return error({
			code: "INVALID_COMMENT_NODE",
			field: "content",
			messages: ["Node is not a CommentNode"],
			received: node,
			expected: "CommentNode with _tag='comment'",
			suggestion: "Provide a valid CommentNode",
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
			messages: ["CommentNode missing content property"],
			received: node,
			expected: "CommentNode with content",
			suggestion: "Add content property to CommentNode",
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
