import type { Value } from "../../../types/index.ts"

/**
 * Modifies a property value using a function
 * 
 * Creates a new object with the specified property's value transformed
 * by the provided function. If the property doesn't exist, the function
 * receives undefined. The original object is not modified (immutable).
 * 
 * @curried (prop) => (fn) => (obj) => result
 * @param prop - The property key to modify
 * @param fn - Function to transform the property value
 * @param obj - The object to modify
 * @returns A new object with the property value transformed
 * @example
 * ```typescript
 * // Basic value modification
 * modify("count")((n: number) => n + 1)({ count: 5, label: "Counter" })
 * // { count: 6, label: "Counter" }
 * 
 * modify("age")((n: number) => n * 2)({ name: "Alice", age: 30 })
 * // { name: "Alice", age: 60 }
 * 
 * // String transformation
 * modify("name")((s: string) => s.toUpperCase())({ 
 *   name: "bob", 
 *   id: 1 
 * })
 * // { name: "BOB", id: 1 }
 * 
 * modify("email")((s: string) => s.toLowerCase())({
 *   email: "USER@EXAMPLE.COM",
 *   id: 1
 * })
 * // { email: "user@example.com", id: 1 }
 * 
 * // Array modification
 * modify("items")((arr: Array<number>) => [...arr, 4])({
 *   items: [1, 2, 3],
 *   total: 6
 * })
 * // { items: [1, 2, 3, 4], total: 6 }
 * 
 * modify("tags")((tags: Array<string>) => 
 *   tags.filter(t => t !== "old")
 * )({
 *   tags: ["new", "old", "featured"],
 *   id: 1
 * })
 * // { tags: ["new", "featured"], id: 1 }
 * 
 * // Object modification
 * modify("config")((cfg: Record<string, any>) => ({
 *   ...cfg,
 *   updated: true
 * }))({
 *   config: { port: 3000, host: "localhost" },
 *   name: "app"
 * })
 * // { config: { port: 3000, host: "localhost", updated: true }, name: "app" }
 * 
 * // Missing property - function receives undefined
 * modify("missing")((val: any) => val || "default")({
 *   a: 1,
 *   b: 2
 * })
 * // { a: 1, b: 2, missing: "default" }
 * 
 * // Conditional modification
 * modify("status")((status: string) => 
 *   status === "pending" ? "processing" : status
 * )({
 *   id: 1,
 *   status: "pending"
 * })
 * // { id: 1, status: "processing" }
 * 
 * // Boolean toggling
 * modify("active")((val: boolean) => !val)({
 *   name: "Feature",
 *   active: true
 * })
 * // { name: "Feature", active: false }
 * 
 * // Symbol keys
 * const sym = Symbol("counter")
 * modify(sym)((n: number) => n * 10)({
 *   [sym]: 5,
 *   regular: "value"
 * })
 * // { [Symbol(counter)]: 50, regular: "value" }
 * 
 * // Practical use cases
 * 
 * // Shopping cart quantity update
 * const incrementQuantity = modify("quantity")((q: number) => q + 1)
 * const decrementQuantity = modify("quantity")((q: number) => Math.max(0, q - 1))
 * 
 * const cartItem = { id: 1, name: "Widget", quantity: 2, price: 10 }
 * incrementQuantity(cartItem) // { ..., quantity: 3, ... }
 * decrementQuantity(cartItem) // { ..., quantity: 1, ... }
 * 
 * // Price calculation with tax
 * const applyTax = (rate: number) => 
 *   modify("price")((price: number) => price * (1 + rate))
 * 
 * const product = { name: "Gadget", price: 100 }
 * applyTax(0.08)(product) // { name: "Gadget", price: 108 }
 * 
 * // Date manipulation
 * const extendDeadline = modify("deadline")((date: Date) => {
 *   const newDate = new Date(date)
 *   newDate.setDate(newDate.getDate() + 7)
 *   return newDate
 * })
 * 
 * const task = { 
 *   title: "Project", 
 *   deadline: new Date("2024-01-01") 
 * }
 * extendDeadline(task)
 * // { title: "Project", deadline: Date("2024-01-08") }
 * 
 * // Score tracking
 * const updateHighScore = modify("highScore")(
 *   (current: number) => (newScore: number) => 
 *     Math.max(current || 0, newScore)
 * )
 * 
 * const gameState = { level: 5, highScore: 1000 }
 * const updater = updateHighScore(gameState)
 * updater(1500) // Returns function that sets highScore to 1500
 * 
 * // Partial application for specific transformations
 * const double = (n: number) => n * 2
 * const doubleValue = modify("value")(double)
 * 
 * doubleValue({ value: 5 })    // { value: 10 }
 * doubleValue({ value: 15 })   // { value: 30 }
 * 
 * // Chaining modifications
 * const updateUser = (user: any) => {
 *   const incrementAge = modify("age")((a: number) => a + 1)
 *   const updateLastSeen = modify("lastSeen")(() => new Date())
 *   return updateLastSeen(incrementAge(user))
 * }
 * 
 * updateUser({ name: "Alice", age: 30, lastSeen: null })
 * // { name: "Alice", age: 31, lastSeen: Date(...) }
 * 
 * // Safe number operations
 * const safeIncrement = modify("counter")((val: any) => {
 *   const num = parseInt(val) || 0
 *   return num + 1
 * })
 * 
 * safeIncrement({ counter: "5" })     // { counter: 6 }
 * safeIncrement({ counter: null })    // { counter: 1 }
 * safeIncrement({})                   // { counter: 1 }
 * ```
 * @property Immutable - creates a new object, doesn't modify the original
 * @property Safe - handles missing properties gracefully
 * @property Flexible - transformation function can return any type
 */
const modify = <K extends string | symbol, V extends Value, R extends Value>(
	prop: K,
) => (
	fn: (value: V) => R,
) => <T extends Record<string | symbol, Value>>(
	obj: T,
): T & Record<K, R> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return { [prop]: fn(undefined as any) } as T & Record<K, R>
	}
	
	// Get current value (may be undefined)
	const currentValue = obj[prop] as V
	
	// Apply transformation and create new object
	return {
		...obj,
		[prop]: fn(currentValue),
	} as T & Record<K, R>
}

export default modify