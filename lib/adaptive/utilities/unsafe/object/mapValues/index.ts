import type { Value } from "../../../../types/index.ts"

/**
 * Maps a function over all values in an object, preserving keys
 * 
 * Transforms each value in an object by applying a function, while keeping
 * the same keys. Creates a new object with the same keys but transformed values.
 * Useful for bulk transformations of object values.
 * 
 * @curried (fn) => (obj) => result
 * @param fn - Function to apply to each value
 * @param obj - Object whose values will be transformed
 * @returns A new object with same keys but transformed values
 * @example
 * ```typescript
 * // Simple transformation
 * mapValues((x: number) => x * 2)({ a: 1, b: 2, c: 3 })
 * // { a: 2, b: 4, c: 6 }
 * 
 * // String transformation
 * mapValues((s: string) => s.toUpperCase())({
 *   first: "hello",
 *   last: "world"
 * })
 * // { first: "HELLO", last: "WORLD" }
 * 
 * // With mixed types (using Value union)
 * mapValues((v: Value) => typeof v)({
 *   name: "Alice",
 *   age: 30,
 *   active: true
 * })
 * // { name: "string", age: "number", active: "boolean" }
 * 
 * // Nested object transformation
 * mapValues((user: { name: string; age: number }) => user.name)({
 *   user1: { name: "Alice", age: 30 },
 *   user2: { name: "Bob", age: 25 }
 * })
 * // { user1: "Alice", user2: "Bob" }
 * 
 * // Using index in transformation
 * const withIndex = <T, R>(fn: (val: T, key: string) => R) =>
 *   (obj: Record<string, T>) => {
 *     const result: Record<string, R> = {}
 *     for (const key in obj) {
 *       if (Object.prototype.hasOwnProperty.call(obj, key)) {
 *         result[key] = fn(obj[key], key)
 *       }
 *     }
 *     return result
 *   }
 * 
 * withIndex((val: number, key) => `${key}: ${val}`)({
 *   a: 1, b: 2, c: 3
 * })
 * // { a: "a: 1", b: "b: 2", c: "c: 3" }
 * 
 * // Partial application for reusable transformers
 * const doubleValues = mapValues((x: number) => x * 2)
 * doubleValues({ x: 10, y: 20 })  // { x: 20, y: 40 }
 * doubleValues({ a: 5, b: 15 })   // { a: 10, b: 30 }
 * 
 * // Handle null/undefined gracefully
 * mapValues((x: number) => x + 1)(null)       // {}
 * mapValues((x: number) => x + 1)(undefined)  // {}
 * 
 * // Preserve symbols
 * const sym = Symbol("key")
 * mapValues((x: number) => x * 3)({ a: 1, [sym]: 2 })
 * // { a: 3, [sym]: 6 }
 * ```
 * @property Immutable - returns new object, doesn't modify original
 * @property Type-flexible - works with any value types
 * @property Symbol support - preserves symbol keys
 */
const mapValues = <T extends Value, R extends Value>(
	fn: (value: T) => R
) => <K extends string | symbol>(
	obj: Record<K, T> | null | undefined
): Record<K, R> => {
	if (obj == null || typeof obj !== "object") {
		return {} as Record<K, R>
	}
	
	// Get all keys (both string and symbol)
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj)
	]
	
	// Use reduce to build the result object
	return allKeys.reduce((acc, key) => ({
		...acc,
		[key]: fn((obj as Record<string | symbol, T>)[key])
	}), {} as Record<K, R>)
}

export default mapValues