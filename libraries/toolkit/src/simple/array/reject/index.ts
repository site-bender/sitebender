/**
 * The complement of filter - keeps elements that don't satisfy the predicate
 *
 * Returns a new array containing only the elements for which the predicate
 * returns false. This is the logical opposite of filter - where filter keeps
 * elements that match, reject removes them. Useful when it's clearer to
 * specify what you don't want rather than what you do want.
 *
 * @curried (predicate) => (array) => result
 * @param predicate - Function to test each element (returns true for elements to reject)
 * @param array - Array to filter
 * @returns New array with elements where predicate returned false
 * @example
 * ```typescript
 * // Reject even numbers (keep odd)
 * reject((x: number) => x % 2 === 0)([1, 2, 3, 4, 5, 6])
 * // [1, 3, 5]
 *
 * // Reject null and undefined (keep truthy)
 * reject((x: any) => x == null)([1, null, 2, undefined, 3, 0, false])
 * // [1, 2, 3, 0, false]
 *
 * // Reject empty strings
 * reject((s: string) => s === "")(["hello", "", "world", "", "foo"])
 * // ["hello", "world", "foo"]
 *
 * // Reject inactive users
 * const users = [
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: false },
 *   { name: "Charlie", active: true },
 *   { name: "David", active: false }
 * ]
 * reject((u: { active: boolean }) => !u.active)(users)
 * // [{ name: "Alice", active: true }, { name: "Charlie", active: true }]
 *
 * // Reject invalid entries
 * const isInvalid = (x: any) => {
 *   return x == null || x === "" || (typeof x === "number" && isNaN(x))
 * }
 * reject(isInvalid)([1, NaN, 2, null, 3, "", 4, undefined, 5])
 * // [1, 2, 3, 4, 5]
 *
 * // Reject by property value
 * const products = [
 *   { name: "Widget", price: 10, inStock: true },
 *   { name: "Gadget", price: 20, inStock: false },
 *   { name: "Doohickey", price: 15, inStock: true }
 * ]
 * reject((p: { inStock: boolean }) => !p.inStock)(products)
 * // [{ name: "Widget", price: 10, inStock: true }, { name: "Doohickey", price: 15, inStock: true }]
 *
 * // Reject outliers
 * const isOutlier = (n: number) => n < 0 || n > 100
 * reject(isOutlier)([25, -5, 50, 150, 75, -10, 100, 200])
 * // [25, 50, 75, 100]
 *
 * // Reject specific values
 * const blacklist = [2, 4, 6, 8]
 * reject((x: number) => blacklist.includes(x))([1, 2, 3, 4, 5, 6, 7, 8, 9])
 * // [1, 3, 5, 7, 9]
 *
 * // Reject by string pattern
 * reject((s: string) => s.startsWith("_"))(["_private", "public", "_internal", "api", "_hidden"])
 * // ["public", "api"]
 *
 * // Reject failed validations
 * type Result = { id: number; status: "success" | "failed" | "pending" }
 * const results: Result[] = [
 *   { id: 1, status: "success" },
 *   { id: 2, status: "failed" },
 *   { id: 3, status: "pending" },
 *   { id: 4, status: "failed" },
 *   { id: 5, status: "success" }
 * ]
 * reject((r: Result) => r.status === "failed")(results)
 * // [
 * //   { id: 1, status: "success" },
 * //   { id: 3, status: "pending" },
 * //   { id: 5, status: "success" }
 * // ]
 *
 * // Reject duplicates (keep first occurrence)
 * const seen = new Set<any>()
 * const isDuplicate = (x: any) => {
 *   if (seen.has(x)) return true
 *   seen.add(x)
 *   return false
 * }
 * reject(isDuplicate)([1, 2, 3, 2, 4, 1, 5, 3])
 * // [1, 2, 3, 4, 5]
 *
 * // Reject by date
 * const dates = [
 *   new Date("2024-01-01"),
 *   new Date("2023-12-15"),
 *   new Date("2024-02-01"),
 *   new Date("2023-11-01")
 * ]
 * const isBefore2024 = (d: Date) => d < new Date("2024-01-01")
 * reject(isBefore2024)(dates)
 * // [Date("2024-01-01"), Date("2024-02-01")]
 *
 * // Empty array
 * reject((x: number) => x > 5)([])
 * // []
 *
 * // Reject all (returns empty)
 * reject(() => true)([1, 2, 3, 4, 5])
 * // []
 *
 * // Reject none (returns all)
 * reject(() => false)([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 *
 * // Complex filtering
 * type Person = { name: string; age: number; city: string }
 * const people: Person[] = [
 *   { name: "Alice", age: 25, city: "NYC" },
 *   { name: "Bob", age: 17, city: "LA" },
 *   { name: "Charlie", age: 30, city: "NYC" },
 *   { name: "David", age: 16, city: "Chicago" }
 * ]
 * const isMinor = (p: Person) => p.age < 18
 * reject(isMinor)(people)
 * // [
 * //   { name: "Alice", age: 25, city: "NYC" },
 * //   { name: "Charlie", age: 30, city: "NYC" }
 * // ]
 *
 * // Reject with index
 * reject((val: number, idx: number) => idx % 2 === 0)([10, 20, 30, 40, 50])
 * // [20, 40] (keeps odd indices)
 *
 * // Partial application for reusable filters
 * const rejectNull = reject((x: any) => x == null)
 * rejectNull([1, null, 2, undefined, 3])  // [1, 2, 3]
 * rejectNull(["a", null, "b", null])       // ["a", "b"]
 *
 * const rejectEmpty = reject((x: any) => {
 *   if (typeof x === "string") return x === ""
 *   if (Array.isArray(x)) return x.length === 0
 *   if (typeof x === "object" && x !== null) return Object.keys(x).length === 0
 *   return false
 * })
 * rejectEmpty(["hello", "", [], "world", {}, { a: 1 }])
 * // ["hello", "world", { a: 1 }]
 *
 * // Handle null/undefined gracefully
 * reject((x: any) => true)(null)       // []
 * reject((x: any) => true)(undefined)  // []
 *
 * // Remove errors from results
 * const processResults = [
 *   { value: 10, error: null },
 *   { value: null, error: "Failed to process" },
 *   { value: 20, error: null },
 *   { value: null, error: "Invalid input" }
 * ]
 * reject((r: any) => r.error !== null)(processResults)
 * // [{ value: 10, error: null }, { value: 20, error: null }]
 *
 * // Clean data
 * const raw = [1, -1, 2, -2, 3, -3, 0]
 * reject((n: number) => n <= 0)(raw)
 * // [1, 2, 3]
 *
 * // Remove stopwords
 * const stopwords = ["the", "a", "an", "and", "or", "but"]
 * const words = ["the", "quick", "brown", "fox", "and", "the", "lazy", "dog"]
 * reject((w: string) => stopwords.includes(w.toLowerCase()))(words)
 * // ["quick", "brown", "fox", "lazy", "dog"]
 *
 * // Filter vs Reject comparison
 * const isEven = (n: number) => n % 2 === 0
 * const numbers = [1, 2, 3, 4, 5]
 * // filter keeps matching:
 * // filter(isEven)(numbers) = [2, 4]
 * // reject removes matching:
 * reject(isEven)(numbers)
 * // [1, 3, 5]
 *
 * // Chain with other operations
 * const data = [1, null, 2, undefined, 3, 0, 4, NaN, 5]
 * const cleaned = reject((x: any) => x == null || (typeof x === "number" && isNaN(x)))(data)
 * // [1, 2, 3, 0, 4, 5]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Complement - opposite of filter operation
 * @property Predicate-based - uses boolean function for testing
 */
const reject = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	return array.filter((value, index, arr) => !predicate(value, index, arr))
}

export default reject
