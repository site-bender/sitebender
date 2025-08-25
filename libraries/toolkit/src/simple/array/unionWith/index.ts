/**
 * Like union but uses a comparator function
 *
 * Combines two arrays and returns all unique elements using a custom
 * comparator function to determine equality. Removes duplicates within
 * and across arrays based on the comparator. Useful when you need custom
 * equality logic for objects, deep comparison, or property-based matching.
 *
 * @curried (comparator) => (array1) => (array2) => result
 * @param comparator - Function to compare elements (a, b) => boolean
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Array containing all unique elements from both arrays
 * @example
 * ```typescript
 * // Basic usage with custom equality
 * const eqById = (a: any, b: any) => a.id === b.id
 * const arr1 = [{ id: 1 }, { id: 2 }]
 * const arr2 = [{ id: 2 }, { id: 3 }]
 * unionWith(eqById)(arr1)(arr2)
 * // [{ id: 1 }, { id: 2 }, { id: 3 }]
 *
 * // Case-insensitive string comparison
 * const eqIgnoreCase = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * unionWith(eqIgnoreCase)(["Hello", "World"])(["WORLD", "foo"])
 * // ["Hello", "World", "foo"]
 *
 * // Compare by property
 * const eqByName = (a: any, b: any) => a.name === b.name
 * const team1 = [
 *   { name: "Alice", role: "dev" },
 *   { name: "Bob", role: "manager" }
 * ]
 * const team2 = [
 *   { name: "Bob", role: "lead" },
 *   { name: "Charlie", role: "dev" }
 * ]
 * unionWith(eqByName)(team1)(team2)
 * // [
 * //   { name: "Alice", role: "dev" },
 * //   { name: "Bob", role: "manager" },
 * //   { name: "Charlie", role: "dev" }
 * // ]
 *
 * // Deep object comparison
 * const deepEqual = (a: any, b: any) =>
 *   JSON.stringify(a) === JSON.stringify(b)
 * const configs1 = [
 *   { settings: { theme: "dark" } },
 *   { settings: { theme: "light" } }
 * ]
 * const configs2 = [
 *   { settings: { theme: "light" } },
 *   { settings: { theme: "auto" } }
 * ]
 * unionWith(deepEqual)(configs1)(configs2)
 * // [
 * //   { settings: { theme: "dark" } },
 * //   { settings: { theme: "light" } },
 * //   { settings: { theme: "auto" } }
 * // ]
 *
 * // Numeric tolerance comparison
 * const almostEqual = (a: number, b: number) =>
 *   Math.abs(a - b) < 0.01
 * unionWith(almostEqual)([1.0, 2.0, 3.0])([2.001, 3.0, 4.0])
 * // [1.0, 2.0, 3.0, 4.0] (2.0 and 2.001 considered equal)
 *
 * // Date comparison (same day)
 * const sameDay = (a: Date, b: Date) =>
 *   a.toDateString() === b.toDateString()
 * const dates1 = [
 *   new Date("2024-01-01T10:00"),
 *   new Date("2024-01-02T15:00")
 * ]
 * const dates2 = [
 *   new Date("2024-01-02T08:00"),
 *   new Date("2024-01-03T12:00")
 * ]
 * unionWith(sameDay)(dates1)(dates2)
 * // [Date("2024-01-01"), Date("2024-01-02"), Date("2024-01-03")]
 *
 * // Coordinate comparison with tolerance
 * const nearbyPoints = (p1: any, p2: any) =>
 *   Math.abs(p1.x - p2.x) < 5 && Math.abs(p1.y - p2.y) < 5
 * const points1 = [
 *   { x: 10, y: 20 },
 *   { x: 30, y: 40 }
 * ]
 * const points2 = [
 *   { x: 11, y: 21 },
 *   { x: 50, y: 60 }
 * ]
 * unionWith(nearbyPoints)(points1)(points2)
 * // [
 * //   { x: 10, y: 20 },
 * //   { x: 30, y: 40 },
 * //   { x: 50, y: 60 }
 * // ]
 *
 * // Version comparison
 * const sameMinorVersion = (v1: string, v2: string) => {
 *   const [maj1, min1] = v1.split(".")
 *   const [maj2, min2] = v2.split(".")
 *   return maj1 === maj2 && min1 === min2
 * }
 * unionWith(sameMinorVersion)(
 *   ["1.0.0", "1.1.0", "2.0.0"]
 * )(
 *   ["1.0.5", "2.0.1", "2.1.0"]
 * )
 * // ["1.0.0", "1.1.0", "2.0.0", "2.1.0"]
 *
 * // User deduplication
 * const sameUser = (a: any, b: any) => a.userId === b.userId
 * const list1 = [
 *   { userId: 1, status: "online" },
 *   { userId: 2, status: "offline" }
 * ]
 * const list2 = [
 *   { userId: 2, status: "online" },
 *   { userId: 3, status: "away" }
 * ]
 * unionWith(sameUser)(list1)(list2)
 * // [
 * //   { userId: 1, status: "online" },
 * //   { userId: 2, status: "offline" },
 * //   { userId: 3, status: "away" }
 * // ]
 *
 * // Product SKU merging
 * const sameSKU = (a: any, b: any) => a.sku === b.sku
 * const inventory1 = [
 *   { sku: "ABC123", qty: 10, warehouse: "A" },
 *   { sku: "DEF456", qty: 5, warehouse: "A" }
 * ]
 * const inventory2 = [
 *   { sku: "DEF456", qty: 8, warehouse: "B" },
 *   { sku: "GHI789", qty: 12, warehouse: "B" }
 * ]
 * unionWith(sameSKU)(inventory1)(inventory2)
 * // [
 * //   { sku: "ABC123", qty: 10, warehouse: "A" },
 * //   { sku: "DEF456", qty: 5, warehouse: "A" },
 * //   { sku: "GHI789", qty: 12, warehouse: "B" }
 * // ]
 *
 * // File path comparison (ignore extension)
 * const sameFile = (a: string, b: string) => {
 *   const nameA = a.substring(0, a.lastIndexOf("."))
 *   const nameB = b.substring(0, b.lastIndexOf("."))
 *   return nameA === nameB
 * }
 * unionWith(sameFile)(
 *   ["doc1.txt", "doc2.pdf", "doc3.docx"]
 * )(
 *   ["doc2.txt", "doc4.docx", "doc3.pdf"]
 * )
 * // ["doc1.txt", "doc2.pdf", "doc3.docx", "doc4.docx"]
 *
 * // Empty arrays
 * const eq = (a: any, b: any) => a === b
 * unionWith(eq)([])([1, 2, 3])
 * // [1, 2, 3]
 *
 * unionWith(eq)([1, 2, 3])([])
 * // [1, 2, 3]
 *
 * unionWith(eq)([])([])
 * // []
 *
 * // Handle null/undefined
 * unionWith(eq)(null)([1, 2])       // [1, 2]
 * unionWith(eq)(undefined)([1, 2])  // [1, 2]
 * unionWith(eq)([1, 2])(null)       // [1, 2]
 * unionWith(eq)([1, 2])(undefined)  // [1, 2]
 *
 * // URL comparison (ignore protocol)
 * const sameUrl = (a: string, b: string) => {
 *   const stripProtocol = (url: string) =>
 *     url.replace(/^https?:\/\//, "")
 *   return stripProtocol(a) === stripProtocol(b)
 * }
 * unionWith(sameUrl)(
 *   ["http://example.com", "https://google.com"]
 * )(
 *   ["https://example.com", "http://yahoo.com"]
 * )
 * // ["http://example.com", "https://google.com", "http://yahoo.com"]
 *
 * // Task deduplication
 * const sameTask = (a: any, b: any) => a.taskId === b.taskId
 * const queue1 = [
 *   { taskId: "T1", priority: "high" },
 *   { taskId: "T2", priority: "medium" }
 * ]
 * const queue2 = [
 *   { taskId: "T2", priority: "high" },
 *   { taskId: "T3", priority: "low" }
 * ]
 * unionWith(sameTask)(queue1)(queue2)
 * // [
 * //   { taskId: "T1", priority: "high" },
 * //   { taskId: "T2", priority: "medium" },
 * //   { taskId: "T3", priority: "low" }
 * // ]
 *
 * // Array length comparison
 * const sameLength = (a: any[], b: any[]) => a.length === b.length
 * unionWith(sameLength)(
 *   [[1, 2], [1, 2, 3], [1]]
 * )(
 *   [[4, 5], [6], [7, 8, 9]]
 * )
 * // [[1, 2], [1, 2, 3], [1]]
 *
 * // Partial match comparison
 * const partialMatch = (a: any, b: any) =>
 *   Object.keys(a).some(key => a[key] === b[key])
 * const items1 = [
 *   { color: "red", size: "L" },
 *   { color: "blue", size: "M" }
 * ]
 * const items2 = [
 *   { color: "blue", size: "L" },
 *   { color: "green", size: "S" }
 * ]
 * unionWith(partialMatch)(items1)(items2)
 * // [
 * //   { color: "red", size: "L" },
 * //   { color: "blue", size: "M" },
 * //   { color: "green", size: "S" }
 * // ]
 *
 * // Range overlap detection
 * const overlaps = (a: any, b: any) =>
 *   !(a.end < b.start || b.end < a.start)
 * const ranges1 = [
 *   { start: 0, end: 10 },
 *   { start: 20, end: 30 }
 * ]
 * const ranges2 = [
 *   { start: 5, end: 15 },
 *   { start: 35, end: 45 }
 * ]
 * unionWith(overlaps)(ranges1)(ranges2)
 * // [
 * //   { start: 0, end: 10 },
 * //   { start: 20, end: 30 },
 * //   { start: 35, end: 45 }
 * // ]
 *
 * // Custom class comparison
 * class Person {
 *   constructor(public name: string, public age: number) {}
 * }
 * const samePerson = (a: Person, b: Person) =>
 *   a.name === b.name && a.age === b.age
 * const group1 = [
 *   new Person("Alice", 30),
 *   new Person("Bob", 25)
 * ]
 * const group2 = [
 *   new Person("Bob", 25),
 *   new Person("Charlie", 35)
 * ]
 * unionWith(samePerson)(group1)(group2)
 * // [Person("Alice", 30), Person("Bob", 25), Person("Charlie", 35)]
 *
 * // Partial application for reusable unions
 * const unionById = unionWith(
 *   (a: any, b: any) => a.id === b.id
 * )
 * const data1 = [{ id: 1, val: "a" }, { id: 2, val: "b" }]
 * const data2 = [{ id: 2, val: "c" }, { id: 3, val: "d" }]
 * unionById(data1)(data2)
 * // [{ id: 1, val: "a" }, { id: 2, val: "b" }, { id: 3, val: "d" }]
 *
 * // Tag comparison (ignore order)
 * const sameTags = (a: any, b: any) => {
 *   const sortedA = [...a.tags].sort().join(",")
 *   const sortedB = [...b.tags].sort().join(",")
 *   return sortedA === sortedB
 * }
 * const posts1 = [
 *   { id: 1, tags: ["js", "react"] },
 *   { id: 2, tags: ["python", "ml"] }
 * ]
 * const posts2 = [
 *   { id: 3, tags: ["react", "js"] },
 *   { id: 4, tags: ["rust", "wasm"] }
 * ]
 * unionWith(sameTags)(posts1)(posts2)
 * // [
 * //   { id: 1, tags: ["js", "react"] },
 * //   { id: 2, tags: ["python", "ml"] },
 * //   { id: 4, tags: ["rust", "wasm"] }
 * // ]
 *
 * // Threshold-based comparison
 * const withinThreshold = (threshold: number) =>
 *   (a: number, b: number) => Math.abs(a - b) <= threshold
 * unionWith(withinThreshold(10))(
 *   [100, 200, 300]
 * )(
 *   [195, 305, 400]
 * )
 * // [100, 200, 300, 400] (200≈195, 300≈305 within threshold)
 *
 * // Email normalization
 * const sameEmail = (a: string, b: string) =>
 *   a.toLowerCase().trim() === b.toLowerCase().trim()
 * unionWith(sameEmail)(
 *   ["Alice@example.com", "bob@test.com"]
 * )(
 *   [" alice@example.com ", "charlie@test.com"]
 * )
 * // ["Alice@example.com", "bob@test.com", "charlie@test.com"]
 *
 * // Set semantics with duplicates
 * const arr1 = [1, 1, 2, 2]
 * const arr2 = [2, 2, 3, 3]
 * unionWith((a, b) => a === b)(arr1)(arr2)
 * // [1, 2, 3] (duplicates removed)
 *
 * // Complex filtering
 * const isCompatible = (a: any, b: any) => {
 *   return a.type === b.type &&
 *          a.version[0] === b.version[0]  // Same major version
 * }
 * const libs1 = [
 *   { name: "libA", type: "util", version: "1.2.3" },
 *   { name: "libB", type: "ui", version: "2.0.0" }
 * ]
 * const libs2 = [
 *   { name: "libC", type: "util", version: "1.5.0" },
 *   { name: "libD", type: "data", version: "3.0.0" }
 * ]
 * unionWith(isCompatible)(libs1)(libs2)
 * // All libraries (libA compatible with libC, both kept)
 * ```
 * @property Immutable - doesn't modify input arrays
 * @property Custom-equality - Uses provided comparator for matching
 * @property Order-preserving - First array elements, then unique from second
 */
const unionWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	// Handle null/undefined cases
	if (array1 == null || !Array.isArray(array1)) {
		if (array2 == null || !Array.isArray(array2)) {
			return []
		}
		// Remove duplicates from array2 using comparator
		const result: Array<T> = []
		for (const item of array2) {
			if (!result.some((r) => comparator(r, item))) {
				result.push(item)
			}
		}
		return result
	}

	if (array2 == null || !Array.isArray(array2)) {
		// Remove duplicates from array1 using comparator
		const result: Array<T> = []
		for (const item of array1) {
			if (!result.some((r) => comparator(r, item))) {
				result.push(item)
			}
		}
		return result
	}

	// Start with unique elements from array1
	const result: Array<T> = []
	for (const item1 of array1) {
		if (!result.some((r) => comparator(r, item1))) {
			result.push(item1)
		}
	}

	// Add unique elements from array2 that aren't already in result
	for (const item2 of array2) {
		if (!result.some((r) => comparator(r, item2))) {
			result.push(item2)
		}
	}

	return result
}

export default unionWith
