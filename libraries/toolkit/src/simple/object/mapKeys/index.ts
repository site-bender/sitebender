import type { Value } from "../../../types/index.ts"

/**
 * Maps a function over the keys of an object
 *
 * Creates a new object with the same values but with keys transformed
 * by the provided function. If the mapping function produces duplicate
 * keys, the last value wins. The original object is not modified.
 *
 * @pure
 * @immutable
 * @curried
 * @param fn - Function to transform each key
 * @param obj - The object whose keys to transform
 * @returns A new object with transformed keys
 * @example
 * ```typescript
 * // Basic usage
 * mapKeys((k: string) => k.toUpperCase())({ a: 1, b: 2 })
 * // { A: 1, B: 2 }
 *
 * // Add prefix
 * const addPrefix = mapKeys((k: string) => `user_${k}`)
 * addPrefix({ id: 1, name: "Alice" })
 * // { user_id: 1, user_name: "Alice" }
 *
 * // Camel to snake case
 * mapKeys((k: string) => k.replace(/([A-Z])/g, "_$1").toLowerCase())({
 *   firstName: "John",
 *   lastName: "Doe"
 * })
 * // { first_name: "John", last_name: "Doe" }
 *
 * // Duplicate keys - last wins
 * mapKeys((k: string) => k[0])({ apple: 1, apricot: 2, banana: 3 })
 * // { a: 2, b: 3 }
 *
 * // Edge cases
 * mapKeys((k: string) => k)({}) // {}
 * mapKeys((k: string) => k)(null) // {}
 * ```
 */
const mapKeys = <T extends Record<string | symbol, Value>>(
	fn: (key: string | symbol) => string | symbol,
) =>
(
	obj: T,
): Record<string | symbol, Value> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	return [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	].reduce(
		(acc, key) => ({ ...acc, [fn(key)]: obj[key] }),
		{} as Record<string | symbol, Value>,
	)
}

export default mapKeys
