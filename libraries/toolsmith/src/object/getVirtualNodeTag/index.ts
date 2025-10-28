import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { VirtualNode, VirtualNodeTag } from "../../types/index.ts"

import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import includes from "../../array/includes/index.ts"
import { VIRTUAL_NODE_TAGS } from "../../types/index.ts"

/*++
 + Gets the _tag from a VirtualNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as VirtualNode, any escapes, JSON parsing, etc.
 + Used in type guards and predicates for safe property access
 */
export default function getVirtualNodeTag(
	node: VirtualNode,
): Result<ValidationError, VirtualNodeTag> {
	/*++
	 + [EXCEPTION] typeof operator approved for runtime type checking
	 + Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (typeof node !== "object" || node === null) {
		return error({
			code: "INVALID_VIRTUAL_NODE",
			field: "_tag",
			messages: ["VirtualNode must be an object"],
			received: node,
			expected: "object",
			suggestion: "Provide a valid VirtualNode",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Property check approved for validating _tag exists
	 */
	if (!("_tag" in node)) {
		return error({
			code: "MISSING_TAG",
			field: "_tag",
			messages: ["VirtualNode missing _tag property"],
			received: node,
			expected: "object with _tag",
			suggestion: "Add _tag property to node",
			severity: "requirement",
		})
	}

	const tag = node._tag

	/*++
	 + [EXCEPTION] typeof operator approved for runtime type checking
	 */
	if (typeof tag !== "string") {
		return error({
			code: "INVALID_TAG_TYPE",
			field: "_tag",
			messages: ["_tag must be a string"],
			received: tag,
			expected: "string",
			suggestion: "Set _tag to a string value",
			severity: "requirement",
		})
	}

	if (!includes(VIRTUAL_NODE_TAGS)(tag)) {
		return error({
			code: "INVALID_TAG_VALUE",
			field: "_tag",
			messages: [`Invalid _tag value "${tag}"`],
			received: tag,
			expected: "element | text | comment | error",
			suggestion: "Use a valid VirtualNode tag",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Type assertion approved after runtime validation confirms tag is valid
	 */
	return ok(tag as VirtualNodeTag)
}
