/**
 * Returns a new array without consecutive duplicate elements using a comparator
 *
 * Like dropRepeats but uses a custom comparator function to determine equality
 * between consecutive elements. Removes consecutive elements that the comparator
 * considers equal, keeping only the first of each run. Useful for complex objects,
 * custom equality logic, or tolerance-based comparisons.
 *
 * @curried (comparator) => (array) => result
 * @param comparator - Function to determine if two consecutive elements are equal
 * @param array - Array to remove consecutive duplicates from
 * @returns New array with consecutive duplicates removed per comparator
 * @example
 * ```typescript
 * // Case-insensitive string comparison
 * const caseInsensitive = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * dropRepeatsWith(caseInsensitive)(["Hello", "HELLO", "world", "WORLD", "World", "foo"])
 * // ["Hello", "world", "foo"]
 *
 * // Object comparison by property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const items = [
 *   { id: 1, name: "Alice" },
 *   { id: 1, name: "Alicia" },
 *   { id: 2, name: "Bob" },
 *   { id: 2, name: "Bobby" },
 *   { id: 1, name: "Alice" }
 * ]
 * dropRepeatsWith(byId)(items)
 * // [
 * //   { id: 1, name: "Alice" },
 * //   { id: 2, name: "Bob" },
 * //   { id: 1, name: "Alice" }
 * // ]
 *
 * // Numeric tolerance comparison
 * const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
 * dropRepeatsWith(approxEqual)([1.0, 1.05, 1.08, 1.2, 1.25, 1.5, 1.48])
 * // [1.0, 1.2, 1.5]
 *
 * // Array length comparison
 * const sameLength = (a: Array<any>, b: Array<any>) => a.length === b.length
 * dropRepeatsWith(sameLength)([[1], [2], [3, 4], [5, 6], [7], [8]])
 * // [[1], [3, 4], [7]]
 *
 * // Deep equality check
 * const deepEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b)
 * dropRepeatsWith(deepEqual)([
 *   { x: 1, y: 2 },
 *   { x: 1, y: 2 },
 *   { x: 2, y: 3 },
 *   { x: 2, y: 3 },
 *   { x: 1, y: 2 }
 * ])
 * // [{ x: 1, y: 2 }, { x: 2, y: 3 }, { x: 1, y: 2 }]
 *
 * // Date comparison (same day)
 * const sameDay = (a: Date, b: Date) =>
 *   a.toDateString() === b.toDateString()
 * const dates = [
 *   new Date("2024-01-01T09:00"),
 *   new Date("2024-01-01T14:00"),
 *   new Date("2024-01-02T10:00"),
 *   new Date("2024-01-02T16:00"),
 *   new Date("2024-01-01T12:00")
 * ]
 * dropRepeatsWith(sameDay)(dates)
 * // [Date("2024-01-01T09:00"), Date("2024-01-02T10:00"), Date("2024-01-01T12:00")]
 *
 * // String prefix matching
 * const samePrefix = (a: string, b: string) =>
 *   a.slice(0, 3) === b.slice(0, 3)
 * dropRepeatsWith(samePrefix)(["apple", "application", "banana", "bandana", "cherry"])
 * // ["apple", "banana", "cherry"]
 *
 * // Modulo comparison
 * const sameMod = (a: number, b: number) => a % 10 === b % 10
 * dropRepeatsWith(sameMod)([11, 21, 31, 42, 52, 63, 73])
 * // [11, 42, 63]
 *
 * // Business logic: price bands
 * const samePriceBand = (a: number, b: number) => {
 *   const bandA = Math.floor(a / 100) * 100
 *   const bandB = Math.floor(b / 100) * 100
 *   return bandA === bandB
 * }
 * dropRepeatsWith(samePriceBand)([99, 150, 175, 250, 275, 350, 125])
 * // [99, 150, 250, 350, 125]
 *
 * // Status grouping
 * type Status = { code: number; message: string }
 * const sameStatusType = (a: Status, b: Status) =>
 *   Math.floor(a.code / 100) === Math.floor(b.code / 100)
 * const responses = [
 *   { code: 200, message: "OK" },
 *   { code: 201, message: "Created" },
 *   { code: 404, message: "Not Found" },
 *   { code: 403, message: "Forbidden" },
 *   { code: 500, message: "Error" },
 *   { code: 503, message: "Unavailable" }
 * ]
 * dropRepeatsWith(sameStatusType)(responses)
 * // [
 * //   { code: 200, message: "OK" },
 * //   { code: 404, message: "Not Found" },
 * //   { code: 500, message: "Error" }
 * // ]
 *
 * // Always true (removes all consecutive)
 * const alwaysEqual = () => true
 * dropRepeatsWith(alwaysEqual)([1, 2, 3, 4, 5])
 * // [1]
 *
 * // Always false (keeps all)
 * const neverEqual = () => false
 * dropRepeatsWith(neverEqual)([1, 1, 1, 1, 1])
 * // [1, 1, 1, 1, 1]
 *
 * // Type comparison
 * const sameType = (a: any, b: any) => typeof a === typeof b
 * dropRepeatsWith(sameType)([1, 2, "hello", "world", true, false, 42])
 * // [1, "hello", true, 42]
 *
 * // Range-based grouping
 * const inSameRange = (a: number, b: number) => {
 *   const rangeA = a < 10 ? "low" : a < 20 ? "mid" : "high"
 *   const rangeB = b < 10 ? "low" : b < 20 ? "mid" : "high"
 *   return rangeA === rangeB
 * }
 * dropRepeatsWith(inSameRange)([5, 8, 15, 18, 25, 30, 12])
 * // [5, 15, 25, 12]
 *
 * // Empty array
 * dropRepeatsWith((a, b) => a === b)([])
 * // []
 *
 * // Single element
 * dropRepeatsWith((a, b) => a === b)([42])
 * // [42]
 *
 * // Partial application for reusable deduplicators
 * const dropRepeatsById = dropRepeatsWith((a: any, b: any) => a.id === b.id)
 * dropRepeatsById([
 *   { id: 1, value: "a" },
 *   { id: 1, value: "b" },
 *   { id: 2, value: "c" }
 * ])
 * // [{ id: 1, value: "a" }, { id: 2, value: "c" }]
 *
 * // Handle null/undefined gracefully
 * dropRepeatsWith((a, b) => a === b)(null)       // []
 * dropRepeatsWith((a, b) => a === b)(undefined)  // []
 *
 * // Complex nested comparison
 * const byNestedProp = (a: any, b: any) =>
 *   a?.data?.type === b?.data?.type
 * dropRepeatsWith(byNestedProp)([
 *   { data: { type: "A", value: 1 } },
 *   { data: { type: "A", value: 2 } },
 *   { data: { type: "B", value: 3 } },
 *   { data: { type: "B", value: 4 } },
 *   { data: { type: "A", value: 5 } }
 * ])
 * // [
 * //   { data: { type: "A", value: 1 } },
 * //   { data: { type: "B", value: 3 } },
 * //   { data: { type: "A", value: 5 } }
 * // ]
 *
 * // Fuzzy string matching
 * const fuzzyMatch = (a: string, b: string) => {
 *   const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")
 *   return normalize(a) === normalize(b)
 * }
 * dropRepeatsWith(fuzzyMatch)(["Hello!", "HELLO", "hello...", "World", "WORLD!!!"])
 * // ["Hello!", "World"]
 *
 * // Time-based grouping
 * const within5Minutes = (a: Date, b: Date) =>
 *   Math.abs(a.getTime() - b.getTime()) < 5 * 60 * 1000
 * const timestamps = [
 *   new Date("2024-01-01T10:00"),
 *   new Date("2024-01-01T10:03"),
 *   new Date("2024-01-01T10:10"),
 *   new Date("2024-01-01T10:12"),
 *   new Date("2024-01-01T10:20")
 * ]
 * dropRepeatsWith(within5Minutes)(timestamps)
 * // [
 * //   Date("2024-01-01T10:00"),
 * //   Date("2024-01-01T10:10"),
 * //   Date("2024-01-01T10:20")
 * // ]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Consecutive-only - only removes adjacent duplicates
 * @property Custom-equality - uses provided comparator for matching
 */
const dropRepeatsWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	if (array.length === 1) {
		return [...array]
	}

	const result: Array<T> = [array[0]]

	for (let i = 1; i < array.length; i++) {
		if (!comparator(array[i], array[i - 1])) {
			result.push(array[i])
		}
	}

	return result
}

export default dropRepeatsWith
