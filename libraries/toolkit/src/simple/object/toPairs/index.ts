import type { Value } from "../../../types/index.ts"

/**
 * Converts an object to an array of [key, value] pairs
 *
 * Transforms an object into an array of tuples, where each tuple contains
 * a key-value pair from the object. Only own enumerable properties are
 * included (not inherited properties). The order of pairs follows the
 * same order as Object.entries(). Includes symbol keys.
 *
 * @param obj - The object to convert
 * @returns Array of [key, value] pairs
 * @example
 *
 * // Basic conversion
 * toPairs({ a: 1, b: 2, c: 3 })
 * // [["a", 1], ["b", 2], ["c", 3]]
 *
 * // Symbol keys are included
 * const sym = Symbol("key")
 * toPairs({ regular: "value", [sym]: "symbol1" })
 * // [["regular", "value"], [Symbol(key), "symbol1"]]
 *
 * // URL query parameters
 * const params = { page: 1, limit: 10, sort: "name" }
 * const queryString = toPairs(params)
 *   .map(([key, value]) => `${key}=${value}`)
 *   .join("&")
 * // "page=1&limit=10&sort=name"
 *
 * // Map conversion
 * const obj = { a: 1, b: 2 }
 * const map = new Map(toPairs(obj))
 * // Map { "a" => 1, "b" => 2 }
 *
 * @pure
 * @immutable
 * @safe
 */
const toPairs = <T extends Record<string | symbol, Value>>(
	obj: T,
): Array<[string | symbol, Value]> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return []
	}

	// Get string keys
	const stringPairs = Object.entries(obj) as Array<[string, Value]>

	// Get symbol keys and their values
	const symbolPairs = Object.getOwnPropertySymbols(obj)
		.map((sym) => [sym, obj[sym]] as [symbol, Value])

	// Combine string and symbol pairs
	return [...stringPairs, ...symbolPairs]
}

export default toPairs
