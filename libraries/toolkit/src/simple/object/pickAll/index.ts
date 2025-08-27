import type { Value } from "../../../types/index.ts"

/**
 * Creates a new object with only the specified keys, including undefined for missing keys
 *
 * Like pick, but includes all requested keys in the result even if they
 * don't exist in the source object (as undefined). This ensures the result
 * always has a consistent shape with all requested properties present.
 * The original object is not modified.
 *
 * @param keys - Array of keys to include in the result
 * @param obj - The object to pick keys from
 * @returns A new object with all specified keys (missing ones as undefined)
 * @example
 * ```typescript
 * // Basic usage - includes missing keys as undefined
 * pickAll(["a", "b", "c"])({ a: 1, b: 2 })  // { a: 1, b: 2, c: undefined }
 * pickAll(["x", "y"])({ x: 10 })            // { x: 10, y: undefined }
 * 
 * // All requested keys always present
 * pickAll(["a", "b"])({})           // { a: undefined, b: undefined }
 * pickAll([])({ a: 1 })              // {}
 * 
 * // Preserves null vs undefined
 * pickAll(["a", "b"])({ a: null })  // { a: null, b: undefined }
 * 
 * // Partial application for API normalization
 * const normalizeUser = pickAll(["id", "name", "email"])
 * normalizeUser({ id: 1, name: "Alice" })  // { id: 1, name: "Alice", email: undefined }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const pickAll = <K extends string | symbol>(
	keys: Array<K>,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Record<K, Value | undefined> => {
	// Handle null/undefined gracefully
	const source = (!obj || typeof obj !== "object") ? {} : obj

	// Build result with all specified keys
	return keys.reduce((acc, key) => {
		// Always include the key, even if undefined
		return {
			...acc,
			[key]: source[key as keyof typeof source],
		}
	}, {} as Record<K, Value | undefined>)
}

export default pickAll