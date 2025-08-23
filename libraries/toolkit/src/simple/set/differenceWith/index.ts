/**
 * Returns elements in the first Set but not in the second, using a custom equality function
 * 
 * Like difference, but allows you to specify how elements should be compared.
 * This is useful when you need to compare objects by a specific property
 * or use custom logic for equality. The comparator function receives elements
 * from both sets and should return true if they are considered equal.
 * 
 * @curried (comparator) => (subtrahend) => (minuend) => result
 * @param comparator - Function to determine if elements are equal
 * @param subtrahend - Set of elements to exclude
 * @param minuend - Set to remove elements from
 * @returns New Set with elements from minuend not in subtrahend (per comparator)
 * @example
 * ```typescript
 * // Compare objects by id property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * differenceWith(byId)(
 *   new Set([{ id: 2, name: "Bob" }])
 * )(
 *   new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Robert" }, { id: 3, name: "Charlie" }])
 * )
 * // Set { { id: 1, name: "Alice" }, { id: 3, name: "Charlie" } }
 * 
 * // Case-insensitive string comparison
 * const caseInsensitive = (a: string, b: string) => 
 *   a.toLowerCase() === b.toLowerCase()
 * differenceWith(caseInsensitive)(
 *   new Set(["HELLO", "WORLD"])
 * )(
 *   new Set(["hello", "foo", "World", "bar"])
 * )
 * // Set { "foo", "bar" }
 * 
 * // Compare by multiple properties
 * interface User { name: string; age: number }
 * const sameUser = (a: User, b: User) => a.name === b.name && a.age === b.age
 * differenceWith(sameUser)(
 *   new Set([{ name: "Alice", age: 30 }])
 * )(
 *   new Set([
 *     { name: "Alice", age: 30 },
 *     { name: "Alice", age: 31 },
 *     { name: "Bob", age: 30 }
 *   ])
 * )
 * // Set { { name: "Alice", age: 31 }, { name: "Bob", age: 30 } }
 * 
 * // Numeric tolerance comparison
 * const withinTolerance = (a: number, b: number) => Math.abs(a - b) < 0.01
 * differenceWith(withinTolerance)(
 *   new Set([1.0, 2.0])
 * )(
 *   new Set([0.999, 1.5, 2.001, 3.0])
 * )
 * // Set { 1.5, 3.0 }
 * 
 * // Compare arrays by length
 * const sameLength = (a: Array<any>, b: Array<any>) => a.length === b.length
 * differenceWith(sameLength)(
 *   new Set([[1, 2]])
 * )(
 *   new Set([[1], [2, 3], [4, 5, 6]])
 * )
 * // Set { [1], [4, 5, 6] }
 * 
 * // Date comparison (same day)
 * const sameDay = (a: Date, b: Date) => 
 *   a.toDateString() === b.toDateString()
 * differenceWith(sameDay)(
 *   new Set([new Date("2024-01-01")])
 * )(
 *   new Set([
 *     new Date("2024-01-01T10:00:00"),
 *     new Date("2024-01-02"),
 *     new Date("2024-01-03")
 *   ])
 * )
 * // Set { Date("2024-01-02"), Date("2024-01-03") }
 * 
 * // Partial application for reusable filters
 * const removeById = differenceWith((a: { id: number }, b: { id: number }) => a.id === b.id)
 * const blacklist = new Set([{ id: 2 }, { id: 4 }])
 * const filterBlacklisted = removeById(blacklist)
 * 
 * filterBlacklisted(new Set([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]))
 * // Set { { id: 1 }, { id: 3 }, { id: 5 } }
 * 
 * // Empty sets
 * differenceWith((a, b) => a === b)(new Set())(new Set([1, 2, 3]))
 * // Set { 1, 2, 3 }
 * 
 * // Handle null/undefined gracefully
 * differenceWith((a, b) => a === b)(new Set([1]))(null)       // Set { }
 * differenceWith((a, b) => a === b)(null)(new Set([1, 2]))    // Set { 1, 2 }
 * 
 * // Complex nested structure comparison
 * const deepEqual = (a: any, b: any): boolean => 
 *   JSON.stringify(a) === JSON.stringify(b)
 * differenceWith(deepEqual)(
 *   new Set([{ x: { y: 1 } }])
 * )(
 *   new Set([{ x: { y: 1 } }, { x: { y: 2 } }])
 * )
 * // Set { { x: { y: 2 } } }
 * ```
 * @property Immutable - returns new Set, doesn't modify originals
 * @property Flexible - allows custom equality logic
 * @property Higher-order - returns curried function for reusability
 */
const differenceWith = <T>(
	comparator: (a: T, b: T) => boolean
) => (
	subtrahend: Set<T> | null | undefined
) => (
	minuend: Set<T> | null | undefined
): Set<T> => {
	if (minuend == null || !(minuend instanceof Set)) {
		return new Set()
	}
	
	if (subtrahend == null || !(subtrahend instanceof Set) || subtrahend.size === 0) {
		return new Set(minuend)
	}
	
	// Build result with elements not matching any in subtrahend
	const result = new Set<T>()
	
	for (const element of minuend) {
		let shouldInclude = true
		
		for (const excludeElement of subtrahend) {
			if (comparator(element, excludeElement)) {
				shouldInclude = false
				break
			}
		}
		
		if (shouldInclude) {
			result.add(element)
		}
	}
	
	return result
}

export default differenceWith