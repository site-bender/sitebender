/**
 * Returns elements that exist in both arrays using a comparator function
 * 
 * Like intersection but uses a custom comparator function to determine equality
 * between elements from the two arrays. Returns a new array containing elements
 * from the first array for which an equivalent element exists in the second array
 * according to the comparator. Useful for complex objects or custom equality logic.
 * 
 * @curried (comparator) => (array2) => (array1) => result
 * @param comparator - Function to determine if elements are equal
 * @param array2 - Second array to intersect with
 * @param array1 - First array to intersect from
 * @returns New array with elements from array1 that have equivalents in array2
 * @example
 * ```typescript
 * // Case-insensitive intersection
 * const caseInsensitive = (a: string, b: string) => 
 *   a.toLowerCase() === b.toLowerCase()
 * intersectionWith(caseInsensitive)(["B", "C", "D"])(["a", "b", "c", "e"])
 * // ["b", "c"]
 * 
 * // Object intersection by property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const users1 = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" }
 * ]
 * const users2 = [
 *   { id: 2, name: "Bobby" },
 *   { id: 3, name: "Charles" },
 *   { id: 4, name: "David" }
 * ]
 * intersectionWith(byId)(users2)(users1)
 * // [{ id: 2, name: "Bob" }, { id: 3, name: "Charlie" }]
 * 
 * // Deep equality intersection
 * const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)
 * intersectionWith(deepEqual)([{ x: 2 }, { y: 3 }])([{ x: 1 }, { x: 2 }, { y: 3 }])
 * // [{ x: 2 }, { y: 3 }]
 * 
 * // Number intersection with tolerance
 * const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
 * intersectionWith(approxEqual)([1.0, 2.0, 3.0])([1.05, 2.95, 4.0])
 * // [1.05, 2.95]
 * 
 * // String length intersection
 * const sameLength = (a: string, b: string) => a.length === b.length
 * intersectionWith(sameLength)(["xx", "yyy", "zzzz"])(["a", "bb", "ccc", "dddd"])
 * // ["bb", "ccc", "dddd"]
 * 
 * // Date intersection (same day)
 * const sameDay = (a: Date, b: Date) => 
 *   a.toDateString() === b.toDateString()
 * const dates1 = [
 *   new Date("2024-01-01T09:00"),
 *   new Date("2024-01-02T10:00"),
 *   new Date("2024-01-03T11:00")
 * ]
 * const dates2 = [
 *   new Date("2024-01-02T15:00"),
 *   new Date("2024-01-04T16:00")
 * ]
 * intersectionWith(sameDay)(dates2)(dates1)
 * // [Date("2024-01-02T10:00")]
 * 
 * // Array intersection by first element
 * const firstEqual = (a: Array<any>, b: Array<any>) => a[0] === b[0]
 * intersectionWith(firstEqual)([[2, "x"], [3, "y"]])([[1, "a"], [2, "b"], [3, "c"]])
 * // [[2, "b"], [3, "c"]]
 * 
 * // Custom business logic
 * type Product = { sku: string; category: string }
 * const sameCategory = (a: Product, b: Product) => a.category === b.category
 * const inventory = [
 *   { sku: "ABC", category: "electronics" },
 *   { sku: "DEF", category: "clothing" },
 *   { sku: "GHI", category: "food" }
 * ]
 * const wishlist = [
 *   { sku: "XYZ", category: "electronics" },
 *   { sku: "UVW", category: "toys" }
 * ]
 * intersectionWith(sameCategory)(wishlist)(inventory)
 * // [{ sku: "ABC", category: "electronics" }]
 * 
 * // Partial string matching
 * const contains = (a: string, b: string) => a.includes(b) || b.includes(a)
 * intersectionWith(contains)(["test", "demo"])(["testing", "example", "demonstration"])
 * // ["testing", "demonstration"]
 * 
 * // Range-based intersection
 * const inRange = (a: number, b: { min: number; max: number }) => 
 *   a >= b.min && a <= b.max
 * const ranges = [{ min: 10, max: 20 }, { min: 30, max: 40 }]
 * intersectionWith((a, b) => inRange(a, b))([15, 25, 35, 45] as any)(ranges as any)
 * // [{ min: 10, max: 20 }, { min: 30, max: 40 }]
 * 
 * // Empty intersection
 * intersectionWith((a, b) => a === b)([4, 5, 6])([1, 2, 3])
 * // []
 * 
 * // Complete intersection
 * const alwaysTrue = () => true
 * intersectionWith(alwaysTrue)([1, 2])([3, 4, 5])
 * // [3, 4, 5]
 * 
 * // No match
 * const alwaysFalse = () => false
 * intersectionWith(alwaysFalse)([1, 2])([3, 4, 5])
 * // []
 * 
 * // One empty array
 * intersectionWith((a, b) => a === b)([])([1, 2, 3])
 * // []
 * intersectionWith((a, b) => a === b)([1, 2])([])
 * // []
 * 
 * // Both empty
 * intersectionWith((a, b) => a === b)([])([])
 * // []
 * 
 * // Modulo equality
 * const modEqual = (a: number, b: number) => a % 10 === b % 10
 * intersectionWith(modEqual)([13, 24, 35])([3, 14, 25, 44])
 * // [13, 24]
 * 
 * // Type compatibility check
 * const compatibleTypes = (a: any, b: any) => {
 *   const typeA = typeof a
 *   const typeB = typeof b
 *   return typeA === typeB || 
 *          (typeA === "number" && typeB === "string") ||
 *          (typeA === "string" && typeB === "number")
 * }
 * intersectionWith(compatibleTypes)([1, "2", true])([3, "hello", false])
 * // [1, "2", true]
 * 
 * // Version compatibility
 * type Version = { major: number; minor: number }
 * const compatibleVersion = (a: Version, b: Version) => 
 *   a.major === b.major && a.minor >= b.minor
 * const installed = [
 *   { major: 1, minor: 5 },
 *   { major: 2, minor: 0 },
 *   { major: 2, minor: 3 }
 * ]
 * const required = [
 *   { major: 1, minor: 0 },
 *   { major: 2, minor: 2 }
 * ]
 * intersectionWith(compatibleVersion)(required)(installed)
 * // [{ major: 1, minor: 5 }, { major: 2, minor: 3 }]
 * 
 * // Partial application for reusable intersections
 * const intersectById = intersectionWith((a: any, b: any) => a.id === b.id)
 * const list1 = [{ id: 1 }, { id: 2 }, { id: 3 }]
 * const list2 = [{ id: 2 }, { id: 3 }, { id: 4 }]
 * intersectById(list2)(list1)
 * // [{ id: 2 }, { id: 3 }]
 * 
 * // Handle null/undefined gracefully
 * intersectionWith((a, b) => a === b)([1, 2])(null)       // []
 * intersectionWith((a, b) => a === b)([1, 2])(undefined)  // []
 * intersectionWith((a, b) => a === b)(null)([1, 2])       // []
 * intersectionWith((a, b) => a === b)(undefined)([1, 2])  // []
 * 
 * // Complex nested comparison
 * const users = [
 *   { id: 1, profile: { city: "NYC", age: 25 } },
 *   { id: 2, profile: { city: "LA", age: 30 } },
 *   { id: 3, profile: { city: "Chicago", age: 25 } }
 * ]
 * const filters = [
 *   { profile: { age: 25 } },
 *   { profile: { age: 35 } }
 * ]
 * const byAge = (a: any, b: any) => a.profile?.age === b.profile?.age
 * intersectionWith(byAge)(filters)(users)
 * // [
 * //   { id: 1, profile: { city: "NYC", age: 25 } },
 * //   { id: 3, profile: { city: "Chicago", age: 25 } }
 * // ]
 * 
 * // Pattern matching
 * const patterns = [/^test/, /end$/]
 * const matchesPattern = (str: string, pattern: RegExp) => pattern.test(str)
 * intersectionWith(matchesPattern)(patterns as any)(["test123", "frontend", "testend", "middle"] as any)
 * // ["test123", "frontend", "testend"]
 * 
 * // Time overlap detection
 * type TimeSlot = { start: number; end: number }
 * const overlaps = (a: TimeSlot, b: TimeSlot) => 
 *   a.start < b.end && b.start < a.end
 * const schedule1 = [
 *   { start: 9, end: 11 },
 *   { start: 13, end: 15 },
 *   { start: 16, end: 18 }
 * ]
 * const schedule2 = [
 *   { start: 10, end: 12 },
 *   { start: 14, end: 16 }
 * ]
 * intersectionWith(overlaps)(schedule2)(schedule1)
 * // [{ start: 9, end: 11 }, { start: 13, end: 15 }]
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Custom-equality - uses provided comparator for matching
 * @property Order-preserving - maintains first array's element order
 */
const intersectionWith = <T, U>(
	comparator: (a: T, b: U) => boolean
) => (
	array2: ReadonlyArray<U> | null | undefined
) => (
	array1: ReadonlyArray<T> | null | undefined
): Array<T> => {
	if (array1 == null || !Array.isArray(array1) || array1.length === 0) {
		return []
	}
	
	if (array2 == null || !Array.isArray(array2) || array2.length === 0) {
		return []
	}
	
	return array1.filter(element1 => 
		array2.some(element2 => 
			comparator(element1, element2)
		)
	)
}

export default intersectionWith