import type { Value } from "../../../types/index.ts"

/**
 * Inverts an object with a custom grouping function for keys with the same value
 * 
 * Like invert, but when multiple keys map to the same value, they are grouped
 * together using a custom function. The grouping function receives an array of
 * all keys that map to the same value. This allows for preserving all mappings
 * instead of having later keys overwrite earlier ones.
 * 
 * @curried (fn) => (obj) => result
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
 * // Take only the first key (similar to regular invert but keeps first, not last)
 * invertBy((keys: Array<string | symbol>) => keys[0])({
 *   a: "x", b: "y", c: "x"
 * })
 * // { x: "a", y: "b" } (keeps first occurrence)
 * 
 * // Take the last key (exactly like regular invert)
 * invertBy((keys: Array<string | symbol>) => keys[keys.length - 1])({
 *   a: "x", b: "y", c: "x"
 * })
 * // { x: "c", y: "b" } (keeps last occurrence)
 * 
 * // Count occurrences
 * invertBy((keys: Array<string | symbol>) => keys.length)({
 *   a: 1, b: 2, c: 1, d: 1, e: 2
 * })
 * // { "1": 3, "2": 2 }
 * 
 * // Create an object with count and keys
 * invertBy((keys: Array<string | symbol>) => ({ 
 *   count: keys.length, 
 *   keys 
 * }))({
 *   read: "r", write: "w", execute: "x", read2: "r"
 * })
 * // { 
 * //   r: { count: 2, keys: ["read", "read2"] },
 * //   w: { count: 1, keys: ["write"] },
 * //   x: { count: 1, keys: ["execute"] }
 * // }
 * 
 * // Number values
 * invertBy((keys: Array<string | symbol>) => keys)({
 *   first: 1, second: 2, third: 1, fourth: 2
 * })
 * // { "1": ["first", "third"], "2": ["second", "fourth"] }
 * 
 * // Boolean values
 * invertBy((keys: Array<string | symbol>) => keys)({
 *   isActive: true, isEnabled: true, isDisabled: false, isHidden: false
 * })
 * // { "true": ["isActive", "isEnabled"], "false": ["isDisabled", "isHidden"] }
 * 
 * // Symbol keys
 * const sym1 = Symbol("sym1")
 * const sym2 = Symbol("sym2")
 * invertBy((keys: Array<string | symbol>) => keys)({
 *   [sym1]: "value", [sym2]: "value", regular: "value"
 * })
 * // { "value": [Symbol(sym1), Symbol(sym2), "regular"] }
 * 
 * // Practical use cases
 * 
 * // Group products by price
 * const products = { apple: 1.5, banana: 1.5, orange: 2, grape: 2, melon: 5 }
 * const byPrice = invertBy((keys: Array<string | symbol>) => keys)(products)
 * // { "1.5": ["apple", "banana"], "2": ["orange", "grape"], "5": ["melon"] }
 * 
 * // Find all status codes for each category
 * const httpCodes = {
 *   ok: 200, created: 201, accepted: 202,
 *   badRequest: 400, unauthorized: 401, forbidden: 403, notFound: 404
 * }
 * const codeGroups = invertBy((keys: Array<string | symbol>) => keys)(httpCodes)
 * // { "200": ["ok"], "201": ["created"], ... }
 * 
 * // Create reverse lookup with all alternatives
 * const synonyms = {
 *   happy: "joy", glad: "joy", pleased: "joy",
 *   sad: "sorrow", unhappy: "sorrow"
 * }
 * const reverseSync = invertBy((keys: Array<string | symbol>) => keys)(synonyms)
 * // { "joy": ["happy", "glad", "pleased"], "sorrow": ["sad", "unhappy"] }
 * 
 * // Partial application for specific grouping strategies
 * const invertWithArray = invertBy((keys: Array<string | symbol>) => keys)
 * const invertWithFirst = invertBy((keys: Array<string | symbol>) => keys[0])
 * const invertWithCount = invertBy((keys: Array<string | symbol>) => keys.length)
 * 
 * const data = { a: 1, b: 1, c: 2 }
 * invertWithArray(data)  // { "1": ["a", "b"], "2": ["c"] }
 * invertWithFirst(data)  // { "1": "a", "2": "c" }
 * invertWithCount(data)  // { "1": 2, "2": 1 }
 * ```
 * @property Custom grouping - user defines how to handle multiple keys with same value
 * @property Preserves all mappings - doesn't lose keys like regular invert
 * @property Flexible output - grouping function can return any type
 */
const invertBy = <R extends Value>(
	fn: (keys: Array<string | symbol>) => R,
) => <T extends Record<string | symbol, Value>>(
	obj: T,
): Record<string, R> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}
	
	// First, group keys by their values
	const groups: Record<string, Array<string | symbol>> = {}
	
	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj)
	]
	
	// Group keys by their stringified values
	for (const key of allKeys) {
		const value = obj[key]
		const valueKey = String(value)
		
		if (!groups[valueKey]) {
			groups[valueKey] = []
		}
		groups[valueKey].push(key)
	}
	
	// Apply the grouping function to each group
	const result: Record<string, R> = {}
	for (const [valueKey, keys] of Object.entries(groups)) {
		result[valueKey] = fn(keys)
	}
	
	return result
}

export default invertBy