import isPlainObject from "../../validation/isPlainObject/index.ts"

/*++
 + Checks if a plain object is not empty
 + Returns false if non-object value is passed
 */
export default function isNotEmpty(obj: Record<string, unknown>): boolean {
	/*++
	 + [EXCEPTION] Direct Object.keys access is permitted here because:
	 + - TypeScript guarantees obj is Record<string, unknown>
	 + - Predicates are internal utilities, not user-facing
	 + - No validation needed (type system enforces correctness)
	 + - Runtime isPlainObject check provides defensive safety
	 + - Checks own enumerable properties only
	 */
	return isPlainObject(obj) && Object.keys(obj).length > 0
}
