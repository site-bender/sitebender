import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * The complement of filter - keeps elements that don't satisfy the predicate
 *
 * Returns a new array containing only the elements for which the predicate
 * returns false. This is the logical opposite of filter - where filter keeps
 * elements that match, reject removes them. Useful when it's clearer to
 * specify what you don't want rather than what you do want.
 *
 * @param predicate - Function to test each element (returns true for elements to reject)
 * @param array - Array to filter
 * @returns New array with elements where predicate returned false
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic usage - reject even numbers
 * reject((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6])  // [1, 3, 5]
 *
 * // Reject null and undefined
 * reject((x: unknown) => x == null)([1, null, 2, undefined, 3])  // [1, 2, 3]
 *
 * // Reject by property
 * const users = [
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: false },
 *   { name: "Charlie", active: true }
 * ]
 * reject((u: { active: boolean }) => not(u.active))(users)
 * // [{ name: "Alice", active: true }, { name: "Charlie", active: true }]
 *
 * // Reject with index
 * reject((val: number, idx: number) => idx % 2 === 0)([10, 20, 30, 40, 50])
 * // [20, 40]
 *
 * // Edge cases
 * reject(() => true)([1, 2, 3])   // [] (reject all)
 * reject(() => false)([1, 2, 3])  // [1, 2, 3] (reject none)
 * reject(() => true)(null)        // []
 * ```
 */
const reject = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	return array.filter((value, index, arr) =>
		not(predicate(value, index, arr))
	)
}

export default reject
