import isArray from "../../predicates/isArray/index.ts"

/*++
 + Checks if an array is empty
 + Returns false if non-array value is passed
 */
export default function isEmpty<T>(array: ReadonlyArray<T>): boolean {
	/*++
	 + [EXCEPTION] Direct .length access is permitted here because:
	 + - TypeScript guarantees array is ReadonlyArray<T>
	 + - Predicates are internal utilities, not user-facing
	 + - No validation needed (type system enforces correctness)
	 + - Using length() monad wrapper adds unnecessary Result unwrapping
	 + - Runtime isArray check provides defensive safety
	 */
	return isArray(array) && array.length === 0
}
