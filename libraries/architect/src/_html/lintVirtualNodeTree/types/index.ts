import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

/*++
 + Validation error type for tree lint violations
 +
 + Records:
 + - The node that has the violation
 + - The type of violation
 + - Human-readable error message
 + - Optional: additional context
 */
export type ValidationError = Readonly<{
	node: VirtualNode
	errorType: ValidationErrorType
	message: string
	context?: Readonly<Record<string, unknown>>
}>

/*++
 + Types of validation errors
 */
export type ValidationErrorType =
	| "invalid-ancestor-dependent-role"
	| "invalid-role-structure"
	| "missing-required-child"
	| "invalid-parent-child-relationship"
	| "invalid-aria-attribute"
	| "duplicate-landmark"
	| "invalid-heading-hierarchy"

/*++
 + Ancestor context for tree traversal
 + Maintains list of ancestor nodes for context-dependent validation
 */
export type AncestorContext = ReadonlyArray<VirtualNode>
