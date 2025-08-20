/**
 * Filters a Map based on a predicate function
 * 
 * Creates a new Map containing only the key-value pairs that satisfy the
 * predicate function. The predicate receives both the value and key for
 * each entry. This function is curried to allow partial application and
 * composition in functional pipelines.
 * 
 * @curried (predicate) => (map) => result
 * @param predicate - Function that returns true for entries to keep
 * @param map - The Map to filter
 * @returns A new Map with only entries that satisfy the predicate
 * @example
 * ```typescript
 * // Basic usage - filter by value
 * const scores = new Map([["Alice", 95], ["Bob", 72], ["Charlie", 88]])
 * const passingScores = filter((score: number) => score >= 80)
 * passingScores(scores)
 * // Map { "Alice" => 95, "Charlie" => 88 }
 * 
 * // Filter using both value and key
 * const data = new Map([
 *   ["user:1", { name: "Alice", age: 30 }],
 *   ["admin:1", { name: "Bob", age: 35 }],
 *   ["user:2", { name: "Charlie", age: 25 }]
 * ])
 * filter((value, key) => key.startsWith("user"))(data)
 * // Map { "user:1" => {...}, "user:2" => {...} }
 * 
 * // Filter by value properties
 * const users = new Map([
 *   [1, { name: "Alice", active: true }],
 *   [2, { name: "Bob", active: false }],
 *   [3, { name: "Charlie", active: true }]
 * ])
 * filter((user: any) => user.active)(users)
 * // Map { 1 => {name:"Alice", active:true}, 3 => {name:"Charlie", active:true} }
 * 
 * // Empty Map
 * filter((v: any) => v > 0)(new Map())
 * // Map {}
 * 
 * // No matches
 * const numbers = new Map([["a", 1], ["b", 2], ["c", 3]])
 * filter((n: number) => n > 10)(numbers)
 * // Map {}
 * 
 * // All match
 * const positive = new Map([["a", 1], ["b", 2], ["c", 3]])
 * filter((n: number) => n > 0)(positive)
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const inventory = new Map([
 *   ["apple", { count: 50, price: 1.99 }],
 *   ["banana", { count: 0, price: 0.59 }],
 *   ["orange", { count: 25, price: 2.49 }],
 *   ["grape", { count: 5, price: 3.99 }]
 * ])
 * 
 * pipe(
 *   inventory,
 *   filter((item: any) => item.count > 0),
 *   filter((item: any) => item.price < 3.00)
 * )
 * // Map { "apple" => {...}, "orange" => {...} }
 * 
 * // Partial application for reuse
 * const filterActive = filter((item: any) => item.active)
 * 
 * const sessions = new Map([
 *   ["sess1", { user: "Alice", active: true }],
 *   ["sess2", { user: "Bob", active: false }],
 *   ["sess3", { user: "Charlie", active: true }]
 * ])
 * filterActive(sessions)
 * // Map { "sess1" => {...}, "sess3" => {...} }
 * 
 * // Complex predicate with multiple conditions
 * const products = new Map([
 *   ["A", { category: "electronics", price: 199, inStock: true }],
 *   ["B", { category: "books", price: 29, inStock: false }],
 *   ["C", { category: "electronics", price: 99, inStock: true }],
 *   ["D", { category: "clothing", price: 59, inStock: true }]
 * ])
 * 
 * const affordableElectronics = filter((product: any, key: string) =>
 *   product.category === "electronics" &&
 *   product.price < 150 &&
 *   product.inStock
 * )
 * affordableElectronics(products)
 * // Map { "C" => {category:"electronics", price:99, inStock:true} }
 * 
 * // Filter by key pattern
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["app.version", "1.0.0"],
 *   ["_debug", true],
 *   ["_internal", "secret"],
 *   ["user.theme", "dark"]
 * ])
 * filter((_, key) => !key.startsWith("_"))(config)
 * // Map { "app.name" => "MyApp", "app.version" => "1.0.0", "user.theme" => "dark" }
 * 
 * // Number keys
 * const numMap = new Map([
 *   [1, "one"],
 *   [2, "two"],
 *   [3, "three"],
 *   [4, "four"],
 *   [5, "five"]
 * ])
 * filter((_, key) => key % 2 === 0)(numMap)
 * // Map { 2 => "two", 4 => "four" }
 * 
 * // Date filtering
 * const events = new Map([
 *   [new Date("2024-01-15"), "Meeting"],
 *   [new Date("2024-02-20"), "Conference"],
 *   [new Date("2024-03-10"), "Workshop"]
 * ])
 * const cutoff = new Date("2024-02-01")
 * filter((_, date) => date >= cutoff)(events)
 * // Map { Date("2024-02-20") => "Conference", Date("2024-03-10") => "Workshop" }
 * 
 * // Combining with other Map operations
 * const cache = new Map([
 *   ["cache:user:1", { data: "Alice", ttl: 100 }],
 *   ["cache:user:2", { data: "Bob", ttl: 0 }],
 *   ["temp:file:1", { data: "temp.txt", ttl: 50 }],
 *   ["cache:user:3", { data: "Charlie", ttl: 200 }]
 * ])
 * 
 * const validCache = pipe(
 *   cache,
 *   filter((_, key) => key.startsWith("cache:")),
 *   filter((value: any) => value.ttl > 0)
 * )
 * // Map { "cache:user:1" => {...}, "cache:user:3" => {...} }
 * 
 * // String value filtering
 * const translations = new Map([
 *   ["hello", "bonjour"],
 *   ["goodbye", ""],
 *   ["yes", "oui"],
 *   ["no", ""],
 *   ["please", "s'il vous plaît"]
 * ])
 * filter((trans: string) => trans.length > 0)(translations)
 * // Map { "hello" => "bonjour", "yes" => "oui", "please" => "s'il vous plaît" }
 * 
 * // Filter with index tracking
 * let index = 0
 * const indexed = new Map([["a", 10], ["b", 20], ["c", 30], ["d", 40]])
 * filter((value: number) => {
 *   const keep = index % 2 === 0
 *   index++
 *   return keep
 * })(indexed)
 * // Map { "a" => 10, "c" => 30 }
 * 
 * // Error handling in predicate
 * const safeFilter = filter((value: any) => {
 *   try {
 *     return JSON.parse(value).valid === true
 *   } catch {
 *     return false
 *   }
 * })
 * 
 * const jsonData = new Map([
 *   ["a", '{"valid": true}'],
 *   ["b", '{"valid": false}'],
 *   ["c", 'invalid json'],
 *   ["d", '{"valid": true}']
 * ])
 * safeFilter(jsonData)
 * // Map { "a" => '{"valid": true}', "d" => '{"valid": true}' }
 * 
 * // Threshold filtering
 * const measurements = new Map([
 *   ["sensor1", 23.5],
 *   ["sensor2", 19.8],
 *   ["sensor3", 25.1],
 *   ["sensor4", 18.2]
 * ])
 * const threshold = 20
 * filter((temp: number) => Math.abs(temp - threshold) <= 5)(measurements)
 * // Map { "sensor1" => 23.5, "sensor2" => 19.8, "sensor4" => 18.2 }
 * 
 * // Set operations via filtering
 * const allowlist = new Set(["alice", "bob", "charlie"])
 * const users = new Map([
 *   ["alice", { role: "admin" }],
 *   ["bob", { role: "user" }],
 *   ["eve", { role: "user" }],
 *   ["charlie", { role: "moderator" }]
 * ])
 * filter((_, key) => allowlist.has(key))(users)
 * // Map { "alice" => {...}, "bob" => {...}, "charlie" => {...} }
 * 
 * // Negation pattern
 * const not = <T>(pred: (v: T, k?: any) => boolean) =>
 *   (v: T, k?: any) => !pred(v, k)
 * 
 * const data = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * filter(not((n: number) => n % 2 === 0))(data)
 * // Map { "a" => 1, "c" => 3 }
 * 
 * // Type safety
 * const typed = new Map<string, number>([["a", 1], ["b", 2], ["c", 3]])
 * const filtered: Map<string, number> = filter<string, number>(
 *   (n) => n > 1
 * )(typed)
 * // Map<string, number> { "b" => 2, "c" => 3 }
 * 
 * // Use in reducer
 * type Action = { type: "FILTER"; predicate: (v: any, k: any) => boolean }
 * const reducer = (state: Map<string, any>, action: Action) => {
 *   switch (action.type) {
 *     case "FILTER":
 *       return filter(action.predicate)(state)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Flexible - Predicate receives both value and key
 */
const filter = <K, V>(
	predicate: (value: V, key: K) => boolean
) =>
	(map: Map<K, V>): Map<K, V> => {
		const result = new Map<K, V>()
		for (const [key, value] of map) {
			if (predicate(value, key)) {
				result.set(key, value)
			}
		}
		return result
	}

export default filter