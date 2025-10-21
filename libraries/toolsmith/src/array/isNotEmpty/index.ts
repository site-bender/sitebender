import isArray from "../../validation/isArray/index.ts"

/*++
 + Checks if an array is not empty
 + Returns false if non-array value is passed
 */
export default function isNotEmpty<T>(array: ReadonlyArray<T>): boolean {
	/*++
	 + [EXCEPTION] &&, >, and .length operators are permitted here because:
	 + - TypeScript guarantees array is ReadonlyArray<T>
	 + - && (and) and > (greaterThan) would require monadic versions for consistency
	 + - .length would return Result monad in functional version
	 + - Predicates must remain simple and performant
	 + - Runtime isArray check provides defensive safety
	 */
	return isArray(array) && array.length > 0
}
