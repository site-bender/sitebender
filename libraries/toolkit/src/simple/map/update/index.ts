/**
 * Updates a value in a Map using a function
 * 
 * Creates a new Map with the value at the specified key transformed by
 * the update function. If the key exists, the function receives the current
 * value and returns the new value. If the key doesn't exist, the function
 * receives undefined. This allows for conditional updates, increments,
 * transformations, and default value handling in an immutable way.
 * 
 * @curried (key) => (updater) => (map) => result
 * @param key - The key to update
 * @param updater - Function to transform the value
 * @param map - The Map to update
 * @returns A new Map with the updated value
 * @example
 * ```typescript
 * // Basic update of existing value
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92]
 * ])
 * update("Alice")((score = 0) => score + 5)(scores)
 * // Map { "Alice" => 90, "Bob" => 92 }
 * 
 * // Update non-existing key with default
 * update("Charlie")((score = 0) => score + 78)(scores)
 * // Map { "Alice" => 85, "Bob" => 92, "Charlie" => 78 }
 * 
 * // Increment counter
 * const counts = new Map([["clicks", 5]])
 * update("clicks")(n => (n || 0) + 1)(counts)
 * // Map { "clicks" => 6 }
 * 
 * // Initialize if missing
 * const empty = new Map<string, number>()
 * update("views")((v = 0) => v + 1)(empty)
 * // Map { "views" => 1 }
 * 
 * // Object value update
 * const users = new Map([
 *   [1, { name: "Alice", age: 30, active: true }]
 * ])
 * update(1)(user => user ? { ...user, age: user.age + 1 } : null)(users)
 * // Map { 1 => {name:"Alice", age:31, active:true} }
 * 
 * // Toggle boolean
 * const flags = new Map([
 *   ["feature1", true],
 *   ["feature2", false]
 * ])
 * update("feature2")(v => !v)(flags)
 * // Map { "feature1" => true, "feature2" => true }
 * 
 * // String concatenation
 * const messages = new Map([
 *   ["log", "Start"]
 * ])
 * update("log")(msg => msg ? `${msg} -> Process` : "Process")(messages)
 * // Map { "log" => "Start -> Process" }
 * 
 * // Array manipulation
 * const lists = new Map([
 *   ["items", [1, 2, 3]]
 * ])
 * update("items")(arr => arr ? [...arr, 4] : [4])(lists)
 * // Map { "items" => [1, 2, 3, 4] }
 * 
 * // Conditional update
 * const inventory = new Map([
 *   ["apples", 10],
 *   ["bananas", 5]
 * ])
 * update("apples")(count => {
 *   if (count && count > 0) return count - 1
 *   return count
 * })(inventory)
 * // Map { "apples" => 9, "bananas" => 5 }
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const state = new Map([
 *   ["counter", 0],
 *   ["lastUpdate", null]
 * ])
 * 
 * pipe(
 *   state,
 *   update("counter")(n => (n || 0) + 1),
 *   update("lastUpdate")(() => Date.now()),
 *   update("counter")(n => (n || 0) * 2)
 * )
 * // Map { "counter" => 2, "lastUpdate" => <timestamp> }
 * 
 * // Complex object updates
 * const products = new Map([
 *   ["p1", { name: "Apple", price: 1.99, stock: 50 }],
 *   ["p2", { name: "Banana", price: 0.59, stock: 100 }]
 * ])
 * 
 * const adjustPrice = (percentage: number) => (product: any) =>
 *   product ? { ...product, price: product.price * (1 + percentage / 100) } : null
 * 
 * update("p1")(adjustPrice(10))(products)
 * // Map with p1 price increased by 10%
 * 
 * // Accumulator pattern
 * const stats = new Map([
 *   ["total", 0],
 *   ["count", 0],
 *   ["average", 0]
 * ])
 * 
 * const addValue = (value: number) => (map: Map<string, number>) =>
 *   pipe(
 *     map,
 *     update("total")(t => (t || 0) + value),
 *     update("count")(c => (c || 0) + 1),
 *     update("average")(function(this: Map<string, number>) {
 *       const total = this.get("total") || 0
 *       const count = this.get("count") || 1
 *       return total / count
 *     })
 *   )
 * 
 * // Numeric keys
 * const numbered = new Map([
 *   [1, "one"],
 *   [2, "two"]
 * ])
 * update(2)(v => v ? v.toUpperCase() : "")(numbered)
 * // Map { 1 => "one", 2 => "TWO" }
 * 
 * // Date keys
 * const events = new Map([
 *   [new Date("2024-01-01"), "New Year"]
 * ])
 * const date = new Date("2024-01-01")
 * update(date)(v => v ? `${v}'s Day` : "Unknown")(events)
 * // Map { Date => "New Year's Day" }
 * 
 * // Symbol keys
 * const sym = Symbol("counter")
 * const symMap = new Map([[sym, 0]])
 * update(sym)(n => (n || 0) + 1)(symMap)
 * // Map { Symbol(counter) => 1 }
 * 
 * // Partial application patterns
 * const increment = <K>(key: K) => 
 *   update(key)((n: number = 0) => n + 1)
 * 
 * const decrement = <K>(key: K) =>
 *   update(key)((n: number = 0) => Math.max(0, n - 1))
 * 
 * const counters = new Map([["a", 5], ["b", 3]])
 * pipe(
 *   counters,
 *   increment("a"),
 *   decrement("b"),
 *   increment("c")  // Creates with value 1
 * )
 * // Map { "a" => 6, "b" => 2, "c" => 1 }
 * 
 * // Shopping cart pattern
 * const cart = new Map([
 *   ["apple", { quantity: 2, price: 1.99 }],
 *   ["banana", { quantity: 3, price: 0.59 }]
 * ])
 * 
 * const addToCart = (item: string, qty: number = 1, price: number) =>
 *   update(item)((current: any) => {
 *     if (current) {
 *       return { ...current, quantity: current.quantity + qty }
 *     }
 *     return { quantity: qty, price }
 *   })
 * 
 * addToCart("apple", 1, 1.99)(cart)
 * // Map with apple quantity = 3
 * addToCart("orange", 2, 2.49)(cart)
 * // Map with new orange entry
 * 
 * // State machine transitions
 * const states = new Map([
 *   ["status", "idle"],
 *   ["retries", 0]
 * ])
 * 
 * const transition = (nextStatus: string) => (map: Map<string, any>) => {
 *   const currentStatus = map.get("status")
 *   const validTransitions: Record<string, Array<string>> = {
 *     idle: ["loading", "error"],
 *     loading: ["success", "error"],
 *     success: ["idle"],
 *     error: ["idle", "loading"]
 *   }
 *   
 *   if (validTransitions[currentStatus]?.includes(nextStatus)) {
 *     return update("status")(() => nextStatus)(map)
 *   }
 *   return map
 * }
 * 
 * // Cache with TTL update
 * const cache = new Map([
 *   ["key1", { data: "value1", ttl: Date.now() + 60000 }]
 * ])
 * 
 * const refreshTTL = (key: string) =>
 *   update(key)((entry: any) => 
 *     entry ? { ...entry, ttl: Date.now() + 60000 } : null
 *   )
 * 
 * refreshTTL("key1")(cache)
 * // Map with refreshed TTL
 * 
 * // Version tracking
 * const document = new Map([
 *   ["content", "Hello"],
 *   ["version", 1],
 *   ["history", [] as Array<string>]
 * ])
 * 
 * const updateContent = (newContent: string) => (doc: Map<string, any>) =>
 *   pipe(
 *     doc,
 *     update("history")((h: Array<string> = []) => 
 *       [...h, doc.get("content") || ""]
 *     ),
 *     update("content")(() => newContent),
 *     update("version")((v: number = 0) => v + 1)
 *   )
 * 
 * updateContent("Hello World")(document)
 * // Map with updated content, incremented version, and history
 * 
 * // Rate limiting
 * const limits = new Map([
 *   ["api", { count: 0, resetAt: Date.now() + 3600000 }]
 * ])
 * 
 * const checkAndIncrement = (key: string) =>
 *   update(key)((limit: any) => {
 *     const now = Date.now()
 *     if (!limit || now > limit.resetAt) {
 *       return { count: 1, resetAt: now + 3600000 }
 *     }
 *     return { ...limit, count: limit.count + 1 }
 *   })
 * 
 * // Score aggregation
 * const scores = new Map([
 *   ["team1", { wins: 5, losses: 3 }],
 *   ["team2", { wins: 4, losses: 4 }]
 * ])
 * 
 * const recordResult = (team: string, won: boolean) =>
 *   update(team)((record: any = { wins: 0, losses: 0 }) => ({
 *     wins: record.wins + (won ? 1 : 0),
 *     losses: record.losses + (won ? 0 : 1)
 *   }))
 * 
 * recordResult("team1", true)(scores)
 * // Map with team1 wins = 6
 * 
 * // Lazy initialization
 * const lazyInit = <K, V>(key: K, initializer: () => V) =>
 *   update(key)((current: V | undefined) => 
 *     current !== undefined ? current : initializer()
 *   )
 * 
 * const config = new Map<string, any>()
 * lazyInit("settings", () => ({ 
 *   theme: "dark", 
 *   fontSize: 14 
 * }))(config)
 * // Map with initialized settings
 * 
 * // Type safety
 * const typed = new Map<string, number>([["a", 1]])
 * const result: Map<string, number> = update<string, number>("b")(
 *   (n = 0) => n + 2
 * )(typed)
 * // Map<string, number> { "a" => 1, "b" => 2 }
 * 
 * // Use in reducer
 * type State = Map<string, any>
 * type Action = 
 *   | { type: "INCREMENT"; key: string }
 *   | { type: "DECREMENT"; key: string }
 *   | { type: "OTHER" }
 * 
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "INCREMENT":
 *       return update(action.key)((n: number = 0) => n + 1)(state)
 *     case "DECREMENT":
 *       return update(action.key)((n: number = 0) => n - 1)(state)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Flexible - Handles both existing and non-existing keys
 */
const update = <K, V>(key: K) =>
	(updater: (value: V | undefined) => V) =>
		(map: Map<K, V>): Map<K, V> => {
			const result = new Map(map)
			const newValue = updater(map.get(key))
			result.set(key, newValue)
			return result
		}

export default update