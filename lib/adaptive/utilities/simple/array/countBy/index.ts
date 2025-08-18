/**
 * Counts elements of an array according to the values returned by a function
 * 
 * Groups array elements by the result of calling a function on each element,
 * then counts how many elements are in each group. Returns an object where
 * keys are the function results and values are the counts. This is useful
 * for creating frequency distributions or aggregating data by categories.
 * 
 * @curried (fn) => (array) => result
 * @param fn - Function that returns a key for grouping
 * @param array - Array to count elements from
 * @returns Object with keys and their occurrence counts
 * @example
 * ```typescript
 * // Count by simple property
 * countBy((x: number) => x % 2 === 0 ? "even" : "odd")([1, 2, 3, 4, 5])
 * // { odd: 3, even: 2 }
 * 
 * // Count by first letter
 * countBy((s: string) => s[0])(["apple", "banana", "apricot", "cherry", "avocado"])
 * // { a: 3, b: 1, c: 1 }
 * 
 * // Count by length
 * countBy((s: string) => s.length)(["a", "bb", "ccc", "dd", "e"])
 * // { "1": 2, "2": 2, "3": 1 }
 * 
 * // Count by age group
 * const people = [
 *   { name: "Alice", age: 25 },
 *   { name: "Bob", age: 30 },
 *   { name: "Charlie", age: 25 },
 *   { name: "David", age: 40 },
 *   { name: "Eve", age: 30 }
 * ]
 * countBy((p: { age: number }) => p.age)(people)
 * // { "25": 2, "30": 2, "40": 1 }
 * 
 * // Count by category
 * const products = [
 *   { name: "Laptop", category: "Electronics" },
 *   { name: "Shirt", category: "Clothing" },
 *   { name: "Phone", category: "Electronics" },
 *   { name: "Pants", category: "Clothing" },
 *   { name: "Tablet", category: "Electronics" }
 * ]
 * countBy((p: { category: string }) => p.category)(products)
 * // { Electronics: 3, Clothing: 2 }
 * 
 * // Count by grade level
 * const scores = [95, 87, 73, 91, 68, 82, 100, 77]
 * countBy((score: number) => {
 *   if (score >= 90) return "A"
 *   if (score >= 80) return "B"
 *   if (score >= 70) return "C"
 *   return "F"
 * })(scores)
 * // { A: 3, B: 2, C: 2, F: 1 }
 * 
 * // Count by boolean condition
 * countBy((n: number) => n > 10)([5, 15, 8, 20, 3, 12])
 * // { false: 3, true: 3 }
 * 
 * // Count by multiple of
 * countBy((n: number) => `multiple_of_${n % 3 === 0 ? 3 : n % 2 === 0 ? 2 : 1}`)([1, 2, 3, 4, 5, 6, 7, 8, 9])
 * // { multiple_of_1: 3, multiple_of_2: 2, multiple_of_3: 4 }
 * 
 * // Count by day of week
 * const dates = [
 *   new Date("2024-01-01"), // Monday
 *   new Date("2024-01-02"), // Tuesday
 *   new Date("2024-01-03"), // Wednesday
 *   new Date("2024-01-01"), // Monday
 *   new Date("2024-01-04")  // Thursday
 * ]
 * const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
 * countBy((d: Date) => dayNames[d.getDay()])(dates)
 * // { Mon: 2, Tue: 1, Wed: 1, Thu: 1 }
 * 
 * // Count by word type
 * const words = ["run", "running", "ran", "runner", "runs"]
 * countBy((w: string) => {
 *   if (w.endsWith("ing")) return "gerund"
 *   if (w.endsWith("er")) return "noun"
 *   if (w.endsWith("s")) return "plural"
 *   return "other"
 * })(words)
 * // { other: 2, gerund: 1, noun: 1, plural: 1 }
 * 
 * // Count null/undefined values
 * countBy((x: any) => x == null ? "nullish" : "defined")([1, null, 2, undefined, 3])
 * // { defined: 3, nullish: 2 }
 * 
 * // Empty array
 * countBy((x: number) => x)([])
 * // {}
 * 
 * // Single element
 * countBy((x: string) => x.toUpperCase())(["hello"])
 * // { HELLO: 1 }
 * 
 * // All same group
 * countBy(() => "same")([1, 2, 3, 4, 5])
 * // { same: 5 }
 * 
 * // Count by custom bins
 * const temperatures = [32, 45, 68, 72, 85, 91, 38, 77]
 * countBy((temp: number) => {
 *   if (temp < 40) return "cold"
 *   if (temp < 70) return "mild"
 *   if (temp < 85) return "warm"
 *   return "hot"
 * })(temperatures)
 * // { cold: 2, mild: 2, warm: 2, hot: 2 }
 * 
 * // Partial application for reusable counters
 * const countByType = countBy((x: any) => typeof x)
 * countByType([1, "hello", true, 42, "world", false])
 * // { number: 2, string: 2, boolean: 2 }
 * 
 * const countBySign = countBy((n: number) => n > 0 ? "positive" : n < 0 ? "negative" : "zero")
 * countBySign([3, -2, 0, 5, -7, 0, 8])
 * // { positive: 3, negative: 2, zero: 2 }
 * 
 * // File extensions
 * const files = ["doc.txt", "image.jpg", "data.csv", "photo.jpg", "report.txt"]
 * countBy((f: string) => f.split(".").pop() || "none")(files)
 * // { txt: 2, jpg: 2, csv: 1 }
 * 
 * // HTTP status codes
 * const responses = [200, 404, 200, 500, 301, 200, 404]
 * countBy((code: number) => {
 *   if (code < 300) return "success"
 *   if (code < 400) return "redirect"
 *   if (code < 500) return "client_error"
 *   return "server_error"
 * })(responses)
 * // { success: 3, client_error: 2, redirect: 1, server_error: 1 }
 * 
 * // Handle null/undefined gracefully
 * countBy((x: number) => x)(null)       // {}
 * countBy((x: number) => x)(undefined)  // {}
 * 
 * // Complex objects with nested properties
 * const users = [
 *   { name: "Alice", address: { city: "NYC" } },
 *   { name: "Bob", address: { city: "LA" } },
 *   { name: "Charlie", address: { city: "NYC" } },
 *   { name: "David", address: { city: "Chicago" } },
 *   { name: "Eve", address: { city: "LA" } }
 * ]
 * countBy((u: any) => u.address.city)(users)
 * // { NYC: 2, LA: 2, Chicago: 1 }
 * 
 * // Count by computed property
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * countBy((n: number) => {
 *   const factors = []
 *   for (let i = 2; i <= n; i++) {
 *     if (n % i === 0) factors.push(i)
 *   }
 *   return `factors_${factors.length}`
 * })(numbers)
 * // { factors_0: 1, factors_1: 4, factors_2: 2, factors_3: 2, factors_4: 1 }
 * ```
 * @property Immutable - doesn't modify input array
 * @property Aggregating - groups and counts occurrences
 * @property Type-flexible - works with any key type that can be object property
 */
const countBy = <T, K extends string | number | symbol>(
	fn: (element: T) => K
) => (
	array: ReadonlyArray<T> | null | undefined
): Record<K, number> => {
	if (array == null || !Array.isArray(array)) {
		return {} as Record<K, number>
	}
	
	const result = {} as Record<K, number>
	
	for (const element of array) {
		const key = fn(element)
		if (key != null) {
			result[key] = (result[key] || 0) + 1
		}
	}
	
	return result
}

export default countBy