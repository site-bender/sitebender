/**
 * Groups consecutive elements that satisfy a binary predicate
 * 
 * Takes a binary predicate function and creates groups of consecutive
 * elements where each adjacent pair satisfies the predicate. When the
 * predicate returns false for a pair, a new group is started. This is
 * useful for segmenting data, creating runs, or grouping related consecutive
 * items based on their relationship to each other.
 * 
 * @curried (predicate) => (array) => result
 * @param predicate - Binary function to test adjacent elements
 * @param array - Array to group
 * @returns Array of arrays, each containing consecutive related elements
 * @example
 * ```typescript
 * // Group consecutive equal elements
 * const equal = (a: number, b: number) => a === b
 * groupWith(equal)([1, 1, 2, 2, 2, 3, 1, 1])
 * // [[1, 1], [2, 2, 2], [3], [1, 1]]
 * 
 * // Group ascending sequences
 * const ascending = (a: number, b: number) => b >= a
 * groupWith(ascending)([1, 2, 3, 2, 3, 4, 1, 5])
 * // [[1, 2, 3], [2, 3, 4], [1, 5]]
 * 
 * // Group by difference threshold
 * const closeEnough = (a: number, b: number) => Math.abs(b - a) <= 2
 * groupWith(closeEnough)([1, 2, 4, 7, 8, 10, 15])
 * // [[1, 2, 4], [7, 8, 10], [15]]
 * 
 * // Group strings by first letter
 * const sameFirstLetter = (a: string, b: string) => 
 *   a[0] === b[0]
 * groupWith(sameFirstLetter)(["apple", "apricot", "banana", "berry", "cherry", "cranberry"])
 * // [["apple", "apricot"], ["banana", "berry"], ["cherry", "cranberry"]]
 * 
 * // Group by same sign
 * const sameSign = (a: number, b: number) => 
 *   (a >= 0 && b >= 0) || (a < 0 && b < 0)
 * groupWith(sameSign)([1, 2, -1, -3, -2, 4, 5, -6])
 * // [[1, 2], [-1, -3, -2], [4, 5], [-6]]
 * 
 * // Group by property equality
 * type Item = { category: string; value: number }
 * const sameCategory = (a: Item, b: Item) => a.category === b.category
 * const items: Item[] = [
 *   { category: "A", value: 1 },
 *   { category: "A", value: 2 },
 *   { category: "B", value: 3 },
 *   { category: "B", value: 4 },
 *   { category: "A", value: 5 }
 * ]
 * groupWith(sameCategory)(items)
 * // [
 * //   [{ category: "A", value: 1 }, { category: "A", value: 2 }],
 * //   [{ category: "B", value: 3 }, { category: "B", value: 4 }],
 * //   [{ category: "A", value: 5 }]
 * // ]
 * 
 * // Group consecutive dates within same month
 * const sameMonth = (a: Date, b: Date) => 
 *   a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
 * const dates = [
 *   new Date("2024-01-15"),
 *   new Date("2024-01-20"),
 *   new Date("2024-02-01"),
 *   new Date("2024-02-15"),
 *   new Date("2024-01-25")
 * ]
 * groupWith(sameMonth)(dates)
 * // [
 * //   [Date("2024-01-15"), Date("2024-01-20")],
 * //   [Date("2024-02-01"), Date("2024-02-15")],
 * //   [Date("2024-01-25")]
 * // ]
 * 
 * // Group by string length
 * const sameLength = (a: string, b: string) => a.length === b.length
 * groupWith(sameLength)(["a", "b", "cc", "dd", "eee", "fff", "g"])
 * // [["a", "b"], ["cc", "dd"], ["eee", "fff"], ["g"]]
 * 
 * // Group monotonic sequences
 * const monotonic = (a: number, b: number) => b > a
 * groupWith(monotonic)([1, 3, 5, 4, 6, 8, 7, 9])
 * // [[1, 3, 5], [4, 6, 8], [7, 9]]
 * 
 * // Group by type
 * const sameType = (a: any, b: any) => typeof a === typeof b
 * groupWith(sameType)([1, 2, "hello", "world", true, false, 42])
 * // [[1, 2], ["hello", "world"], [true, false], [42]]
 * 
 * // Single element
 * groupWith((a, b) => a === b)([1])
 * // [[1]]
 * 
 * // Empty array
 * groupWith((a, b) => a === b)([])
 * // []
 * 
 * // All in one group
 * const alwaysTrue = () => true
 * groupWith(alwaysTrue)([1, 2, 3, 4, 5])
 * // [[1, 2, 3, 4, 5]]
 * 
 * // Each in separate group
 * const alwaysFalse = () => false
 * groupWith(alwaysFalse)([1, 2, 3, 4, 5])
 * // [[1], [2], [3], [4], [5]]
 * 
 * // Group consecutive whitespace
 * const bothWhitespace = (a: string, b: string) => 
 *   /\s/.test(a) && /\s/.test(b)
 * groupWith(bothWhitespace)(["a", " ", "\t", "\n", "b", " ", "c"])
 * // [["a"], [" ", "\t", "\n"], ["b"], [" "], ["c"]]
 * 
 * // Group by divisibility
 * const sameDivisibility = (a: number, b: number) => 
 *   (a % 3 === 0) === (b % 3 === 0)
 * groupWith(sameDivisibility)([3, 6, 9, 4, 5, 12, 15, 7])
 * // [[3, 6, 9], [4, 5], [12, 15], [7]]
 * 
 * // Time-based grouping (within 5 minutes)
 * const within5Min = (a: Date, b: Date) => 
 *   Math.abs(b.getTime() - a.getTime()) <= 5 * 60 * 1000
 * const times = [
 *   new Date("2024-01-01T10:00"),
 *   new Date("2024-01-01T10:03"),
 *   new Date("2024-01-01T10:07"),
 *   new Date("2024-01-01T10:15"),
 *   new Date("2024-01-01T10:18")
 * ]
 * groupWith(within5Min)(times)
 * // [
 * //   [Date("10:00"), Date("10:03"), Date("10:07")],
 * //   [Date("10:15"), Date("10:18")]
 * // ]
 * 
 * // Case-insensitive grouping
 * const sameCase = (a: string, b: string) => 
 *   (a === a.toUpperCase()) === (b === b.toUpperCase())
 * groupWith(sameCase)(["HELLO", "WORLD", "hello", "world", "GOODBYE"])
 * // [["HELLO", "WORLD"], ["hello", "world"], ["GOODBYE"]]
 * 
 * // Partial application for reusable groupers
 * const groupByEquality = groupWith((a: any, b: any) => a === b)
 * groupByEquality([1, 1, 2, 2, 3])
 * // [[1, 1], [2, 2], [3]]
 * 
 * const groupAscending = groupWith((a: number, b: number) => b > a)
 * groupAscending([1, 3, 2, 4, 3, 5])
 * // [[1, 3], [2, 4], [3, 5]]
 * 
 * // Handle null/undefined gracefully
 * groupWith((a, b) => a === b)(null)       // []
 * groupWith((a, b) => a === b)(undefined)  // []
 * 
 * // Complex business logic
 * type Transaction = { amount: number; type: "credit" | "debit" }
 * const sameTransactionType = (a: Transaction, b: Transaction) => 
 *   a.type === b.type
 * const transactions: Transaction[] = [
 *   { amount: 100, type: "credit" },
 *   { amount: 50, type: "credit" },
 *   { amount: 75, type: "debit" },
 *   { amount: 25, type: "debit" },
 *   { amount: 200, type: "credit" }
 * ]
 * groupWith(sameTransactionType)(transactions)
 * // [
 * //   [{ amount: 100, type: "credit" }, { amount: 50, type: "credit" }],
 * //   [{ amount: 75, type: "debit" }, { amount: 25, type: "debit" }],
 * //   [{ amount: 200, type: "credit" }]
 * // ]
 * 
 * // Run-length encoding preparation
 * const chars = ["a", "a", "b", "b", "b", "c", "a", "a"]
 * const grouped = groupWith((a: string, b: string) => a === b)(chars)
 * // [["a", "a"], ["b", "b", "b"], ["c"], ["a", "a"]]
 * const encoded = grouped.map(g => `${g[0]}${g.length}`)
 * // ["a2", "b3", "c1", "a2"]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Consecutive - only groups adjacent elements
 * @property Binary-predicate - uses relationship between pairs
 */
const groupWith = <T>(
	predicate: (a: T, b: T) => boolean
) => (
	array: ReadonlyArray<T> | null | undefined
): Array<Array<T>> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}
	
	const result: Array<Array<T>> = []
	let currentGroup: Array<T> = [array[0]]
	
	for (let i = 1; i < array.length; i++) {
		if (predicate(array[i - 1], array[i])) {
			// Continue current group
			currentGroup.push(array[i])
		} else {
			// Start new group
			result.push(currentGroup)
			currentGroup = [array[i]]
		}
	}
	
	// Don't forget the last group
	result.push(currentGroup)
	
	return result
}

export default groupWith