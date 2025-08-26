/**
 * Splits an array into two arrays based on a predicate function
 *
 * Partitions elements into two groups: those that satisfy the predicate
 * (first array) and those that don't (second array). Returns a tuple
 * containing both arrays. Preserves the original order of elements.
 *
 * @param predicate - Function that returns true for elements in first partition
 * @param array - Array to partition
 * @returns Tuple of [passing elements, failing elements]
 * 
 * @pure
 * @curried
 * @immutable
 * @safe
 * 
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
 * // Partition objects by property
 * partition((user: { active: boolean }) => user.active)([
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: false },
 *   { name: "Charlie", active: true }
 * ])
 * // [[{ name: "Alice", active: true }, { name: "Charlie", active: true }],
 * //  [{ name: "Bob", active: false }]]
 *
 * // Use with destructuring
 * const [adults, minors] = partition((age: number) => age >= 18)([15, 22, 17, 30])
 * // adults: [22, 30], minors: [15, 17]
 *
 * // Edge cases
 * partition((x: number) => x > 0)([]) // [[], []]
 * partition((x: number) => x > 0)(null) // [[], []]
 * ```
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
