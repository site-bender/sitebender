import isSet from "../../validation/isSet/index.ts"

/*++
 + Checks if a set is not empty
 + Returns false if non-set value is passed
 */
export default function isNotEmpty<T>(set: ReadonlySet<T>): boolean {
	/*++
	 + [EXCEPTION] Direct .size access is permitted here because:
	 + - TypeScript guarantees set is ReadonlySet<T>
	 + - Predicates are internal utilities, not user-facing
	 + - No validation needed (type system enforces correctness)
	 + - Runtime isSet check provides defensive safety
	 */
	return isSet(set) && set.size > 0
}
