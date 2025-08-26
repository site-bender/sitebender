/**
 * Splits an array into two arrays based on a predicate function
 *
 * Partitions elements into two groups: those that satisfy the predicate
 * (first array) and those that don't (second array). Returns a tuple
 * containing both arrays. Preserves the original order of elements.
 *
 * @curried (predicate) => (array) => [pass, fail]
 * @param predicate - Function that returns true for elements in first partition
 * @param array - Array to partition
 * @returns Tuple of [passing elements, failing elements]
 * @example
 * ```typescript
 * // Partition numbers by even/odd
 * partition((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6])
 * // [[2, 4, 6], [1, 3, 5]]
 *
 * // Partition by threshold
 * partition((x: number) => x > 10)([5, 15, 8, 20, 3, 12])
 * // [[15, 20, 12], [5, 8, 3]]
 *
 * // Partition strings by length
 * partition((s: string) => s.length > 3)(["hi", "hello", "hey", "world"])
 * // [["hello", "world"], ["hi", "hey"]]
 *
 * // Partition objects by property
 * partition((user: { active: boolean }) => user.active)([
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: false },
 *   { name: "Charlie", active: true }
 * ])
 * // [
 * //   [{ name: "Alice", active: true }, { name: "Charlie", active: true }],
 * //   [{ name: "Bob", active: false }]
 * // ]
 *
 * // Partial application for reusable partitioners
 * const partitionPositive = partition((x: number) => x > 0)
 * partitionPositive([1, -2, 3, -4, 5])  // [[1, 3, 5], [-2, -4]]
 *
 * // Handle edge cases
 * partition((x: number) => x > 0)([])        // [[], []]
 * partition((x: number) => x > 0)(null)      // [[], []]
 *
 * // Use with destructuring
 * const [adults, minors] = partition((age: number) => age >= 18)([15, 22, 17, 30, 16])
 * // adults: [22, 30], minors: [15, 17, 16]
 * ```
 * @curried Returns function for reusable partitioning
 * @pure Function has no side effects (assuming pure predicate)
 * @immutable Does not modify input array
 * @safe Handles null/undefined inputs gracefully
 */
const partition = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): [Array<T>, Array<T>] => {
	if (array == null || !Array.isArray(array)) {
		return [[], []]
	}

	return array.reduce<[Array<T>, Array<T>]>(
		([pass, fail], element, index) =>
			predicate(element, index, array)
				? [[...pass, element], fail]
				: [pass, [...fail, element]],
		[[], []],
	)
}

export default partition
