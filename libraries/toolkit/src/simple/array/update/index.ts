/**
 * Returns a new array with the element at index replaced by the result of a function
 *
 * Applies a transformation function to the element at the specified index,
 * returning a new array with the transformed element. If the index is out
 * of bounds, returns a copy of the original array unchanged. Negative
 * indices count from the end. Useful for immutable updates, state
 * transformations, or conditional modifications.
 *
 * @curried (index) => (fn) => (array) => result
 * @param index - Index of element to update (negative counts from end)
 * @param fn - Function to transform the element
 * @param array - Array to update
 * @returns New array with updated element
 * @example
 * ```typescript
 * // Basic update
 * update(1)((x: number) => x * 2)([1, 2, 3, 4])
 * // [1, 4, 3, 4]
 *
 * // Increment at index
 * update(2)((x: number) => x + 1)([10, 20, 30, 40])
 * // [10, 20, 31, 40]
 *
 * // String transformation
 * update(0)((s: string) => s.toUpperCase())(["hello", "world"])
 * // ["HELLO", "world"]
 *
 * // Toggle boolean
 * update(1)((b: boolean) => !b)([true, false, true])
 * // [true, true, true]
 *
 * // Negative index (from end)
 * update(-1)((x: number) => x * 10)([1, 2, 3, 4])
 * // [1, 2, 3, 40]
 *
 * update(-2)((x: number) => x + 100)([1, 2, 3, 4])
 * // [1, 2, 103, 4]
 *
 * // Object transformation
 * const users = [
 *   { id: 1, name: "Alice", active: true },
 *   { id: 2, name: "Bob", active: true },
 *   { id: 3, name: "Charlie", active: true }
 * ]
 * update(1)((u: any) => ({ ...u, active: false }))(users)
 * // [
 * //   { id: 1, name: "Alice", active: true },
 * //   { id: 2, name: "Bob", active: false },
 * //   { id: 3, name: "Charlie", active: true }
 * // ]
 *
 * // Conditional update
 * update(2)((x: number) => x > 50 ? x / 2 : x * 2)([10, 20, 60, 80])
 * // [10, 20, 30, 80]
 *
 * // Complex calculation
 * const applyDiscount = (price: number) => Math.round(price * 0.9)
 * update(1)(applyDiscount)([100, 200, 300])
 * // [100, 180, 300]
 *
 * // Index out of bounds (no change)
 * update(10)((x: number) => x * 2)([1, 2, 3])
 * // [1, 2, 3]
 *
 * update(-10)((x: number) => x * 2)([1, 2, 3])
 * // [1, 2, 3]
 *
 * // First element
 * update(0)((x: string) => `[${x}]`)(["a", "b", "c"])
 * // ["[a]", "b", "c"]
 *
 * // Last element
 * update(-1)((x: string) => `${x}!`)(["hello", "world"])
 * // ["hello", "world!"]
 *
 * // Single element array
 * update(0)((x: number) => x * x)([5])
 * // [25]
 *
 * // Empty array
 * update(0)((x: any) => x)([])
 * // []
 *
 * // Date transformation
 * const dates = [
 *   new Date("2024-01-01"),
 *   new Date("2024-02-01"),
 *   new Date("2024-03-01")
 * ]
 * update(1)((d: Date) => {
 *   const newDate = new Date(d)
 *   newDate.setMonth(d.getMonth() + 1)
 *   return newDate
 * })(dates)
 * // [Date("2024-01-01"), Date("2024-03-01"), Date("2024-03-01")]
 *
 * // Array element transformation
 * const matrix = [[1, 2], [3, 4], [5, 6]]
 * update(1)((row: number[]) => row.map(x => x * 10))(matrix)
 * // [[1, 2], [30, 40], [5, 6]]
 *
 * // Counter increment
 * const counters = [0, 0, 0, 0]
 * update(2)((c: number) => c + 1)(counters)
 * // [0, 0, 1, 0]
 *
 * // Score update
 * const scores = [85, 90, 78, 92]
 * update(2)((s: number) => Math.min(100, s + 10))(scores)
 * // [85, 90, 88, 92]
 *
 * // Status update
 * const tasks = ["pending", "active", "pending", "complete"]
 * update(0)(() => "active")(tasks)
 * // ["active", "active", "pending", "complete"]
 *
 * // Price adjustment
 * const prices = [9.99, 19.99, 29.99, 39.99]
 * update(1)((p: number) => +(p * 1.1).toFixed(2))(prices)
 * // [9.99, 21.99, 29.99, 39.99]
 *
 * // Handle null/undefined
 * update(0)((x: any) => x)(null)       // []
 * update(0)((x: any) => x)(undefined)  // []
 *
 * // Character replacement
 * const chars = ["a", "b", "c", "d"]
 * update(2)((c: string) => c.repeat(3))(chars)
 * // ["a", "b", "ccc", "d"]
 *
 * // Inventory adjustment
 * const inventory = [
 *   { item: "apples", qty: 10 },
 *   { item: "bananas", qty: 15 },
 *   { item: "oranges", qty: 8 }
 * ]
 * update(1)((inv: any) => ({ ...inv, qty: inv.qty - 5 }))(inventory)
 * // [
 * //   { item: "apples", qty: 10 },
 * //   { item: "bananas", qty: 10 },
 * //   { item: "oranges", qty: 8 }
 * // ]
 *
 * // Partial application for reusable updates
 * const doubleAt = update(2)((x: number) => x * 2)
 * doubleAt([1, 2, 3, 4])  // [1, 2, 6, 4]
 * doubleAt([5, 6, 7, 8])  // [5, 6, 14, 8]
 *
 * const toggleFirst = update(0)((b: boolean) => !b)
 * toggleFirst([true, false, true])   // [false, false, true]
 * toggleFirst([false, false, false]) // [true, false, false]
 *
 * // Chain updates
 * const data = [1, 2, 3, 4, 5]
 * const step1 = update(0)((x: number) => x * 10)(data)
 * const step2 = update(2)((x: number) => x * 10)(step1)
 * const step3 = update(4)((x: number) => x * 10)(step2)
 * // [10, 2, 30, 4, 50]
 *
 * // Update with context
 * const addIndex = (index: number) =>
 *   update(index)((val: number) => val + index)
 * addIndex(0)([10, 20, 30])  // [10, 20, 30] (10 + 0)
 * addIndex(1)([10, 20, 30])  // [10, 21, 30] (20 + 1)
 * addIndex(2)([10, 20, 30])  // [10, 20, 32] (30 + 2)
 *
 * // Color channel adjustment
 * const rgb = [255, 128, 64]
 * update(1)((g: number) => Math.max(0, g - 50))(rgb)
 * // [255, 78, 64]
 *
 * // Game state update
 * const players = [
 *   { name: "Player1", score: 100 },
 *   { name: "Player2", score: 150 },
 *   { name: "Player3", score: 120 }
 * ]
 * update(1)((p: any) => ({ ...p, score: p.score + 50 }))(players)
 * // Player2 gets 50 bonus points
 *
 * // Configuration toggle
 * const settings = [true, false, true, false]
 * const toggleSetting = (idx: number) =>
 *   update(idx)((s: boolean) => !s)(settings)
 * toggleSetting(1)  // [true, true, true, false]
 *
 * // Text formatting
 * const words = ["hello", "world", "foo", "bar"]
 * update(1)((w: string) => `**${w}**`)(words)
 * // ["hello", "**world**", "foo", "bar"]
 *
 * // Null/undefined handling in array
 * update(1)((x: any) => x ?? "default")([1, null, 3])
 * // [1, "default", 3]
 *
 * // Complex state update
 * const state = [
 *   { id: 1, status: "pending", retries: 0 },
 *   { id: 2, status: "failed", retries: 2 },
 *   { id: 3, status: "success", retries: 0 }
 * ]
 * update(1)((item: any) => ({
 *   ...item,
 *   status: "pending",
 *   retries: item.retries + 1
 * }))(state)
 * // Retry the failed item
 *
 * // Mathematical transformation
 * const values = [1, 4, 9, 16, 25]
 * update(2)((x: number) => Math.sqrt(x))(values)
 * // [1, 4, 3, 16, 25]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Bounds-safe - Returns unchanged copy if index out of bounds
 * @property Negative-index - Supports negative indices from end
 */
const update = <T>(
	index: number,
) =>
(
	fn: (value: T) => T,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Handle negative index
	const actualIndex = index < 0 ? array.length + index : index

	// Check bounds
	if (actualIndex < 0 || actualIndex >= array.length) {
		return [...array]
	}

	// Create new array with updated element
	const result = [...array]
	result[actualIndex] = fn(array[actualIndex])

	return result
}

export default update
