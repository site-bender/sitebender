import isNullish from "../../validation/isNullish/index.ts"
import not from "../../logic/not/index.ts"

/**
 * Returns all indices of elements that satisfy the predicate
 *
 * Finds and returns an array of all indices where the predicate function
 * returns true for the element at that index. Unlike findIndex which returns
 * only the first match, this returns all matching indices. Useful for locating
 * all occurrences, pattern matching, or multi-element operations.
 *
 * @pure
 * @immutable
 * @curried
 * @param predicate - Function to test each element
 * @param array - Array to search through
 * @returns Array of indices where predicate returns true
 * @example
 * ```typescript
 * // Basic usage
 * findIndices((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6])  // [1, 3, 5]
 * findIndices((x: string) => x === "a")(["a", "b", "a", "c"])  // [0, 2]
 *
 * // With complex predicates
 * const users = [
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: false },
 *   { name: "Charlie", active: true }
 * ]
 * findIndices(u => u.active)(users)  // [0, 2]
 *
 * // Edge cases
 * findIndices((x: number) => x > 100)([1, 2, 3])  // [] (no matches)
 * findIndices(() => true)([])                     // [] (empty array)
 *
 * // Partial application
 * const findEvens = findIndices((n: number) => n % 2 === 0)
 * findEvens([1, 2, 3, 4, 5])  // [1, 3]
 * ```
 */
const findIndices = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<number> => {
	if (isNullish(array)) {
		return []
	}

	return array.reduce<Array<number>>((indices, value, index) => {
		return predicate(value, index, array)
			? [...indices, index]
			: indices
	}, [])
}

export default findIndices
