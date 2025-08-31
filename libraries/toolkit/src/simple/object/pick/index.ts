import type { Value } from "../../../types/index.ts"

/**
 * Creates a new object with only the specified keys
 *
 * Returns a shallow copy of the object containing only the specified keys.
 * The original object is not modified. Keys that don't exist in the source
 * object are ignored. Prototype properties are not included.
 *
 * @param keys - Array of keys to pick from the object
 * @param obj - The object to pick keys from
 * @returns A new object with only the specified keys
 * @example
 * ```typescript
 * // Basic usage
 * pick(["a", "b"])({ a: 1, b: 2, c: 3 })  // { a: 1, b: 2 }
 * pick(["x", "y"])({ x: 10, y: 20, z: 30 })  // { x: 10, y: 20 }
 *
 * // Non-existent keys are ignored
 * pick(["a", "z"])({ a: 1, b: 2 })  // { a: 1 }
 * pick([])({ a: 1, b: 2 })           // {}
 *
 * // Partial application
 * const pickPublic = pick(["id", "name"])
 * pickPublic({ id: 1, name: "John", password: "secret" })  // { id: 1, name: "John" }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const pick = <T extends Record<string, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(obj: T): Pick<T, K> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {} as Pick<T, K>
	}

	// Build result with only specified keys using reduce
	return keys.reduce((acc, key) => {
		if (Object.prototype.hasOwnProperty.call(obj, key as string)) {
			return {
				...acc,
				[key as string]: obj[key],
			}
		}
		return acc
	}, {} as Pick<T, K>)
}

export default pick
