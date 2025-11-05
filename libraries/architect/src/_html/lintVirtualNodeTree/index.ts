import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

import _traverseWithAncestors from "./_traverseWithAncestors/index.ts"
import _validateAncestorDependentRoles from "./_validateAncestorDependentRoles/index.ts"
import type { ValidationError } from "./types/index.ts"

/*++
 + Lints a VirtualNode tree for violations
 +
 + Phase 8 Implementation:
 + - Ancestor-dependent role validation
 + - Role structure requirements (basic)
 +
 + Future phases will add:
 + - ARIA landmark uniqueness
 + - Heading hierarchy validation
 + - Required children/parents for roles
 +
 + Signature (curried):
 + lintVirtualNodeTree(root) => errors
 +
 + Returns array of ValidationError objects
 +
 + Example:
 + const errors = lintVirtualNodeTree(virtualNodeTree)
 + if (errors.length > 0) {
 +   // Handle validation errors
 + }
 */
export default function lintVirtualNodeTree(
	root: VirtualNode,
): ReadonlyArray<ValidationError> {
	/*++
	 + Run tree traversal with ancestor-dependent validation
	 + Pass empty ancestors array for root
	 */
	const traverseWithValidator = _traverseWithAncestors(
		_validateAncestorDependentRoles,
	)

	const errors = traverseWithValidator([])(root)

	return errors
}
