/**
 * Returns elements in the first array that are not in the second array using a comparator
 * 
 * Like difference but uses a custom comparator function to determine equality
 * between elements. Returns a new array containing only the elements from the
 * first array for which no equivalent element exists in the second array
 * according to the comparator. Useful when comparing complex objects or when
 * you need custom equality logic.
 * 
 * @curried (comparator) => (subtrahend) => (minuend) => result
 * @param comparator - Function to determine if two elements are equal
 * @param subtrahend - Array of elements to exclude
 * @param minuend - Array to remove elements from
 * @returns New array with elements from minuend not equivalent to any in subtrahend
 * @example
 * ```typescript
 * // Basic difference with custom comparator
 * const caseInsensitive = (a: string, b: string) => a.toLowerCase() === b.toLowerCase()
 * differenceWith(caseInsensitive)(["B", "C"])(["a", "B", "c", "D"])
 * // ["a", "D"]
 * 
 * // Object comparison by property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const users1 = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" }
 * ]
 * const users2 = [
 *   { id: 2, name: "Bobby" },
 *   { id: 4, name: "David" }
 * ]
 * differenceWith(byId)(users2)(users1)
 * // [{ id: 1, name: "Alice" }, { id: 3, name: "Charlie" }]
 * 
 * // Deep object comparison
 * const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)
 * differenceWith(deepEqual)([{ x: 2 }, { y: 3 }])([{ x: 1 }, { x: 2 }, { y: 3 }, { z: 4 }])
 * // [{ x: 1 }, { z: 4 }]
 * 
 * // Number comparison with tolerance
 * const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.01
 * differenceWith(approxEqual)([1.001, 2.002])([1.0, 1.5, 2.0, 3.0])
 * // [1.5, 3.0]
 * 
 * // String length comparison
 * const sameLength = (a: string, b: string) => a.length === b.length
 * differenceWith(sameLength)(["xx", "yyy"])(["a", "bb", "ccc", "dddd"])
 * // ["a", "dddd"]
 * 
 * // Date comparison (same day)
 * const sameDay = (a: Date, b: Date) => 
 *   a.toDateString() === b.toDateString()
 * const dates1 = [
 *   new Date("2024-01-01"),
 *   new Date("2024-01-02"),
 *   new Date("2024-01-03")
 * ]
 * const dates2 = [
 *   new Date("2024-01-02T10:00:00"),
 *   new Date("2024-01-04")
 * ]
 * differenceWith(sameDay)(dates2)(dates1)
 * // [Date("2024-01-01"), Date("2024-01-03")]
 * 
 * // Array comparison by first element
 * const firstEqual = (a: Array<any>, b: Array<any>) => a[0] === b[0]
 * differenceWith(firstEqual)([[2, "x"], [3, "y"]])([[1, "a"], [2, "b"], [3, "c"], [4, "d"]])
 * // [[1, "a"], [4, "d"]]
 * 
 * // Custom business logic
 * type Product = { sku: string; version: number }
 * const sameProduct = (a: Product, b: Product) => 
 *   a.sku === b.sku && a.version === b.version
 * const inventory = [
 *   { sku: "ABC", version: 1 },
 *   { sku: "DEF", version: 2 },
 *   { sku: "GHI", version: 1 }
 * ]
 * const sold = [
 *   { sku: "ABC", version: 1 },
 *   { sku: "DEF", version: 1 } // Different version
 * ]
 * differenceWith(sameProduct)(sold)(inventory)
 * // [{ sku: "DEF", version: 2 }, { sku: "GHI", version: 1 }]
 * 
 * // Partial string matching
 * const contains = (a: string, b: string) => a.includes(b) || b.includes(a)
 * differenceWith(contains)(["test", "demo"])(["testing", "example", "demonstration", "sample"])
 * // ["example", "sample"]
 * 
 * // Empty second array (removes nothing)
 * differenceWith((a, b) => a === b)([])([1, 2, 3])
 * // [1, 2, 3]
 * 
 * // Empty first array
 * differenceWith((a, b) => a === b)([1, 2])([])
 * // []
 * 
 * // All elements match (removes all)
 * const alwaysTrue = () => true
 * differenceWith(alwaysTrue)([1, 2, 3])([4, 5, 6])
 * // []
 * 
 * // No elements match (keeps all)
 * const alwaysFalse = () => false
 * differenceWith(alwaysFalse)([1, 2, 3])([4, 5, 6])
 * // [4, 5, 6]
 * 
 * // Range comparison
 * const inRange = (a: number, b: { min: number; max: number }) => 
 *   a >= b.min && a <= b.max
 * const ranges = [{ min: 10, max: 20 }, { min: 30, max: 40 }]
 * differenceWith((a, b) => inRange(a, b))([15, 25, 35, 45] as any)(ranges as any)
 * // [25, 45]
 * 
 * // Regex pattern matching
 * const patterns = [/^test/, /end$/]
 * const matchesPattern = (str: string, pattern: RegExp) => pattern.test(str)
 * differenceWith(matchesPattern)(patterns as any)(["test123", "start", "backend", "middle"] as any)
 * // ["start", "middle"]
 * 
 * // Partial application for reusable filters
 * const removeByProperty = <T>(prop: keyof T) => 
 *   differenceWith((a: T, b: T) => a[prop] === b[prop])
 * 
 * const removeByName = removeByProperty<{ name: string }>("name")
 * removeByName([{ name: "Bob" }])([{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }])
 * // [{ name: "Alice" }, { name: "Charlie" }]
 * 
 * // Handle null/undefined gracefully
 * differenceWith((a, b) => a === b)([1, 2])(null)       // []
 * differenceWith((a, b) => a === b)([1, 2])(undefined)  // []
 * differenceWith((a, b) => a === b)(null)([1, 2, 3])    // [1, 2, 3]
 * differenceWith((a, b) => a === b)(undefined)([1, 2])  // [1, 2]
 * 
 * // Complex nested comparison
 * const users = [
 *   { id: 1, profile: { age: 25, city: "NYC" } },
 *   { id: 2, profile: { age: 30, city: "LA" } },
 *   { id: 3, profile: { age: 25, city: "Chicago" } }
 * ]
 * const excludeAges = [{ profile: { age: 25 } }, { profile: { age: 35 } }]
 * const byAge = (a: any, b: any) => a.profile?.age === b.profile?.age
 * differenceWith(byAge)(excludeAges)(users)
 * // [{ id: 2, profile: { age: 30, city: "LA" } }]
 * 
 * // Set operations with custom equality
 * const modEqual = (a: number, b: number) => a % 10 === b % 10
 * differenceWith(modEqual)([13, 24])([1, 12, 23, 34, 45])
 * // [12, 34, 45]
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Custom-equality - uses provided comparator for matching
 * @property Order-preserving - maintains original array order
 */
const differenceWith = <T, U>(
	comparator: (a: T, b: U) => boolean
) => (
	subtrahend: ReadonlyArray<U> | null | undefined
) => (
	minuend: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (minuend == null || !Array.isArray(minuend)) {
		return []
	}
	
	if (subtrahend == null || !Array.isArray(subtrahend) || subtrahend.length === 0) {
		return [...minuend]
	}
	
	return minuend.filter(element => 
		!subtrahend.some(excludeElement => 
			comparator(element, excludeElement)
		)
	)
}

export default differenceWith