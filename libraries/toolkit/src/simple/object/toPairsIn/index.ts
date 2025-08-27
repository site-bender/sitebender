import type { Value } from "../../../types/index.ts"

/**
 * Converts an object to an array of [key, value] pairs including inherited properties
 *
 * Like toPairs, but includes properties from the prototype chain. Transforms
 * an object into an array of tuples, where each tuple contains a key-value
 * pair from the object or its prototype chain. Useful when you need to
 * access all properties, not just own properties.
 *
 * @param obj - The object to convert
 * @returns Array of [key, value] pairs including inherited properties
 * @example
 * ```typescript
 * // Basic conversion (same as toPairs for plain objects)
 * toPairsIn({ a: 1, b: 2, c: 3 })
 * // [["a", 1], ["b", 2], ["c", 3]]
 *
 * // Object with prototype
 * const parent = { inherited: "from parent" }
 * const child = Object.create(parent)
 * child.own = "child property"
 * 
 * toPairs(child)    // [["own", "child property"]]
 * toPairsIn(child)  // [["own", "child property"], ["inherited", "from parent"]]
 *
 * // Configuration with defaults
 * const defaultConfig = { host: "localhost", port: 3000 }
 * const userConfig = Object.create(defaultConfig)
 * userConfig.port = 8080
 * 
 * toPairsIn(userConfig)  // [["port", 8080], ["host", "localhost"]]
 *
 * // Flattening inheritance
 * const flatten = (obj: any) => Object.fromEntries(toPairsIn(obj))
 * const base = { x: 1 }
 * const derived = Object.create(base)
 * derived.y = 2
 * flatten(derived)  // { y: 2, x: 1 }
 * ```
 * @pure
 * @immutable
 * @safe
 */
const toPairsIn = <T extends Record<string | symbol, Value>>(
	obj: T,
): Array<[string | symbol, Value]> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return []
	}

	const pairs: Array<[string | symbol, Value]> = []

	// Get all enumerable properties including inherited ones
	for (const key in obj) {
		pairs.push([key, obj[key]])
	}

	// Get own symbol properties (symbols are not inherited)
	const symbolPairs = Object.getOwnPropertySymbols(obj)
		.map((sym) => [sym, obj[sym]] as [symbol, Value])

	// Combine regular and symbol pairs
	return [...pairs, ...symbolPairs]
}

export default toPairsIn
