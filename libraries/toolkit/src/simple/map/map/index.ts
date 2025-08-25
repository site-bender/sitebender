/**
 * Maps a function over the values of a Map
 *
 * Transforms each value in a Map by applying a function to it, creating
 * a new Map with the same keys but transformed values. The mapping function
 * receives both the value and key for each entry, allowing transformations
 * that can use key context. This is the fundamental operation for value
 * transformation while preserving the Map's structure.
 *
 * @curried (fn) => (map) => result
 * @param fn - Function to transform each value
 * @param map - The Map to transform
 * @returns A new Map with transformed values
 * @example
 * ```typescript
 * // Basic value transformation
 * const prices = new Map([
 *   ["apple", 1.99],
 *   ["banana", 0.59],
 *   ["orange", 2.49]
 * ])
 * const doublePrices = map((price: number) => price * 2)
 * doublePrices(prices)
 * // Map { "apple" => 3.98, "banana" => 1.18, "orange" => 4.98 }
 *
 * // Transform using both value and key
 * const inventory = new Map([
 *   ["apple", 10],
 *   ["banana", 5],
 *   ["orange", 8]
 * ])
 * map((count: number, item: string) => `${count} ${item}s`)(inventory)
 * // Map { "apple" => "10 apples", "banana" => "5 bananas", "orange" => "8 oranges" }
 *
 * // Object value transformation
 * const users = new Map([
 *   [1, { name: "Alice", age: 30 }],
 *   [2, { name: "Bob", age: 25 }],
 *   [3, { name: "Charlie", age: 35 }]
 * ])
 * map((user: any) => ({ ...user, age: user.age + 1 }))(users)
 * // Map { 1 => {name:"Alice", age:31}, 2 => {name:"Bob", age:26}, 3 => {name:"Charlie", age:36} }
 *
 * // String transformation
 * const codes = new Map([
 *   ["US", "united states"],
 *   ["UK", "united kingdom"],
 *   ["FR", "france"]
 * ])
 * map((name: string) => name.toUpperCase())(codes)
 * // Map { "US" => "UNITED STATES", "UK" => "UNITED KINGDOM", "FR" => "FRANCE" }
 *
 * // Boolean transformation
 * const permissions = new Map([
 *   ["read", "yes"],
 *   ["write", "no"],
 *   ["delete", "no"]
 * ])
 * map((value: string) => value === "yes")(permissions)
 * // Map { "read" => true, "write" => false, "delete" => false }
 *
 * // Array value transformation
 * const data = new Map([
 *   ["nums", [1, 2, 3]],
 *   ["letters", ["a", "b", "c"]],
 *   ["mixed", [1, "a", 2, "b"]]
 * ])
 * map((arr: Array<any>) => arr.length)(data)
 * // Map { "nums" => 3, "letters" => 3, "mixed" => 4 }
 *
 * // Empty Map
 * map((v: any) => v * 2)(new Map())
 * // Map {}
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92],
 *   ["Charlie", 78]
 * ])
 *
 * pipe(
 *   scores,
 *   map((score: number) => score / 100),
 *   map((decimal: number) => `${(decimal * 100).toFixed(1)}%`)
 * )
 * // Map { "Alice" => "85.0%", "Bob" => "92.0%", "Charlie" => "78.0%" }
 *
 * // Complex transformation with key usage
 * const config = new Map([
 *   ["timeout", "5000"],
 *   ["retries", "3"],
 *   ["debug", "true"]
 * ])
 *
 * map((value: string, key: string) => {
 *   switch(key) {
 *     case "timeout": return parseInt(value, 10)
 *     case "retries": return parseInt(value, 10)
 *     case "debug": return value === "true"
 *     default: return value
 *   }
 * })(config)
 * // Map { "timeout" => 5000, "retries" => 3, "debug" => true }
 *
 * // Partial application for reuse
 * const toUpperCase = map((s: string) => s.toUpperCase())
 * const toLowerCase = map((s: string) => s.toLowerCase())
 *
 * const names = new Map([
 *   [1, "Alice"],
 *   [2, "Bob"],
 *   [3, "Charlie"]
 * ])
 *
 * toUpperCase(names)
 * // Map { 1 => "ALICE", 2 => "BOB", 3 => "CHARLIE" }
 * toLowerCase(toUpperCase(names))
 * // Map { 1 => "alice", 2 => "bob", 3 => "charlie" }
 *
 * // Date transformations
 * const dates = new Map([
 *   ["created", new Date("2024-01-01")],
 *   ["modified", new Date("2024-02-15")],
 *   ["accessed", new Date("2024-03-20")]
 * ])
 * map((date: Date) => date.toISOString().split("T")[0])(dates)
 * // Map { "created" => "2024-01-01", "modified" => "2024-02-15", "accessed" => "2024-03-20" }
 *
 * // Calculation with index
 * const values = new Map([
 *   ["a", 10],
 *   ["b", 20],
 *   ["c", 30]
 * ])
 * let index = 0
 * map((val: number) => {
 *   const result = val * (index + 1)
 *   index++
 *   return result
 * })(values)
 * // Map { "a" => 10, "b" => 40, "c" => 90 }
 *
 * // Error handling in transformation
 * const jsonStrings = new Map([
 *   ["valid", '{"a": 1}'],
 *   ["invalid", 'not json'],
 *   ["another", '{"b": 2}']
 * ])
 *
 * map((str: string) => {
 *   try {
 *     return JSON.parse(str)
 *   } catch {
 *     return null
 *   }
 * })(jsonStrings)
 * // Map { "valid" => {a: 1}, "invalid" => null, "another" => {b: 2} }
 *
 * // Async-like transformation (still synchronous)
 * const urls = new Map([
 *   ["api", "/api/v1"],
 *   ["auth", "/auth"],
 *   ["users", "/users"]
 * ])
 * map((path: string) => `https://example.com${path}`)(urls)
 * // Map { "api" => "https://example.com/api/v1", ... }
 *
 * // Nested Map transformation
 * const nested = new Map([
 *   ["group1", new Map([["a", 1], ["b", 2]])],
 *   ["group2", new Map([["c", 3], ["d", 4]])]
 * ])
 * map((innerMap: Map<string, number>) => innerMap.size)(nested)
 * // Map { "group1" => 2, "group2" => 2 }
 *
 * // Conditional transformation
 * const statuses = new Map([
 *   ["server1", 200],
 *   ["server2", 404],
 *   ["server3", 500]
 * ])
 * map((status: number) => status < 400 ? "healthy" : "unhealthy")(statuses)
 * // Map { "server1" => "healthy", "server2" => "unhealthy", "server3" => "unhealthy" }
 *
 * // Type transformation
 * const mixed = new Map<string, string | number>([
 *   ["a", "hello"],
 *   ["b", 42],
 *   ["c", "world"]
 * ])
 * map((val: string | number) => String(val))(mixed)
 * // Map<string, string> { "a" => "hello", "b" => "42", "c" => "world" }
 *
 * // Accumulator pattern
 * const transactions = new Map([
 *   ["tx1", 100],
 *   ["tx2", -50],
 *   ["tx3", 75]
 * ])
 * let runningTotal = 0
 * map((amount: number) => {
 *   runningTotal += amount
 *   return runningTotal
 * })(transactions)
 * // Map { "tx1" => 100, "tx2" => 50, "tx3" => 125 }
 *
 * // Format transformation
 * const measurements = new Map([
 *   ["temperature", 23.456789],
 *   ["humidity", 65.123456],
 *   ["pressure", 1013.98765]
 * ])
 * map((val: number, key: string) => {
 *   const precision = key === "pressure" ? 1 : 2
 *   return val.toFixed(precision)
 * })(measurements)
 * // Map { "temperature" => "23.46", "humidity" => "65.12", "pressure" => "1014.0" }
 *
 * // Type safety
 * const typed = new Map<number, string>([
 *   [1, "one"],
 *   [2, "two"],
 *   [3, "three"]
 * ])
 * const lengths: Map<number, number> = map<number, string, number>(
 *   (s) => s.length
 * )(typed)
 * // Map<number, number> { 1 => 3, 2 => 3, 3 => 5 }
 *
 * // Use in reducer
 * type State = Map<string, number>
 * type Action = { type: "DOUBLE_ALL" }
 *
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "DOUBLE_ALL":
 *       return map((n: number) => n * 2)(state)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Functor-law - Satisfies identity and composition laws
 */
const map = <K, V, R>(
	fn: (value: V, key: K) => R,
) =>
(map: Map<K, V>): Map<K, R> => {
	const result = new Map<K, R>()
	for (const [key, value] of map) {
		result.set(key, fn(value, key))
	}
	return result
}

export default map
