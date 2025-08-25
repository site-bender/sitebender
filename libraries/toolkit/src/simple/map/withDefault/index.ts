/**
 * Wraps a Map to provide default values for missing keys
 *
 * Creates a proxy-like wrapper around a Map that returns a default value
 * when accessing keys that don't exist. The wrapper provides a modified
 * get method while maintaining all other Map operations. This is useful
 * for configuration objects, counters, accumulators, and avoiding null
 * checks. The original Map remains unchanged.
 *
 * @curried (defaultValue) => (map) => wrappedMap
 * @param defaultValue - Value to return for missing keys
 * @param map - The Map to wrap
 * @returns A new Map-like object with default value behavior
 * @example
 * ```typescript
 * // Basic usage with default value
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92]
 * ])
 * const scoresWithDefault = withDefault(0)(scores)
 *
 * scoresWithDefault.get("Alice")    // 85
 * scoresWithDefault.get("Charlie")  // 0 (default)
 * scoresWithDefault.has("Charlie")  // false (still reports correctly)
 *
 * // Counter with default
 * const counts = new Map<string, number>()
 * const counter = withDefault(0)(counts)
 *
 * // Can safely increment without checking
 * const increment = (key: string) => {
 *   const current = counter.get(key)  // Never undefined
 *   counter.set(key, current + 1)
 * }
 *
 * increment("clicks")  // Now clicks = 1
 * increment("clicks")  // Now clicks = 2
 * increment("views")   // Now views = 1
 *
 * // Configuration with defaults
 * const userConfig = new Map([
 *   ["theme", "dark"],
 *   ["fontSize", 16]
 * ])
 * const config = withDefault("default")(userConfig)
 *
 * config.get("theme")      // "dark"
 * config.get("language")   // "default"
 * config.get("timeout")    // "default"
 *
 * // Object default values
 * const users = new Map([
 *   [1, { name: "Alice", role: "admin" }],
 *   [2, { name: "Bob", role: "user" }]
 * ])
 * const usersWithDefault = withDefault({
 *   name: "Unknown",
 *   role: "guest"
 * })(users)
 *
 * usersWithDefault.get(1)  // { name: "Alice", role: "admin" }
 * usersWithDefault.get(99) // { name: "Unknown", role: "guest" }
 *
 * // Array default values
 * const lists = new Map([
 *   ["fruits", ["apple", "banana"]],
 *   ["vegetables", ["carrot", "lettuce"]]
 * ])
 * const listsWithDefault = withDefault([] as Array<string>)(lists)
 *
 * listsWithDefault.get("fruits")  // ["apple", "banana"]
 * listsWithDefault.get("grains")  // []
 *
 * // Function as default value
 * const operations = new Map([
 *   ["add", (a: number, b: number) => a + b],
 *   ["multiply", (a: number, b: number) => a * b]
 * ])
 * const opsWithDefault = withDefault(
 *   (a: number, b: number) => 0  // no-op function
 * )(operations)
 *
 * opsWithDefault.get("add")(5, 3)      // 8
 * opsWithDefault.get("divide")(10, 2)  // 0 (default function)
 *
 * // Accumulator pattern
 * const totals = new Map<string, number>()
 * const accumulator = withDefault(0)(totals)
 *
 * const addToTotal = (category: string, amount: number) => {
 *   accumulator.set(category, accumulator.get(category) + amount)
 * }
 *
 * addToTotal("sales", 100)
 * addToTotal("sales", 50)
 * addToTotal("refunds", -20)
 * // totals now has: sales => 150, refunds => -20
 *
 * // Chaining with other operations
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 *
 * const prices = new Map([
 *   ["apple", 1.99],
 *   ["banana", 0.59]
 * ])
 *
 * const pricesWithDefault = withDefault(0)(prices)
 * const getPrice = (item: string) => pricesWithDefault.get(item)
 *
 * getPrice("apple")   // 1.99
 * getPrice("orange")  // 0
 *
 * // Safe calculations
 * const calculateTotal = (items: Array<string>) =>
 *   items.reduce((sum, item) => sum + getPrice(item), 0)
 *
 * calculateTotal(["apple", "banana", "orange"])
 * // 2.58 (orange defaults to 0)
 *
 * // Nested Maps with defaults
 * const nestedData = new Map([
 *   ["user1", new Map([["score", 100], ["level", 5]])]
 * ])
 * const defaultUserData = new Map([["score", 0], ["level", 1]])
 * const safeNested = withDefault(defaultUserData)(nestedData)
 *
 * safeNested.get("user1")  // Map with actual data
 * safeNested.get("user2")  // Map with default data
 *
 * // Boolean flags with default
 * const features = new Map([
 *   ["darkMode", true],
 *   ["notifications", false]
 * ])
 * const featureFlags = withDefault(false)(features)
 *
 * if (featureFlags.get("darkMode")) {
 *   // Enable dark mode
 * }
 * if (featureFlags.get("betaFeature")) {
 *   // Won't execute (defaults to false)
 * }
 *
 * // Maintaining Map interface
 * const original = new Map([["a", 1], ["b", 2]])
 * const wrapped = withDefault(0)(original)
 *
 * // All Map methods still work
 * wrapped.set("c", 3)
 * wrapped.delete("a")
 * wrapped.has("b")        // true
 * wrapped.size            // 2
 * wrapped.clear()
 * Array.from(wrapped.keys())    // []
 * Array.from(wrapped.values())  // []
 *
 * // Type safety with generics
 * const typedMap = new Map<string, number>([
 *   ["x", 10],
 *   ["y", 20]
 * ])
 * const typedWithDefault = withDefault<string, number>(0)(typedMap)
 *
 * const value: number = typedWithDefault.get("z")  // Type-safe, always number
 *
 * // State management pattern
 * type State = {
 *   count: number
 *   message: string
 *   active: boolean
 * }
 *
 * const defaultState: State = {
 *   count: 0,
 *   message: "",
 *   active: false
 * }
 *
 * const stateMap = new Map<string, State>()
 * const state = withDefault(defaultState)(stateMap)
 *
 * const getState = (id: string): State => state.get(id)
 * const setState = (id: string, updates: Partial<State>) => {
 *   const current = state.get(id)
 *   state.set(id, { ...current, ...updates })
 * }
 *
 * // Cache with default factory
 * const cache = new Map<string, any>()
 * const cachedData = withDefault(null)(cache)
 *
 * const getCached = (key: string) => {
 *   const value = cachedData.get(key)
 *   if (value === null) {
 *     // Compute and cache
 *     const computed = expensiveOperation(key)
 *     cachedData.set(key, computed)
 *     return computed
 *   }
 *   return value
 * }
 *
 * // Rate limiting with defaults
 * const rateLimits = new Map<string, number>()
 * const limits = withDefault(100)(rateLimits)  // 100 requests default
 *
 * const checkLimit = (userId: string): boolean => {
 *   const remaining = limits.get(userId)
 *   if (remaining > 0) {
 *     limits.set(userId, remaining - 1)
 *     return true
 *   }
 *   return false
 * }
 *
 * // Score tracking with categories
 * const scoresByCategory = new Map<string, Map<string, number>>()
 * const defaultScores = new Map<string, number>()
 * const scores = withDefault(withDefault(0)(defaultScores))(scoresByCategory)
 *
 * const addScore = (category: string, item: string, points: number) => {
 *   const categoryScores = scores.get(category)
 *   categoryScores.set(item, categoryScores.get(item) + points)
 *   scores.set(category, categoryScores)
 * }
 *
 * // Partial application for different defaults
 * const withZero = withDefault(0)
 * const withEmptyString = withDefault("")
 * const withEmptyArray = withDefault([] as Array<any>)
 * const withFalse = withDefault(false)
 *
 * const numbers = withZero(new Map([["a", 1]]))
 * const strings = withEmptyString(new Map([["b", "text"]]))
 * const arrays = withEmptyArray(new Map([["c", [1, 2, 3]]]))
 * const booleans = withFalse(new Map([["d", true]]))
 *
 * // Lazy evaluation consideration
 * // Note: The default value is not lazily evaluated
 * // For expensive defaults, consider wrapping in a function
 * const expensiveDefault = () => computeExpensiveDefault()
 * const lazyMap = new Map<string, () => any>()
 * const lazyWithDefault = withDefault(expensiveDefault)(lazyMap)
 *
 * // Access pattern
 * const getValue = (key: string) => {
 *   const factory = lazyWithDefault.get(key)
 *   return factory()  // Evaluate when needed
 * }
 *
 * // Immutable-style updates
 * const data = new Map([["x", 5]])
 * const safe = withDefault(0)(data)
 *
 * const updateValue = (key: string, fn: (n: number) => number) => {
 *   const current = safe.get(key)
 *   const updated = fn(current)
 *   safe.set(key, updated)
 *   return safe
 * }
 *
 * updateValue("x", n => n * 2)  // x = 10
 * updateValue("y", n => n + 1)  // y = 1 (from default 0)
 *
 * // Note on implementation
 * // The returned object maintains Map interface but modifies get() behavior
 * // All other Map methods work as expected on the underlying Map
 * ```
 * @property Pure - Doesn't modify the original Map
 * @property Curried - Allows partial application
 * @property Safe - Eliminates undefined values from get()
 */
const withDefault = <K, V>(defaultValue: V) => (map: Map<K, V>): Map<K, V> => {
	// Create a new Map that extends the original
	const wrappedMap = new Map(map)

	// Store the original get method
	const originalGet = wrappedMap.get.bind(wrappedMap)

	// Override the get method to return default for missing keys
	wrappedMap.get = function (key: K): V {
		const value = originalGet(key)
		return value !== undefined ? value : defaultValue
	}

	return wrappedMap
}

export default withDefault
