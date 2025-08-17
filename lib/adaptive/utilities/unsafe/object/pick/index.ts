import type { Value } from "../../../../types/index.ts"

/**
 * Creates a new object with only the specified keys
 * 
 * Returns a shallow copy of the object containing only the specified keys.
 * The original object is not modified. Keys that don't exist in the source
 * object are ignored. Prototype properties are not included.
 * 
 * @curried (keys) => (obj) => result
 * @param keys - Array of keys to pick from the object
 * @param obj - The object to pick keys from
 * @returns A new object with only the specified keys
 * @example
 * ```typescript
 * // Basic usage
 * pick(["a", "b"])({ a: 1, b: 2, c: 3 }) // { a: 1, b: 2 }
 * pick(["x"])({ x: 10, y: 20 })          // { x: 10 }
 * pick(["a", "c"])({ a: 1, b: 2, c: 3 }) // { a: 1, c: 3 }
 * 
 * // Picking non-existent keys
 * pick(["d"])({ a: 1, b: 2, c: 3 })      // {}
 * pick(["x", "y"])({ a: 1 })             // {}
 * pick(["a", "z"])({ a: 1, b: 2 })       // { a: 1 }
 * 
 * // Empty keys array
 * pick([])({ a: 1, b: 2 })               // {}
 * 
 * // Nested objects (shallow operation)
 * pick(["user"])({ user: { name: "John" }, id: 1 }) // { user: { name: "John" } }
 * pick(["a"])({ a: { b: 2 }, c: 3 })     // { a: { b: 2 } }
 * 
 * // Partial application
 * const pickPublic = pick(["id", "name", "email"])
 * pickPublic({ id: 1, name: "John", email: "j@ex.com", password: "secret" })
 * // { id: 1, name: "John", email: "j@ex.com" }
 * 
 * const pickCoordinates = pick(["x", "y"])
 * pickCoordinates({ x: 10, y: 20, z: 30 }) // { x: 10, y: 20 }
 * pickCoordinates({ x: 5, y: 15, color: "red" }) // { x: 5, y: 15 }
 * ```
 * @property Result is always a new object (immutable operation)
 * @property Complementary to omit - pick(keys)(obj) keeps only specified keys
 */
const pick = <T extends Record<string, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(obj: T): Pick<T, K> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {} as Pick<T, K>
	}
	
	// Build result with only specified keys
	const result: Record<string, Value> = {}
	for (const key of keys) {
		if (Object.prototype.hasOwnProperty.call(obj, key as string)) {
			result[key as string] = obj[key]
		}
	}
	return result as Pick<T, K>
}

export default pick
