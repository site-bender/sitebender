/**
 * Groups array elements by the result of a key function
 * 
 * Creates an object where keys are the results of the key function and
 * values are arrays of elements that produced that key. Useful for
 * categorizing, indexing, or aggregating data.
 * 
 * @curried (keyFn) => (array) => result
 * @param keyFn - Function that returns a grouping key for each element
 * @param array - Array to group
 * @returns Object with keys as group identifiers and values as element arrays
 * @example
 * ```typescript
 * // Group by property
 * groupBy((person: { age: number; name: string }) => person.age)([
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 30 }
 * ])
 * // {
 * //   25: [{ name: "Bob", age: 25 }],
 * //   30: [{ name: "Alice", age: 30 }, { name: "Charlie", age: 30 }]
 * // }
 * 
 * // Group by computed value
 * groupBy((x: number) => x % 2 === 0 ? "even" : "odd")([1, 2, 3, 4, 5])
 * // { odd: [1, 3, 5], even: [2, 4] }
 * 
 * // Group strings by length
 * groupBy((s: string) => s.length)(["a", "bb", "ccc", "dd", "e"])
 * // { 1: ["a", "e"], 2: ["bb", "dd"], 3: ["ccc"] }
 * 
 * // Group by first letter
 * groupBy((s: string) => s[0].toUpperCase())([
 *   "apple", "apricot", "banana", "cherry", "cantaloupe"
 * ])
 * // {
 * //   A: ["apple", "apricot"],
 * //   B: ["banana"],
 * //   C: ["cherry", "cantaloupe"]
 * // }
 * 
 * // Group objects by type
 * groupBy((item: { type: string; name: string }) => item.type)([
 *   { type: "fruit", name: "apple" },
 *   { type: "vegetable", name: "carrot" },
 *   { type: "fruit", name: "banana" },
 *   { type: "vegetable", name: "lettuce" }
 * ])
 * // {
 * //   fruit: [{ type: "fruit", name: "apple" }, { type: "fruit", name: "banana" }],
 * //   vegetable: [{ type: "vegetable", name: "carrot" }, { type: "vegetable", name: "lettuce" }]
 * // }
 * 
 * // Group by date (year)
 * groupBy((date: Date) => date.getFullYear())([
 *   new Date("2023-01-15"),
 *   new Date("2024-06-20"),
 *   new Date("2023-12-25"),
 *   new Date("2024-03-10")
 * ])
 * // {
 * //   2023: [Date("2023-01-15"), Date("2023-12-25")],
 * //   2024: [Date("2024-06-20"), Date("2024-03-10")]
 * // }
 * 
 * // Partial application for reusable groupers
 * const groupByType = groupBy((item: { type: string }) => item.type)
 * groupByType([
 *   { type: "A", value: 1 },
 *   { type: "B", value: 2 },
 *   { type: "A", value: 3 }
 * ])
 * // { A: [{ type: "A", value: 1 }, { type: "A", value: 3 }], B: [{ type: "B", value: 2 }] }
 * 
 * // Handle edge cases
 * groupBy((x: number) => x > 0 ? "positive" : "negative")([])  // {}
 * groupBy((x: number) => "all")([1, 2, 3])  // { all: [1, 2, 3] }
 * 
 * // Handle null/undefined gracefully
 * groupBy((x: number) => String(x))(null)       // {}
 * groupBy((x: number) => String(x))(undefined)  // {}
 * ```
 * @property Immutable - doesn't modify input array
 * @property Preserves order - elements in groups maintain original array order
 * @property String keys - all keys are converted to strings for object property names
 */
const groupBy = <T, K extends string | number>(
	keyFn: (element: T) => K
) => (
	array: ReadonlyArray<T> | null | undefined
): Record<string, Array<T>> => {
	if (array == null || !Array.isArray(array)) {
		return {}
	}
	
	return array.reduce((acc: Record<string, Array<T>>, element: T) => {
		const key = String(keyFn(element))
		
		return {
			...acc,
			[key]: [...(acc[key] || []), element]
		}
	}, {})
}

export default groupBy