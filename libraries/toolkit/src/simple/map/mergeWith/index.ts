/**
 * Merges Maps using a custom merge function for conflicting keys
 * 
 * Combines entries from multiple Maps into a new Map. When the same key
 * appears in multiple Maps, the provided merge function determines the
 * resulting value by receiving both the existing and new values. This
 * allows for sophisticated merging strategies like accumulation, deep
 * merging of objects, or custom conflict resolution.
 * 
 * @curried (mergeFn) => (...maps) => result
 * @param mergeFn - Function to merge values when keys conflict
 * @param maps - Maps to merge together
 * @returns A new Map with merged entries
 * @example
 * ```typescript
 * // Basic accumulation
 * const sum = (a: number, b: number) => a + b
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["b", 3], ["c", 4]])
 * mergeWith(sum)(map1, map2)
 * // Map { "a" => 1, "b" => 5, "c" => 4 }
 * 
 * // String concatenation
 * const concat = (a: string, b: string) => `${a}, ${b}`
 * const names1 = new Map([["team", "Alice"], ["lead", "Bob"]])
 * const names2 = new Map([["team", "Charlie"], ["member", "David"]])
 * mergeWith(concat)(names1, names2)
 * // Map { "team" => "Alice, Charlie", "lead" => "Bob", "member" => "David" }
 * 
 * // Array accumulation
 * const combine = (a: Array<any>, b: Array<any>) => [...a, ...b]
 * const tags1 = new Map([
 *   ["user1", ["admin", "active"]],
 *   ["user2", ["guest"]]
 * ])
 * const tags2 = new Map([
 *   ["user1", ["moderator"]],
 *   ["user3", ["new"]]
 * ])
 * mergeWith(combine)(tags1, tags2)
 * // Map { "user1" => ["admin", "active", "moderator"], "user2" => ["guest"], "user3" => ["new"] }
 * 
 * // Object deep merge
 * const deepMerge = (a: any, b: any) => ({ ...a, ...b })
 * const config1 = new Map([
 *   ["app", { name: "MyApp", version: "1.0" }],
 *   ["db", { host: "localhost" }]
 * ])
 * const config2 = new Map([
 *   ["app", { version: "1.1", debug: true }],
 *   ["api", { url: "https://api.example.com" }]
 * ])
 * mergeWith(deepMerge)(config1, config2)
 * // Map { "app" => {name:"MyApp", version:"1.1", debug:true}, "db" => {host:"localhost"}, "api" => {url:"..."} }
 * 
 * // Multiple Maps
 * const multiply = (a: number, b: number) => a * b
 * const m1 = new Map([["x", 2], ["y", 3]])
 * const m2 = new Map([["x", 5], ["z", 7]])
 * const m3 = new Map([["x", 11], ["y", 13]])
 * mergeWith(multiply)(m1, m2, m3)
 * // Map { "x" => 110 (2*5*11), "y" => 39 (3*13), "z" => 7 }
 * 
 * // Maximum value selection
 * const max = (a: number, b: number) => Math.max(a, b)
 * const scores1 = new Map([["Alice", 85], ["Bob", 92]])
 * const scores2 = new Map([["Alice", 90], ["Charlie", 88]])
 * const scores3 = new Map([["Alice", 87], ["Bob", 95]])
 * mergeWith(max)(scores1, scores2, scores3)
 * // Map { "Alice" => 90, "Bob" => 95, "Charlie" => 88 }
 * 
 * // Minimum value selection
 * const min = (a: number, b: number) => Math.min(a, b)
 * const prices1 = new Map([["apple", 1.99], ["banana", 0.59]])
 * const prices2 = new Map([["apple", 1.79], ["orange", 2.49]])
 * mergeWith(min)(prices1, prices2)
 * // Map { "apple" => 1.79, "banana" => 0.59, "orange" => 2.49 }
 * 
 * // Boolean OR logic
 * const or = (a: boolean, b: boolean) => a || b
 * const perms1 = new Map([["read", true], ["write", false]])
 * const perms2 = new Map([["write", true], ["delete", false]])
 * mergeWith(or)(perms1, perms2)
 * // Map { "read" => true, "write" => true, "delete" => false }
 * 
 * // Boolean AND logic
 * const and = (a: boolean, b: boolean) => a && b
 * const flags1 = new Map([["feature1", true], ["feature2", true]])
 * const flags2 = new Map([["feature1", true], ["feature2", false]])
 * mergeWith(and)(flags1, flags2)
 * // Map { "feature1" => true, "feature2" => false }
 * 
 * // Count accumulation
 * const inventory1 = new Map([["apples", 10], ["oranges", 5]])
 * const inventory2 = new Map([["apples", 15], ["bananas", 8]])
 * const inventory3 = new Map([["oranges", 3], ["bananas", 12]])
 * mergeWith(sum)(inventory1, inventory2, inventory3)
 * // Map { "apples" => 25, "oranges" => 8, "bananas" => 20 }
 * 
 * // Custom resolution with type checking
 * const smartMerge = (a: any, b: any) => {
 *   if (typeof a === "number" && typeof b === "number") return a + b
 *   if (Array.isArray(a) && Array.isArray(b)) return [...a, ...b]
 *   if (typeof a === "object" && typeof b === "object") return { ...a, ...b }
 *   return b // default: take the new value
 * }
 * 
 * const mixed1 = new Map<string, any>([
 *   ["count", 5],
 *   ["items", ["a", "b"]],
 *   ["config", { x: 1 }]
 * ])
 * const mixed2 = new Map<string, any>([
 *   ["count", 3],
 *   ["items", ["c"]],
 *   ["config", { y: 2 }]
 * ])
 * mergeWith(smartMerge)(mixed1, mixed2)
 * // Map { "count" => 8, "items" => ["a","b","c"], "config" => {x:1, y:2} }
 * 
 * // Empty Maps
 * mergeWith(sum)(new Map(), new Map())
 * // Map {}
 * 
 * // Single Map
 * const single = new Map([["key", 42]])
 * mergeWith(sum)(single)
 * // Map { "key" => 42 }
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const datasets = [
 *   new Map([["a", [1, 2]], ["b", [3]]]),
 *   new Map([["a", [4]], ["c", [5, 6]]]),
 *   new Map([["b", [7, 8]], ["c", [9]]])
 * ]
 * 
 * pipe(
 *   mergeWith((a: Array<number>, b: Array<number>) => [...a, ...b])(...datasets),
 *   map((arr: Array<number>) => arr.reduce((sum, n) => sum + n, 0))
 * )
 * // Map { "a" => 7, "b" => 18, "c" => 20 }
 * 
 * // Partial application for specific strategies
 * const mergeByAddition = mergeWith((a: number, b: number) => a + b)
 * const mergeByMultiplication = mergeWith((a: number, b: number) => a * b)
 * const mergeByMaximum = mergeWith(Math.max)
 * 
 * const data1 = new Map([["x", 10], ["y", 20]])
 * const data2 = new Map([["x", 5], ["z", 30]])
 * 
 * mergeByAddition(data1, data2)       // Map { "x" => 15, "y" => 20, "z" => 30 }
 * mergeByMultiplication(data1, data2) // Map { "x" => 50, "y" => 20, "z" => 30 }
 * mergeByMaximum(data1, data2)        // Map { "x" => 10, "y" => 20, "z" => 30 }
 * 
 * // Set union
 * const unionSets = (a: Set<any>, b: Set<any>) => new Set([...a, ...b])
 * const tags1Map = new Map([
 *   ["doc1", new Set(["important", "draft"])],
 *   ["doc2", new Set(["published"])]
 * ])
 * const tags2Map = new Map([
 *   ["doc1", new Set(["reviewed"])],
 *   ["doc3", new Set(["archive"])]
 * ])
 * mergeWith(unionSets)(tags1Map, tags2Map)
 * // Map { "doc1" => Set{"important","draft","reviewed"}, "doc2" => Set{"published"}, "doc3" => Set{"archive"} }
 * 
 * // Average calculation
 * let counts = new Map<string, number>()
 * const average = (existing: number, incoming: number) => {
 *   const key = "current" // Would need to track per key in real implementation
 *   const count = (counts.get(key) || 1) + 1
 *   counts.set(key, count)
 *   return (existing * (count - 1) + incoming) / count
 * }
 * 
 * const readings1 = new Map([["sensor1", 20], ["sensor2", 25]])
 * const readings2 = new Map([["sensor1", 22], ["sensor2", 23]])
 * const readings3 = new Map([["sensor1", 21], ["sensor3", 30]])
 * 
 * // Note: This is simplified; real averaging would need state tracking
 * 
 * // Date comparison
 * const latest = (a: Date, b: Date) => a > b ? a : b
 * const dates1 = new Map([
 *   ["created", new Date("2024-01-01")],
 *   ["modified", new Date("2024-02-01")]
 * ])
 * const dates2 = new Map([
 *   ["modified", new Date("2024-03-01")],
 *   ["accessed", new Date("2024-04-01")]
 * ])
 * mergeWith(latest)(dates1, dates2)
 * // Map with latest dates for each key
 * 
 * // String formatting
 * const format = (a: string, b: string) => `[${a}|${b}]`
 * const labels1 = new Map([["btn", "Save"], ["title", "Form"]])
 * const labels2 = new Map([["btn", "Submit"], ["help", "Info"]])
 * mergeWith(format)(labels1, labels2)
 * // Map { "btn" => "[Save|Submit]", "title" => "Form", "help" => "Info" }
 * 
 * // Precedence with metadata
 * const withPrecedence = (a: any, b: any) => {
 *   if (b.priority > (a.priority || 0)) return b
 *   return a
 * }
 * const configs1 = new Map([
 *   ["setting", { value: "A", priority: 1 }]
 * ])
 * const configs2 = new Map([
 *   ["setting", { value: "B", priority: 2 }]
 * ])
 * mergeWith(withPrecedence)(configs1, configs2)
 * // Map { "setting" => {value:"B", priority:2} }
 * 
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1]])
 * const typed2 = new Map<string, number>([["a", 2], ["b", 3]])
 * const result: Map<string, number> = mergeWith<string, number>(
 *   (a, b) => a + b
 * )(typed1, typed2)
 * // Map<string, number> { "a" => 3, "b" => 3 }
 * 
 * // Use in reducer
 * type State = Map<string, number>
 * type Action = { 
 *   type: "MERGE_WITH_SUM"
 *   payload: Map<string, number>
 * }
 * 
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "MERGE_WITH_SUM":
 *       return mergeWith((a: number, b: number) => a + b)(state, action.payload)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - Creates new Map, doesn't modify originals
 * @property Customizable - User defines merge strategy for conflicts
 * @property Associative - Can merge any number of Maps left-to-right
 */
const mergeWith = <K, V>(
	mergeFn: (existingValue: V, incomingValue: V) => V
) =>
	(...maps: Array<Map<K, V>>): Map<K, V> => {
		const result = new Map<K, V>()
		for (const map of maps) {
			for (const [key, value] of map) {
				if (result.has(key)) {
					result.set(key, mergeFn(result.get(key)!, value))
				} else {
					result.set(key, value)
				}
			}
		}
		return result
	}

export default mergeWith