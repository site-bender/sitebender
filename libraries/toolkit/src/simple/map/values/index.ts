/**
 * Returns an array of values from a Map
 *
 * Extracts all values from a Map and returns them as an array. The values
 * are returned in the same order as they appear in the Map's internal
 * iteration order (insertion order for Maps). This function is useful
 * for extracting values for further processing, aggregation, or conversion
 * to other data structures.
 *
 * @curried (map) => result
 * @param map - The Map to extract values from
 * @returns An array containing all values from the Map
 * @example
 * ```typescript
 * // Basic usage with string values
 * const userRoles = new Map([
 *   ["alice", "admin"],
 *   ["bob", "user"],
 *   ["charlie", "moderator"]
 * ])
 * values(userRoles)
 * // ["admin", "user", "moderator"]
 *
 * // Numeric values
 * const scores = new Map([
 *   ["team1", 95],
 *   ["team2", 87],
 *   ["team3", 92]
 * ])
 * values(scores)
 * // [95, 87, 92]
 *
 * // Object values
 * const users = new Map([
 *   [1, { name: "Alice", age: 30 }],
 *   [2, { name: "Bob", age: 25 }],
 *   [3, { name: "Charlie", age: 35 }]
 * ])
 * values(users)
 * // [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 35 }]
 *
 * // Mixed value types
 * const mixed = new Map<string, any>([
 *   ["a", 1],
 *   ["b", "two"],
 *   ["c", true],
 *   ["d", { value: 4 }]
 * ])
 * values(mixed)
 * // [1, "two", true, { value: 4 }]
 *
 * // Empty Map
 * values(new Map())
 * // []
 *
 * // Using with aggregation functions
 * const numbers = new Map([
 *   ["a", 10],
 *   ["b", 20],
 *   ["c", 30],
 *   ["d", 40]
 * ])
 * const sum = values(numbers).reduce((a, b) => a + b, 0)
 * // 100
 * const avg = sum / values(numbers).length
 * // 25
 *
 * // Using with pipe for transformation
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { filter } from "../filter/index.ts"
 *
 * const inventory = new Map([
 *   ["apple", 50],
 *   ["banana", 0],
 *   ["orange", 25],
 *   ["grape", 0]
 * ])
 *
 * pipe(
 *   inventory,
 *   filter((count: number) => count > 0),
 *   values
 * )
 * // [50, 25]
 *
 * // Extract and process object values
 * const products = new Map([
 *   ["p1", { name: "Apple", price: 1.99 }],
 *   ["p2", { name: "Banana", price: 0.59 }],
 *   ["p3", { name: "Orange", price: 2.49 }]
 * ])
 *
 * const prices = values(products).map(p => p.price)
 * // [1.99, 0.59, 2.49]
 * const totalPrice = prices.reduce((a, b) => a + b, 0)
 * // 5.07
 *
 * // Find min/max values
 * const temps = new Map([
 *   ["morning", 18],
 *   ["noon", 25],
 *   ["evening", 20],
 *   ["night", 15]
 * ])
 *
 * const allTemps = values(temps)
 * const minTemp = Math.min(...allTemps) // 15
 * const maxTemp = Math.max(...allTemps) // 25
 *
 * // Check value conditions
 * const statuses = new Map([
 *   ["server1", "active"],
 *   ["server2", "active"],
 *   ["server3", "inactive"]
 * ])
 *
 * const allActive = values(statuses).every(s => s === "active")
 * // false
 * const someActive = values(statuses).some(s => s === "active")
 * // true
 *
 * // Count occurrences
 * const items = new Map([
 *   ["id1", "apple"],
 *   ["id2", "banana"],
 *   ["id3", "apple"],
 *   ["id4", "orange"],
 *   ["id5", "banana"],
 *   ["id6", "apple"]
 * ])
 *
 * const frequency = values(items).reduce((acc, item) => {
 *   acc[item] = (acc[item] || 0) + 1
 *   return acc
 * }, {} as Record<string, number>)
 * // { apple: 3, banana: 2, orange: 1 }
 *
 * // Array values
 * const lists = new Map([
 *   ["evens", [2, 4, 6]],
 *   ["odds", [1, 3, 5]],
 *   ["primes", [2, 3, 5]]
 * ])
 * const allArrays = values(lists)
 * const flattened = allArrays.flat()
 * // [2, 4, 6, 1, 3, 5, 2, 3, 5]
 *
 * // Boolean values analysis
 * const permissions = new Map([
 *   ["read", true],
 *   ["write", false],
 *   ["delete", false],
 *   ["admin", true]
 * ])
 *
 * const perms = values(permissions)
 * const grantedCount = perms.filter(p => p).length
 * // 2
 * const deniedCount = perms.filter(p => !p).length
 * // 2
 *
 * // Date values
 * const events = new Map([
 *   ["start", new Date("2024-01-01")],
 *   ["middle", new Date("2024-06-15")],
 *   ["end", new Date("2024-12-31")]
 * ])
 *
 * const dates = values(events)
 * const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime())
 * // Dates in chronological order
 *
 * // Function values
 * const operations = new Map([
 *   ["add", (a: number, b: number) => a + b],
 *   ["multiply", (a: number, b: number) => a * b],
 *   ["subtract", (a: number, b: number) => a - b]
 * ])
 *
 * const ops = values(operations)
 * const results = ops.map(op => op(10, 5))
 * // [15, 50, 5]
 *
 * // Set values
 * const tagSets = new Map([
 *   ["doc1", new Set(["important", "draft"])],
 *   ["doc2", new Set(["published", "reviewed"])],
 *   ["doc3", new Set(["archive"])]
 * ])
 *
 * const sets = values(tagSets)
 * const allTags = new Set(sets.flatMap(s => Array.from(s)))
 * // Set { "important", "draft", "published", "reviewed", "archive" }
 *
 * // Nested Map values
 * const nested = new Map([
 *   ["group1", new Map([["a", 1], ["b", 2]])],
 *   ["group2", new Map([["c", 3], ["d", 4]])]
 * ])
 *
 * const innerMaps = values(nested)
 * const innerSizes = innerMaps.map(m => m.size)
 * // [2, 2]
 *
 * // String manipulation
 * const messages = new Map([
 *   ["error", "Something went wrong"],
 *   ["warning", "Check your input"],
 *   ["info", "Process completed"]
 * ])
 *
 * const msgs = values(messages)
 * const lengths = msgs.map(m => m.length)
 * // [20, 16, 17]
 * const combined = msgs.join(" | ")
 * // "Something went wrong | Check your input | Process completed"
 *
 * // Validation
 * const inputs = new Map([
 *   ["email", "user@example.com"],
 *   ["phone", "123-456-7890"],
 *   ["name", "Alice"]
 * ])
 *
 * const allValid = values(inputs).every(v => v && v.length > 0)
 * // true (all non-empty)
 *
 * // Statistical calculations
 * const dataset = new Map([
 *   ["s1", 10],
 *   ["s2", 20],
 *   ["s3", 15],
 *   ["s4", 25],
 *   ["s5", 30]
 * ])
 *
 * const data = values(dataset)
 * const mean = data.reduce((a, b) => a + b, 0) / data.length
 * const sorted = [...data].sort((a, b) => a - b)
 * const median = sorted[Math.floor(sorted.length / 2)]
 * // mean: 20, median: 20
 *
 * // Unique values
 * const redundant = new Map([
 *   ["a", "value1"],
 *   ["b", "value2"],
 *   ["c", "value1"],
 *   ["d", "value3"],
 *   ["e", "value2"]
 * ])
 *
 * const uniqueValues = [...new Set(values(redundant))]
 * // ["value1", "value2", "value3"]
 *
 * // Transformation chain
 * const raw = new Map([
 *   ["a", "  hello  "],
 *   ["b", "  WORLD  "],
 *   ["c", "  typescript  "]
 * ])
 *
 * const processed = values(raw)
 *   .map(s => s.trim())
 *   .map(s => s.toLowerCase())
 *   .map(s => s.charAt(0).toUpperCase() + s.slice(1))
 * // ["Hello", "World", "Typescript"]
 *
 * // Filtering after extraction
 * const mixed2 = new Map([
 *   ["a", 1],
 *   ["b", null],
 *   ["c", 3],
 *   ["d", undefined],
 *   ["e", 5]
 * ])
 *
 * const definedValues = values(mixed2).filter(v => v != null)
 * // [1, 3, 5]
 *
 * // Type safety
 * const typed = new Map<string, number>([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * const typedValues: Array<number> = values(typed)
 * // Array<number> [1, 2, 3]
 *
 * // Use with other Map operations
 * import { map } from "../map/index.ts"
 *
 * const original = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const doubled = pipe(
 *   original,
 *   map((v: number) => v * 2),
 *   values
 * )
 * // [2, 4, 6]
 *
 * // Use in reducer
 * type State = Map<string, any>
 * type Action = { type: "GET_VALUES" }
 *
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "GET_VALUES":
 *       return values(state)
 *     default:
 *       return state
 *   }
 * }
 *
 * // Performance with large Maps
 * const large = new Map(
 *   Array.from({length: 10000}, (_, i) => [`key${i}`, i])
 * )
 * const sample = values(large).slice(0, 10)
 * // First 10 values only
 *
 * // Async processing of values
 * const urls = new Map([
 *   ["api1", "https://api1.example.com"],
 *   ["api2", "https://api2.example.com"],
 *   ["api3", "https://api3.example.com"]
 * ])
 *
 * const endpoints = values(urls)
 * // Can be used with Promise.all for parallel fetching
 * ```
 * @property Pure - No side effects
 * @property Order-preserving - Maintains Map's iteration order
 * @property Type-safe - Preserves value type information
 */
const values = <K, V>(map: Map<K, V>): Array<V> => {
	return Array.from(map.values())
}

export default values
