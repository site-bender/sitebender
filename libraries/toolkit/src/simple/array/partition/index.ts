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
 *   { name: "Charlie", active: true },
 *   { name: "Dave", active: false }
 * ])
 * // [
 * //   [{ name: "Alice", active: true }, { name: "Charlie", active: true }],
 * //   [{ name: "Bob", active: false }, { name: "Dave", active: false }]
 * // ]
 * 
 * // Partition with type narrowing
 * interface User { name: string; age?: number }
 * const hasAge = (user: User): user is User & { age: number } => 
 *   user.age !== undefined
 * 
 * const [withAge, withoutAge] = partition(hasAge)([
 *   { name: "Alice", age: 30 },
 *   { name: "Bob" },
 *   { name: "Charlie", age: 25 }
 * ])
 * // withAge: [{ name: "Alice", age: 30 }, { name: "Charlie", age: 25 }]
 * // withoutAge: [{ name: "Bob" }]
 * 
 * // Partition by multiple conditions
 * partition((x: { score: number; passed: boolean }) => 
 *   x.score >= 70 && x.passed
 * )([
 *   { score: 85, passed: true },
 *   { score: 65, passed: true },
 *   { score: 75, passed: false },
 *   { score: 90, passed: true }
 * ])
 * // [
 * //   [{ score: 85, passed: true }, { score: 90, passed: true }],
 * //   [{ score: 65, passed: true }, { score: 75, passed: false }]
 * // ]
 * 
 * // Partial application for reusable partitioners
 * const partitionPositive = partition((x: number) => x > 0)
 * partitionPositive([1, -2, 3, -4, 5])  // [[1, 3, 5], [-2, -4]]
 * partitionPositive([10, -10, 0, 20])   // [[10, 20], [-10, 0]]
 * 
 * // Handle edge cases
 * partition((x: number) => x > 0)([])        // [[], []]
 * partition((x: number) => x > 0)([1, 2, 3]) // [[1, 2, 3], []]
 * partition((x: number) => x < 0)([1, 2, 3]) // [[], [1, 2, 3]]
 * 
 * // Handle null/undefined gracefully
 * partition((x: number) => x > 0)(null)      // [[], []]
 * partition((x: number) => x > 0)(undefined) // [[], []]
 * 
 * // Use with destructuring
 * const [adults, minors] = partition((age: number) => age >= 18)([15, 22, 17, 30, 16])
 * // adults: [22, 30], minors: [15, 17, 16]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Order preserving - maintains relative order in both partitions
 * @property Type safe - preserves element types in both arrays
 */
const partition = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean
) => (
	array: ReadonlyArray<T> | null | undefined
): [Array<T>, Array<T>] => {
	if (array == null || !Array.isArray(array)) {
		return [[], []]
	}
	
	return array.reduce<[Array<T>, Array<T>]>(
		([pass, fail], element, index) => 
			predicate(element, index, array)
				? [[...pass, element], fail]
				: [pass, [...fail, element]],
		[[], []]
	)
}

export default partition