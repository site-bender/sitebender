import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Private helper that checks if all array elements satisfy predicate, returns boolean
 */
export default function _allArray<T>(
	predicate: (item: T, index: number) => boolean,
) {
	return function _allArrayWithPredicate(
		array: ReadonlyArray<T>,
	): boolean {
		// Happy path: predicate and array are valid
		if (and(isFunction(predicate))(isArray(array))) {
			//++ [EXCEPTION] .every() permitted in Toolsmith for performance - provides curried all wrapper
			return array.every(predicate)
		}

		// Fallback: return false for invalid inputs
		return false
	}
}
