/**
 * Sorts an array based on a mapping function
 *
 * Sorts elements by comparing the values returned by applying a mapping
 * function to each element. The mapping function is called once per element
 * and results are cached for efficiency. Sorts in ascending order by default.
 * For descending order, negate numbers or reverse the result. Useful for
 * sorting objects by property, computed values, or complex sort keys.
 *
 * @curried (fn) => (array) => result
 * @param fn - Function that maps each element to a comparable value
 * @param array - Array to sort
 * @returns New sorted array (original unchanged)
 * @example
 * ```typescript
 * // Sort numbers by absolute value
 * sortBy(Math.abs)([-5, 3, -1, 4, -2])
 * // [-1, -2, 3, 4, -5]
 *
 * // Sort objects by property
 * const users = [
 *   { name: "Charlie", age: 30 },
 *   { name: "Alice", age: 25 },
 *   { name: "Bob", age: 35 }
 * ]
 * sortBy((u: { age: number }) => u.age)(users)
 * // [
 * //   { name: "Alice", age: 25 },
 * //   { name: "Charlie", age: 30 },
 * //   { name: "Bob", age: 35 }
 * // ]
 *
 * // Sort by string length
 * sortBy((s: string) => s.length)(["cat", "elephant", "dog", "ant"])
 * // ["cat", "dog", "ant", "elephant"]
 *
 * // Sort by last character
 * sortBy((s: string) => s[s.length - 1])(["apple", "banana", "cherry", "date"])
 * // ["banana", "apple", "date", "cherry"]
 *
 * // Sort by computed value
 * const items = [
 *   { price: 10, quantity: 5 },
 *   { price: 20, quantity: 2 },
 *   { price: 5, quantity: 10 }
 * ]
 * sortBy((item: { price: number; quantity: number }) =>
 *   item.price * item.quantity
 * )(items)
 * // [
 * //   { price: 20, quantity: 2 },  // total: 40
 * //   { price: 10, quantity: 5 },  // total: 50
 * //   { price: 5, quantity: 10 }   // total: 50
 * // ]
 *
 * // Sort dates
 * const events = [
 *   { name: "Event C", date: new Date("2024-03-15") },
 *   { name: "Event A", date: new Date("2024-01-10") },
 *   { name: "Event B", date: new Date("2024-02-20") }
 * ]
 * sortBy((e: { date: Date }) => e.date.getTime())(events)
 * // [Event A (Jan), Event B (Feb), Event C (Mar)]
 *
 * // Sort by priority (enum/number mapping)
 * type Task = { name: string; priority: "low" | "medium" | "high" }
 * const tasks: Task[] = [
 *   { name: "Task 1", priority: "medium" },
 *   { name: "Task 2", priority: "high" },
 *   { name: "Task 3", priority: "low" }
 * ]
 * const priorityMap = { low: 3, medium: 2, high: 1 }
 * sortBy((t: Task) => priorityMap[t.priority])(tasks)
 * // [
 * //   { name: "Task 2", priority: "high" },
 * //   { name: "Task 1", priority: "medium" },
 * //   { name: "Task 3", priority: "low" }
 * // ]
 *
 * // Sort by multiple criteria (combine into single value)
 * const people = [
 *   { firstName: "John", lastName: "Smith" },
 *   { firstName: "Jane", lastName: "Doe" },
 *   { firstName: "John", lastName: "Doe" }
 * ]
 * sortBy((p: { firstName: string; lastName: string }) =>
 *   `${p.lastName}-${p.firstName}`
 * )(people)
 * // [
 * //   { firstName: "Jane", lastName: "Doe" },
 * //   { firstName: "John", lastName: "Doe" },
 * //   { firstName: "John", lastName: "Smith" }
 * // ]
 *
 * // Descending order (negate numbers)
 * sortBy((n: number) => -n)([3, 1, 4, 1, 5, 9])
 * // [9, 5, 4, 3, 1, 1]
 *
 * // Sort by boolean (false < true)
 * const items = [
 *   { name: "A", active: true },
 *   { name: "B", active: false },
 *   { name: "C", active: true }
 * ]
 * sortBy((item: { active: boolean }) => item.active)(items)
 * // [
 * //   { name: "B", active: false },
 * //   { name: "A", active: true },
 * //   { name: "C", active: true }
 * // ]
 *
 * // Sort by remainder (modulo)
 * sortBy((n: number) => n % 3)([1, 2, 3, 4, 5, 6, 7, 8, 9])
 * // [3, 6, 9, 1, 4, 7, 2, 5, 8]
 * // (grouped by remainder: 0, 1, 2)
 *
 * // Sort file paths by depth
 * const paths = [
 *   "/usr/local/bin/app",
 *   "/home/user",
 *   "/usr/bin",
 *   "/"
 * ]
 * sortBy((path: string) => path.split("/").length)(paths)
 * // [
 * //   "/",
 * //   "/usr/bin",
 * //   "/home/user",
 * //   "/usr/local/bin/app"
 * // ]
 *
 * // Sort by distance from target
 * const target = 50
 * sortBy((n: number) => Math.abs(n - target))([10, 60, 45, 80, 30, 52])
 * // [52, 45, 60, 30, 80, 10]
 * // (sorted by distance from 50)
 *
 * // Case-insensitive string sort
 * sortBy((s: string) => s.toLowerCase())(["zebra", "Apple", "banana", "Cherry"])
 * // ["Apple", "banana", "Cherry", "zebra"]
 *
 * // Sort by digit sum
 * const digitSum = (n: number) =>
 *   String(Math.abs(n)).split("").reduce((sum, d) => sum + Number(d), 0)
 * sortBy(digitSum)([123, 45, 789, 12, 567])
 * // [12, 45, 123, 567, 789]
 * // (sums: 3, 9, 6, 18, 21)
 *
 * // Sort coordinates by distance from origin
 * const points = [
 *   { x: 3, y: 4 },
 *   { x: 1, y: 1 },
 *   { x: 5, y: 0 }
 * ]
 * sortBy((p: { x: number; y: number }) =>
 *   Math.sqrt(p.x * p.x + p.y * p.y)
 * )(points)
 * // [
 * //   { x: 1, y: 1 },    // distance: 1.414
 * //   { x: 3, y: 4 },    // distance: 5
 * //   { x: 5, y: 0 }     // distance: 5
 * // ]
 *
 * // Empty array
 * sortBy((x: number) => x)([])
 * // []
 *
 * // Single element
 * sortBy((x: number) => x)([42])
 * // [42]
 *
 * // Already sorted
 * sortBy((x: number) => x)([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 *
 * // Reverse sorted
 * sortBy((x: number) => x)([5, 4, 3, 2, 1])
 * // [1, 2, 3, 4, 5]
 *
 * // Handle null/undefined
 * sortBy((x: any) => x)(null)       // []
 * sortBy((x: any) => x)(undefined)  // []
 *
 * // Stable sort (preserves order of equal elements)
 * const data = [
 *   { id: 1, value: "a" },
 *   { id: 2, value: "b" },
 *   { id: 3, value: "a" }
 * ]
 * sortBy((d: { value: string }) => d.value)(data)
 * // [
 * //   { id: 1, value: "a" },
 * //   { id: 3, value: "a" },  // preserves relative order
 * //   { id: 2, value: "b" }
 * // ]
 *
 * // Sort by extracted number
 * const codes = ["item-5", "item-10", "item-2", "item-100"]
 * sortBy((code: string) => {
 *   const num = code.match(/\d+/)
 *   return num ? parseInt(num[0]) : 0
 * })(codes)
 * // ["item-2", "item-5", "item-10", "item-100"]
 *
 * // Partial application for reusable sorters
 * const byAge = sortBy((person: { age: number }) => person.age)
 * const byName = sortBy((person: { name: string }) => person.name)
 *
 * const people = [
 *   { name: "Bob", age: 30 },
 *   { name: "Alice", age: 25 }
 * ]
 * byAge(people)   // sorted by age
 * byName(people)  // sorted by name
 *
 * // Sort enum values
 * enum Status { Pending = 0, InProgress = 1, Complete = 2 }
 * const items = [
 *   { status: Status.Complete },
 *   { status: Status.Pending },
 *   { status: Status.InProgress }
 * ]
 * sortBy((item: { status: Status }) => item.status)(items)
 * // [Pending, InProgress, Complete]
 *
 * // Complex sorting key
 * const products = [
 *   { category: "B", price: 20, name: "Product 1" },
 *   { category: "A", price: 30, name: "Product 2" },
 *   { category: "A", price: 20, name: "Product 3" }
 * ]
 * sortBy((p: any) => `${p.category}-${String(p.price).padStart(10, "0")}`)(products)
 * // Sorted by category, then price within category
 * ```
 * @property Immutable - doesn't modify input array
 * @property Stable - preserves order of equal elements
 * @property Cached - mapping function called once per element
 */
const sortBy = <T, U>(
	fn: (value: T) => U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Map each element to [element, sortKey] pairs
	const mapped = array.map((element, index) => ({
		element,
		sortKey: fn(element),
		index, // Preserve original index for stable sort
	}))

	// Sort by the computed keys
	mapped.sort((a, b) => {
		if (a.sortKey < b.sortKey) return -1
		if (a.sortKey > b.sortKey) return 1
		// If keys are equal, maintain original order (stable sort)
		return a.index - b.index
	})

	// Extract the sorted elements
	return mapped.map((item) => item.element)
}

export default sortBy
