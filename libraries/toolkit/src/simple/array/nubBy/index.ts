import isNullish from "../../validation/isNullish/index.ts"

/**
 * Removes duplicate elements from an array using a custom equality function
 *
 * Like nub but uses a custom equality function to determine which elements
 * are considered duplicates. Returns a new array with duplicates removed,
 * keeping only the first occurrence of each unique element according to
 * the equality function. Order is preserved based on first occurrence.
 * This is the customizable version of nub/unique.
 *
 * @param equalityFn - Function to determine if two elements are equal
 * @param array - Array to remove duplicates from
 * @returns New array with only unique elements per equality function
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // Case-insensitive deduplication
 * const caseInsensitive = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * nubBy(caseInsensitive)(["Hello", "HELLO", "world"])
 * // ["Hello", "world"]
 *
 * // Deduplicate objects by property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Alicia" }
 * ]
 * nubBy(byId)(users)
 * // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
 *
 * // Numeric tolerance
 * const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
 * nubBy(approxEqual)([1.0, 1.05, 1.5, 1.48, 2.0])
 * // [1.0, 1.5, 2.0]
 *
 * // Partial application
 * const dedupeCaseInsensitive = nubBy((a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase())
 * dedupeCaseInsensitive(["foo", "FOO", "bar"]) // ["foo", "bar"]
 *
 * // Edge cases
 * nubBy((a, b) => a === b)([]) // []
 * nubBy((a, b) => a === b)(null) // []
 * const alwaysEqual = () => true
 * nubBy(alwaysEqual)([1, 2, 3]) // [1]
 * ```
 */
const nubBy = <T>(
	equalityFn: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}

	const findDuplicates = (
		remaining: ReadonlyArray<T>,
		result: Array<T>,
	): Array<T> => {
		if (remaining.length === 0) {
			return result
		}

		const [head, ...tail] = remaining
		const isDuplicate = result.some((existing) => equalityFn(existing, head))

		return findDuplicates(
			tail,
			isDuplicate ? result : [...result, head],
		)
	}

	return findDuplicates(array, [])
}

export default nubBy
