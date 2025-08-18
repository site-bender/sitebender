import type { Value } from "../../../../types/index.ts"
import path from "../path/index.ts"
import assocPath from "../assocPath/index.ts"

/**
 * Modifies a nested property value using a function
 * 
 * Creates a new object with the value at the specified path transformed
 * by the provided function. Creates any missing intermediate objects along
 * the path. If the path doesn't exist, the function receives undefined.
 * The original object and all nested objects are not modified (immutable).
 * 
 * @curried (pathArray) => (fn) => (obj) => result
 * @param pathArray - Array of keys representing the path to the property
 * @param fn - Function to transform the value at the path
 * @param obj - The object to modify
 * @returns A new object with the nested value transformed
 * @example
 * ```typescript
 * // Basic nested modification
 * modifyPath(["user", "age"])((age: number) => age + 1)({
 *   user: { name: "Alice", age: 30 }
 * })
 * // { user: { name: "Alice", age: 31 } }
 * 
 * // Deep nesting
 * modifyPath(["a", "b", "c"])((n: number) => n * 2)({
 *   a: { b: { c: 5, d: 10 }, e: 15 }
 * })
 * // { a: { b: { c: 10, d: 10 }, e: 15 } }
 * 
 * // String transformation
 * modifyPath(["profile", "email"])((email: string) => email.toLowerCase())({
 *   profile: { 
 *     name: "Bob", 
 *     email: "BOB@EXAMPLE.COM" 
 *   }
 * })
 * // { profile: { name: "Bob", email: "bob@example.com" } }
 * 
 * // Array at path
 * modifyPath(["data", "items"])((items: Array<number>) => 
 *   items.map(x => x * 2)
 * )({
 *   data: { items: [1, 2, 3], total: 6 }
 * })
 * // { data: { items: [2, 4, 6], total: 6 } }
 * 
 * // Path doesn't exist - function receives undefined
 * modifyPath(["missing", "nested"])((val: any) => val || "default")({
 *   existing: "value"
 * })
 * // { existing: "value", missing: { nested: "default" } }
 * 
 * // Single element path (like modify)
 * modifyPath(["count"])((n: number) => n + 1)({
 *   count: 10,
 *   label: "Counter"
 * })
 * // { count: 11, label: "Counter" }
 * 
 * // Empty path modifies entire object
 * modifyPath([])((obj: any) => ({ ...obj, modified: true }))({
 *   a: 1,
 *   b: 2
 * })
 * // { a: 1, b: 2, modified: true }
 * 
 * // Working with arrays in path
 * modifyPath(["users", 0, "score"])((score: number) => score + 10)({
 *   users: [
 *     { name: "Alice", score: 100 },
 *     { name: "Bob", score: 85 }
 *   ]
 * })
 * // { users: [{ name: "Alice", score: 110 }, { name: "Bob", score: 85 }] }
 * 
 * // Boolean toggling at path
 * modifyPath(["settings", "notifications", "enabled"])(
 *   (enabled: boolean) => !enabled
 * )({
 *   settings: {
 *     theme: "dark",
 *     notifications: { enabled: true, sound: true }
 *   }
 * })
 * // { settings: { theme: "dark", notifications: { enabled: false, sound: true } } }
 * 
 * // Complex object transformation
 * modifyPath(["metadata", "timestamps"])((timestamps: any) => ({
 *   ...timestamps,
 *   lastModified: Date.now()
 * }))({
 *   id: 1,
 *   metadata: {
 *     timestamps: { created: 1234567890 },
 *     version: "1.0"
 *   }
 * })
 * // Adds lastModified to timestamps while preserving all other data
 * 
 * // Practical use cases
 * 
 * // Shopping cart item quantity
 * const updateQuantity = (itemId: number, delta: number) =>
 *   modifyPath(["items", itemId, "quantity"])(
 *     (qty: number) => Math.max(0, (qty || 0) + delta)
 *   )
 * 
 * const cart = {
 *   items: [
 *     { name: "Widget", quantity: 2, price: 10 },
 *     { name: "Gadget", quantity: 1, price: 20 }
 *   ],
 *   total: 40
 * }
 * 
 * updateQuantity(0, 1)(cart)  // Increases Widget quantity to 3
 * updateQuantity(1, -1)(cart) // Decreases Gadget quantity to 0
 * 
 * // Form validation errors
 * const addError = (field: string, error: string) =>
 *   modifyPath(["errors", field])((errors: Array<string> = []) => 
 *     [...errors, error]
 *   )
 * 
 * const formState = {
 *   values: { email: "invalid" },
 *   errors: {}
 * }
 * 
 * addError("email", "Invalid format")(formState)
 * // { values: {...}, errors: { email: ["Invalid format"] } }
 * 
 * // Nested configuration updates
 * const updateTimeout = modifyPath(["server", "config", "timeout"])
 * const doubleTimeout = updateTimeout((t: number) => t * 2)
 * 
 * const config = {
 *   server: {
 *     config: { timeout: 5000, port: 3000 },
 *     status: "running"
 *   }
 * }
 * 
 * doubleTimeout(config)
 * // { server: { config: { timeout: 10000, port: 3000 }, status: "running" } }
 * 
 * // Score tracking in game state
 * const addPoints = (playerId: string, points: number) =>
 *   modifyPath(["players", playerId, "score"])(
 *     (current: number = 0) => current + points
 *   )
 * 
 * const gameState = {
 *   players: {
 *     alice: { score: 100, lives: 3 },
 *     bob: { score: 150, lives: 2 }
 *   },
 *   level: 5
 * }
 * 
 * addPoints("alice", 50)(gameState)
 * // Updates Alice's score to 150
 * 
 * // Partial application for common paths
 * const modifyUserEmail = modifyPath(["user", "contact", "email"])
 * const normalizeEmail = modifyUserEmail((email: string) => 
 *   email.trim().toLowerCase()
 * )
 * 
 * normalizeEmail({
 *   user: {
 *     name: "John",
 *     contact: { email: "  JOHN@EXAMPLE.COM  " }
 *   }
 * })
 * // { user: { name: "John", contact: { email: "john@example.com" } } }
 * 
 * // Safe arithmetic operations
 * const safeDivide = (divisor: number) =>
 *   modifyPath(["stats", "average"])((val: number = 0) => 
 *     divisor !== 0 ? val / divisor : val
 *   )
 * 
 * safeDivide(2)({ stats: { average: 100, count: 10 } })
 * // { stats: { average: 50, count: 10 } }
 * ```
 * @property Deep immutability - creates new objects at each level
 * @property Path creation - creates missing intermediate objects
 * @property Safe transformation - handles undefined values gracefully
 */
const modifyPath = <V extends Value, R extends Value>(
	pathArray: Array<string | number | symbol>,
) => (
	fn: (value: V) => R,
) => <T extends Record<string | symbol, Value>>(
	obj: T,
): Value => {
	// Empty path modifies the entire object
	if (pathArray.length === 0) {
		return fn(obj as any)
	}
	
	// Get current value at path (may be undefined)
	const currentValue = path(pathArray)(obj) as V
	
	// Apply transformation
	const newValue = fn(currentValue)
	
	// Set the new value at path
	return assocPath(pathArray)(newValue)(
		obj || {}
	)
}

export default modifyPath