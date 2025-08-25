/**
 * Removes duplicate elements from an array using a custom equality function
 *
 * Like nub but uses a custom equality function to determine which elements
 * are considered duplicates. Returns a new array with duplicates removed,
 * keeping only the first occurrence of each unique element according to
 * the equality function. Order is preserved based on first occurrence.
 * This is the customizable version of nub/unique.
 *
 * @curried (equalityFn) => (array) => result
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
 *   { id: 3, name: "Charlie" },
 *   { id: 2, name: "Bobby" }
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
 *   { x: 3, y: 4 },
 *   { x: 2, y: 3 }
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
 *   new Date("2024-01-03T11:00"),
 *   new Date("2024-01-02T16:00")
 * ]
 * nubBy(sameDay)(dates)
 * // [
 * //   Date("2024-01-01T09:00"),
 * //   Date("2024-01-02T10:00"),
 * //   Date("2024-01-03T11:00")
 * // ]
 *
 * // String prefix deduplication
 * const samePrefix = (a: string, b: string) =>
 *   a.slice(0, 3) === b.slice(0, 3)
 * nubBy(samePrefix)(["apple", "application", "banana", "bandana", "apricot"])
 * // ["apple", "banana"]
 *
 * // Modulo equality
 * const sameMod = (a: number, b: number) => a % 10 === b % 10
 * nubBy(sameMod)([11, 21, 32, 42, 13, 53])
 * // [11, 32, 13]
 *
 * // Type-based deduplication
 * const sameType = (a: any, b: any) => typeof a === typeof b
 * nubBy(sameType)([1, "hello", 2, true, "world", 3, false])
 * // [1, "hello", true]
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
 *
 * // None considered equal
 * const neverEqual = () => false
 * nubBy(neverEqual)([1, 1, 1, 1])
 * // [1, 1, 1, 1]
 *
 * // Business logic deduplication
 * type Product = { sku: string; version: number; name: string }
 * const sameSku = (a: Product, b: Product) => a.sku === b.sku
 * const products: Product[] = [
 *   { sku: "ABC", version: 1, name: "Widget" },
 *   { sku: "DEF", version: 1, name: "Gadget" },
 *   { sku: "ABC", version: 2, name: "Widget Pro" },
 *   { sku: "GHI", version: 1, name: "Doohickey" },
 *   { sku: "DEF", version: 2, name: "Gadget Plus" }
 * ]
 * nubBy(sameSku)(products)
 * // [
 * //   { sku: "ABC", version: 1, name: "Widget" },
 * //   { sku: "DEF", version: 1, name: "Gadget" },
 * //   { sku: "GHI", version: 1, name: "Doohickey" }
 * // ]
 *
 * // Coordinate deduplication (within distance)
 * type Point = { x: number; y: number }
 * const nearBy = (a: Point, b: Point) => {
 *   const dx = a.x - b.x
 *   const dy = a.y - b.y
 *   return Math.sqrt(dx * dx + dy * dy) < 1
 * }
 * const points: Point[] = [
 *   { x: 0, y: 0 },
 *   { x: 0.5, y: 0.5 },
 *   { x: 3, y: 3 },
 *   { x: 3.2, y: 3.2 },
 *   { x: 10, y: 10 }
 * ]
 * nubBy(nearBy)(points)
 * // [{ x: 0, y: 0 }, { x: 3, y: 3 }, { x: 10, y: 10 }]
 *
 * // Version compatibility deduplication
 * type Version = { major: number; minor: number }
 * const compatibleVersion = (a: Version, b: Version) =>
 *   a.major === b.major
 * const versions: Version[] = [
 *   { major: 1, minor: 0 },
 *   { major: 2, minor: 0 },
 *   { major: 1, minor: 5 },
 *   { major: 3, minor: 0 },
 *   { major: 2, minor: 3 }
 * ]
 * nubBy(compatibleVersion)(versions)
 * // [{ major: 1, minor: 0 }, { major: 2, minor: 0 }, { major: 3, minor: 0 }]
 *
 * // Partial application for reusable deduplicators
 * const dedupeById = nubBy((a: any, b: any) => a.id === b.id)
 * dedupeById([{ id: 1 }, { id: 2 }, { id: 1 }, { id: 3 }])
 * // [{ id: 1 }, { id: 2 }, { id: 3 }]
 *
 * // Handle null/undefined gracefully
 * nubBy((a, b) => a === b)(null)       // []
 * nubBy((a, b) => a === b)(undefined)  // []
 *
 * // Fuzzy string matching
 * const fuzzyMatch = (a: string, b: string) => {
 *   const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")
 *   return normalize(a) === normalize(b)
 * }
 * nubBy(fuzzyMatch)(["Hello!", "HELLO", "hello...", "World", "WORLD!!!"])
 * // ["Hello!", "World"]
 *
 * // Category-based deduplication
 * const sameCategory = (a: number, b: number) => {
 *   const categoryA = a < 10 ? "small" : a < 100 ? "medium" : "large"
 *   const categoryB = b < 10 ? "small" : b < 100 ? "medium" : "large"
 *   return categoryA === categoryB
 * }
 * nubBy(sameCategory)([5, 15, 8, 150, 50, 200, 3])
 * // [5, 15, 150]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Order-preserving - maintains first occurrence order
 * @property Custom-equality - uses provided equality function
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

	const result: Array<T> = []

	for (const element of array) {
		// Check if element is already in result using custom equality
		const isDuplicate = result.some((existing) => equalityFn(existing, element))

		if (!isDuplicate) {
			result.push(element)
		}
	}

	return result
}

export default nubBy
