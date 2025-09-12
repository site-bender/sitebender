import type { Value } from "../../../types/index.ts"

/**
 * Inverts an object with a custom grouping function for keys with the same value
 *
 * Like invert, but when multiple keys map to the same value, they are grouped
 * together using a custom function. The grouping function receives an array of
 * all keys that map to the same value. This allows for preserving all mappings
 * instead of having later keys overwrite earlier ones.
 *
 * @pure
 * @immutable
 * @curried
 * @param fn - Function to group keys that map to the same value
 * @param obj - The object to invert
 * @returns A new object with values as keys and grouped original keys as values
 * @example
 * ```typescript
 * // Basic grouping - collect all keys in an array
 * invertBy((keys: Array<string | symbol>) => keys)({
 *   a: "x", b: "y", c: "x", d: "y"
 * })
 * // { x: ["a", "c"], y: ["b", "d"] }
 *
 * // Join keys as a string
 * invertBy((keys: Array<string | symbol>) => keys.join(", "))({
 *   small: 1, tiny: 1, large: 10, huge: 10
 * })
 * // { "1": "small, tiny", "10": "large, huge" }
 *
 * // Count occurrences
 * invertBy((keys: Array<string | symbol>) => keys.length)({
 *   a: 1, b: 2, c: 1, d: 1, e: 2
 * })
 * // { "1": 3, "2": 2 }
 *
 * // Group products by price
 * const products = { apple: 1.5, banana: 1.5, orange: 2, grape: 2, melon: 5 }
 * const byPrice = invertBy((keys: Array<string | symbol>) => keys)(products)
 * // { "1.5": ["apple", "banana"], "2": ["orange", "grape"], "5": ["melon"] }
 *
 * // Partial application for specific grouping strategies
 * const invertWithArray = invertBy((keys: Array<string | symbol>) => keys)
 * const invertWithFirst = invertBy((keys: Array<string | symbol>) => keys[0])
 * const data = { a: 1, b: 1, c: 2 }
 * invertWithArray(data)  // { "1": ["a", "b"], "2": ["c"] }
 * invertWithFirst(data)  // { "1": "a", "2": "c" }
 * ```
 */
const invertBy = <R extends Value>(
	fn: (keys: Array<string | symbol>) => R,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Record<string, R> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Group keys by their stringified values
	const groups = allKeys.reduce<Record<string, Array<string | symbol>>>(
		(acc, key) => {
			const value = obj[key]
			const valueKey = String(value)
			return {
				...acc,
				[valueKey]: [...(acc[valueKey] || []), key],
			}
		},
		{},
	)

	// Apply the grouping function to each group
	return Object.entries(groups).reduce<Record<string, R>>(
		(acc, [valueKey, keys]) => ({
			...acc,
			[valueKey]: fn(keys),
		}),
		{},
	)
}

export default invertBy
