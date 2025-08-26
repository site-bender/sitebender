/**
 * Removes duplicate elements from an array using a custom equality function
 *
 * Like nub but uses a custom equality function to determine which elements
 * are considered duplicates. Returns a new array with duplicates removed,
 * keeping only the first occurrence of each unique element according to
 * the equality function. Order is preserved based on first occurrence.
 * This is the customizable version of nub/unique.
 *
 * @curried
 * @param equalityFn - Function to determine if two elements are equal
 * @param array - Array to remove duplicates from
 * @returns New array with only unique elements per equality function
 * @example
 * ```typescript
 * // Case-insensitive deduplication
 * const caseInsensitive = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * nubBy(caseInsensitive)(["Hello", "HELLO", "world", "WORLD", "Hello"])
 * // ["Hello", "world"]
 *
 * // Deduplicate objects by property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 1, name: "Alicia" },
 *   { id: 3, name: "Charlie" }
 * ]
 * nubBy(byId)(users)
 * // [
 * //   { id: 1, name: "Alice" },
 * //   { id: 2, name: "Bob" },
 * //   { id: 3, name: "Charlie" }
 * // ]
 *
 * // Numeric tolerance deduplication
 * const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
 * nubBy(approxEqual)([1.0, 1.05, 1.5, 1.48, 2.0, 1.02])
 * // [1.0, 1.5, 2.0]
 *
 * // Deep equality for objects
 * const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)
 * nubBy(deepEqual)([
 *   { x: 1, y: 2 },
 *   { x: 2, y: 3 },
 *   { x: 1, y: 2 },
 *   { x: 3, y: 4 }
 * ])
 * // [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }]
 *
 * // Array length equality
 * const sameLength = (a: Array<any>, b: Array<any>) => a.length === b.length
 * nubBy(sameLength)([[1], [2, 3], [4], [5, 6, 7], [8, 9]])
 * // [[1], [2, 3], [5, 6, 7]]
 *
 * // Date deduplication (same day)
 * const sameDay = (a: Date, b: Date) =>
 *   a.toDateString() === b.toDateString()
 * const dates = [
 *   new Date("2024-01-01T09:00"),
 *   new Date("2024-01-02T10:00"),
 *   new Date("2024-01-01T14:00"),
 *   new Date("2024-01-03T11:00")
 * ]
 * nubBy(sameDay)(dates)
 * // [Date("2024-01-01T09:00"), Date("2024-01-02T10:00"), Date("2024-01-03T11:00")]
 *
 * // String prefix deduplication
 * const samePrefix = (a: string, b: string) =>
 *   a.slice(0, 3) === b.slice(0, 3)
 * nubBy(samePrefix)(["apple", "application", "banana", "bandana"])
 * // ["apple", "banana"]
 *
 * // Empty array
 * nubBy((a, b) => a === b)([])
 * // []
 *
 * // Single element
 * nubBy((a, b) => a === b)([42])
 * // [42]
 *
 * // All considered equal
 * const alwaysEqual = () => true
 * nubBy(alwaysEqual)([1, 2, 3, 4, 5])
 * // [1]
 * ```
 * @pure
 * @immutable
 * @safe
 */
const nubBy = <T>(
	equalityFn: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	const findDuplicates = (
		remaining: ReadonlyArray<T>, 
		result: Array<T>
	): Array<T> => {
		if (remaining.length === 0) {
			return result
		}

		const [head, ...tail] = remaining
		const isDuplicate = result.some((existing) => equalityFn(existing, head))
		
		return findDuplicates(
			tail, 
			isDuplicate ? result : [...result, head]
		)
	}

	return findDuplicates(array, [])
}

export default nubBy