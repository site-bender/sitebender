/**
 * Takes elements from the end while predicate is true
 *
 * Returns a new array containing elements from the end of the input array,
 * taking elements as long as the predicate returns true. Stops at the first
 * element (scanning from the end) where the predicate returns false. Useful
 * for extracting trailing elements that match a condition, suffix extraction,
 * or reverse filtering.
 *
 * @curried (predicate) => (array) => result
 * @param predicate - Function to test each element (from the end)
 * @param array - Array to take elements from
 * @returns New array with trailing elements that satisfy predicate
 * @example
 * ```typescript
 * // Take trailing numbers greater than 3
 * takeLastWhile((x: number) => x > 3)([1, 2, 5, 4, 6, 7])
 * // [4, 6, 7]
 *
 * // Take trailing truthy values
 * takeLastWhile(Boolean)([1, 2, 0, 3, 4, 5])
 * // [3, 4, 5]
 *
 * // Take trailing uppercase letters
 * takeLastWhile((s: string) => s === s.toUpperCase())(["hello", "WORLD", "FOO", "BAR"])
 * // ["WORLD", "FOO", "BAR"]
 *
 * // Take while ascending (from end)
 * const arr = [5, 3, 1, 2, 4, 6, 8]
 * let last = Infinity
 * takeLastWhile((x: number) => {
 *   const ascending = x < last
 *   last = x
 *   return ascending
 * })(arr)
 * // [2, 4, 6, 8]
 *
 * // Extract file extension parts
 * const path = ["home", "user", "documents", "file", "backup", "tar", "gz"]
 * takeLastWhile((s: string) => !s.includes("/") && s.length <= 3)(path)
 * // ["tar", "gz"]
 *
 * // Get trailing whitespace
 * const chars = ["h", "e", "l", "l", "o", " ", " ", "\n"]
 * takeLastWhile((c: string) => /\s/.test(c))(chars)
 * // [" ", " ", "\n"]
 *
 * // Extract closing tags
 * const tags = ["<div>", "<p>", "text", "</p>", "</div>", "</body>", "</html>"]
 * takeLastWhile((tag: string) => tag.startsWith("</"))(tags)
 * // ["</p>", "</div>", "</body>", "</html>"]
 *
 * // Get recent timestamps
 * const now = Date.now()
 * const timestamps = [
 *   now - 3600000,  // 1 hour ago
 *   now - 1800000,  // 30 min ago
 *   now - 900000,   // 15 min ago
 *   now - 300000    // 5 min ago
 * ]
 * takeLastWhile((t: number) => now - t < 1200000)(timestamps)  // Last 20 minutes
 * // [now - 900000, now - 300000]
 *
 * // Extract trailing zeros
 * takeLastWhile((x: number) => x === 0)([1, 2, 3, 0, 0, 0])
 * // [0, 0, 0]
 *
 * // Get suffix matching pattern
 * const words = ["apple", "table", "stable", "able", "ble", "le", "e"]
 * takeLastWhile((w: string) => w.endsWith("le"))(words)
 * // ["table", "stable", "able", "ble", "le"]
 *
 * // Extract trailing comments
 * const lines = [
 *   "code here",
 *   "more code",
 *   "// comment 1",
 *   "// comment 2",
 *   "// comment 3"
 * ]
 * takeLastWhile((line: string) => line.startsWith("//"))(lines)
 * // ["// comment 1", "// comment 2", "// comment 3"]
 *
 * // Take completed tasks from end
 * const tasks = [
 *   { id: 1, done: false },
 *   { id: 2, done: true },
 *   { id: 3, done: false },
 *   { id: 4, done: true },
 *   { id: 5, done: true }
 * ]
 * takeLastWhile((t: { done: boolean }) => t.done)(tasks)
 * // [{ id: 4, done: true }, { id: 5, done: true }]
 *
 * // Predicate false for all (returns empty)
 * takeLastWhile((x: number) => x > 10)([1, 2, 3, 4, 5])
 * // []
 *
 * // Predicate true for all (returns all)
 * takeLastWhile((x: number) => x < 10)([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 *
 * // Empty array
 * takeLastWhile((x: any) => true)([])
 * // []
 *
 * // Single element
 * takeLastWhile((x: number) => x > 5)([10])
 * // [10]
 *
 * takeLastWhile((x: number) => x > 5)([3])
 * // []
 *
 * // Handle null/undefined
 * takeLastWhile((x: any) => true)(null)       // []
 * takeLastWhile((x: any) => true)(undefined)  // []
 *
 * // Extract trailing punctuation
 * const tokens = ["Hello", "world", "!", "!", "?"]
 * takeLastWhile((t: string) => /[!?.]/.test(t))(tokens)
 * // ["!", "!", "?"]
 *
 * // Get recent log entries
 * type LogEntry = { timestamp: number; level: string }
 * const logs: LogEntry[] = [
 *   { timestamp: 1000, level: "info" },
 *   { timestamp: 2000, level: "error" },
 *   { timestamp: 3000, level: "info" },
 *   { timestamp: 4000, level: "info" }
 * ]
 * takeLastWhile((log: LogEntry) => log.level === "info")(logs)
 * // [{ timestamp: 3000, level: "info" }, { timestamp: 4000, level: "info" }]
 *
 * // Extract version suffix
 * const versionParts = ["2", "1", "3", "beta", "2"]
 * takeLastWhile((p: string) => isNaN(Number(p)) || p.includes("beta"))(versionParts)
 * // ["beta", "2"]
 *
 * // Get trailing similar items
 * const items = ["A", "B", "A", "C", "C", "C"]
 * takeLastWhile((x: string) => x === "C")(items)
 * // ["C", "C", "C"]
 *
 * // Extract decimal part
 * const digits = ["3", "1", "4", ".", "1", "5", "9"]
 * const afterDot = digits.lastIndexOf(".")
 * takeLastWhile((_: string, i: number) => i > afterDot)(digits)
 * // ["1", "5", "9"]
 *
 * // Take while increasing (from end)
 * const numbers = [10, 5, 2, 3, 6, 8, 9]
 * let prev = Infinity
 * takeLastWhile((n: number) => {
 *   if (n < prev) {
 *     prev = n
 *     return true
 *   }
 *   return false
 * })([...numbers].reverse()).reverse()
 * // [3, 6, 8, 9]
 *
 * // Get trailing flags
 * const args = ["command", "file.txt", "--verbose", "--debug", "--output"]
 * takeLastWhile((arg: string) => arg.startsWith("--"))(args)
 * // ["--verbose", "--debug", "--output"]
 *
 * // Extract outro
 * const sections = ["intro", "verse", "chorus", "verse", "outro", "credits"]
 * takeLastWhile((s: string) => s === "outro" || s === "credits")(sections)
 * // ["outro", "credits"]
 *
 * // Partial application for reusable filters
 * const takePositive = takeLastWhile((x: number) => x > 0)
 * takePositive([1, -2, 3, 4, 5])     // [3, 4, 5]
 * takePositive([-1, -2, -3])         // []
 * takePositive([1, 2, 3])            // [1, 2, 3]
 *
 * // Chain with other operations
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const lastEvens = takeLastWhile((x: number) => x % 2 === 0)(
 *   data.filter(x => x > 5)
 * )
 * // [6, 8, 10] from [6, 7, 8, 9, 10] → [8, 10]
 *
 * // CSV trailing empty cells
 * const row = ["data", "more", "info", "", "", ""]
 * takeLastWhile((cell: string) => cell === "")(row)
 * // ["", "", ""]
 *
 * // Get suffix after marker
 * const parts = ["prefix", "data", "MARKER", "suffix1", "suffix2", "suffix3"]
 * const afterMarker = parts.lastIndexOf("MARKER")
 * takeLastWhile((_: string, i: number) => i > afterMarker)(parts)
 * // ["suffix1", "suffix2", "suffix3"]
 *
 * // Temperature readings above threshold
 * const temps = [20, 22, 25, 28, 30, 32, 35]
 * takeLastWhile((t: number) => t > 25)(temps)
 * // [28, 30, 32, 35]
 *
 * // Stock prices in uptrend
 * const prices = [100, 95, 90, 92, 94, 96, 98]
 * let lastPrice = Infinity
 * takeLastWhile((p: number) => {
 *   const rising = p < lastPrice
 *   lastPrice = p
 *   return rising
 * })([...prices].reverse()).reverse()
 * // [92, 94, 96, 98]
 *
 * // URL segments after domain
 * const url = ["https:", "", "example.com", "api", "v2", "users", "123"]
 * takeLastWhile((s: string) => !s.includes("."))(url)
 * // ["api", "v2", "users", "123"]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Short-circuit - stops at first false predicate (from end)
 * @property Order-preserving - maintains original element order
 */
const takeLastWhile = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Start from the end and find where predicate becomes false
	let i = array.length - 1
	while (i >= 0 && predicate(array[i], i, array)) {
		i--
	}

	// Return elements from i+1 to end
	return array.slice(i + 1)
}

export default takeLastWhile
