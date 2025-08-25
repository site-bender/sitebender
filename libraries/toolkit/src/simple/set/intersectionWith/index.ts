/**
 * Returns elements present in both Sets using a custom equality function
 *
 * Like intersection, but allows you to specify how elements should be compared.
 * This is useful when you need to compare objects by a specific property or
 * use custom logic for equality. The comparator receives elements from both
 * sets and should return true if they are considered equal.
 *
 * @curried (comparator) => (set2) => (set1) => result
 * @param comparator - Function to determine if elements are equal
 * @param set2 - Second Set to intersect with
 * @param set1 - First Set to intersect
 * @returns New Set with elements present in both Sets (per comparator)
 * @example
 * ```typescript
 * // Compare objects by id property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * intersectionWith(byId)(
 *   new Set([{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }])
 * )(
 *   new Set([{ id: 1, name: "Alice" }, { id: 2, name: "Robert" }, { id: 3, name: "Chuck" }])
 * )
 * // Set { { id: 2, name: "Robert" }, { id: 3, name: "Chuck" } }
 * // Note: Returns elements from set1 that match
 *
 * // Case-insensitive string comparison
 * const caseInsensitive = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * intersectionWith(caseInsensitive)(
 *   new Set(["HELLO", "WORLD"])
 * )(
 *   new Set(["hello", "foo", "World", "bar"])
 * )
 * // Set { "hello", "World" }
 *
 * // Compare by multiple properties
 * interface Point { x: number; y: number }
 * const samePoint = (a: Point, b: Point) => a.x === b.x && a.y === b.y
 * intersectionWith(samePoint)(
 *   new Set([{ x: 1, y: 1 }, { x: 2, y: 2 }])
 * )(
 *   new Set([{ x: 1, y: 1 }, { x: 2, y: 3 }, { x: 3, y: 3 }])
 * )
 * // Set { { x: 1, y: 1 } }
 *
 * // Numeric tolerance comparison
 * const withinTolerance = (a: number, b: number) => Math.abs(a - b) < 0.01
 * intersectionWith(withinTolerance)(
 *   new Set([1.0, 2.0, 3.0])
 * )(
 *   new Set([0.999, 1.5, 2.001, 3.5])
 * )
 * // Set { 0.999, 2.001 }
 *
 * // Compare arrays by length
 * const sameLength = (a: Array<any>, b: Array<any>) => a.length === b.length
 * intersectionWith(sameLength)(
 *   new Set([[1, 2], [1, 2, 3]])
 * )(
 *   new Set([[10], [20, 30], [40, 50, 60]])
 * )
 * // Set { [20, 30] }
 *
 * // Date comparison (same day)
 * const sameDay = (a: Date, b: Date) =>
 *   a.toDateString() === b.toDateString()
 * intersectionWith(sameDay)(
 *   new Set([new Date("2024-01-01"), new Date("2024-01-02")])
 * )(
 *   new Set([
 *     new Date("2024-01-01T10:00:00"),
 *     new Date("2024-01-01T15:00:00"),
 *     new Date("2024-01-03")
 *   ])
 * )
 * // Set { Date("2024-01-01T10:00:00"), Date("2024-01-01T15:00:00") }
 *
 * // Partial application for reusable matchers
 * const matchById = intersectionWith(
 *   (a: { id: number }, b: { id: number }) => a.id === b.id
 * )
 * const validUsers = new Set([{ id: 1 }, { id: 2 }, { id: 3 }])
 * const findValidUsers = matchById(validUsers)
 *
 * findValidUsers(new Set([{ id: 2, name: "Bob" }, { id: 4, name: "Dave" }]))
 * // Set { { id: 2, name: "Bob" } }
 *
 * // Complex nested structure comparison
 * const deepEqual = (a: any, b: any): boolean =>
 *   JSON.stringify(a) === JSON.stringify(b)
 * intersectionWith(deepEqual)(
 *   new Set([{ x: { y: 1 } }, { x: { y: 2 } }])
 * )(
 *   new Set([{ x: { y: 1 } }, { x: { y: 3 } }])
 * )
 * // Set { { x: { y: 1 } } }
 *
 * // String pattern matching
 * const samePrefix = (a: string, b: string) =>
 *   a.substring(0, 3) === b.substring(0, 3)
 * intersectionWith(samePrefix)(
 *   new Set(["abc123", "def456"])
 * )(
 *   new Set(["abc789", "ghi012", "def789"])
 * )
 * // Set { "abc789", "def789" }
 *
 * // Empty Sets
 * intersectionWith((a, b) => a === b)(new Set())(new Set([1, 2, 3]))
 * // Set { }
 *
 * // Handle null/undefined gracefully
 * intersectionWith((a, b) => a === b)(new Set([1]))(null)       // Set { }
 * intersectionWith((a, b) => a === b)(null)(new Set([1, 2]))    // Set { }
 * ```
 * @property Immutable - returns new Set, doesn't modify originals
 * @property Flexible - allows custom equality logic
 * @property Order-preserving - returns elements from set1 that match
 */
const intersectionWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	set2: Set<T> | null | undefined,
) =>
(
	set1: Set<T> | null | undefined,
): Set<T> => {
	if (set1 == null || !(set1 instanceof Set) || set1.size === 0) {
		return new Set()
	}

	if (set2 == null || !(set2 instanceof Set) || set2.size === 0) {
		return new Set()
	}

	const result = new Set<T>()

	for (const element1 of set1) {
		for (const element2 of set2) {
			if (comparator(element1, element2)) {
				result.add(element1)
				break // Found a match, no need to check further
			}
		}
	}

	return result
}

export default intersectionWith
