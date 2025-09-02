import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns an array of values for the specified properties
 *
 * Extracts multiple property values from an object and returns them
 * as an array in the same order as the requested keys. Returns undefined
 * for missing properties. Useful for extracting multiple values at once.
 *
 * @curried (keys) => (obj) => values
 * @param keys - Array of property keys to extract
 * @param obj - The object to extract from
 * @returns Array of property values in the same order as keys
 * @example
 * ```typescript
 * // Basic extraction
 * props(["name", "age"])({ name: "Alice", age: 30, city: "NYC" })
 * // ["Alice", 30]
 *
 * props(["x", "y", "z"])({ x: 10, y: 20, z: 30 })
 * // [10, 20, 30]
 *
 * // Missing properties return undefined
 * props(["a", "b", "c"])({ a: 1, c: 3 })
 * // [1, undefined, 3]
 *
 * // Extracting coordinates
 * const getCoords = props(["x", "y", "z"])
 * getCoords({ x: 10, y: 20, z: 30 })                  // [10, 20, 30]
 *
 * // CSV-like data extraction
 * const users = [{ id: 1, name: "Alice", role: "admin" }]
 * users.map(props(["id", "name", "role"]))
 * // [[1, "Alice", "admin"]]
 * ```
 * @pure @immutable @curried @safe
 */
const props = <K extends Array<string | symbol>>(
	keys: K,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Array<Value | undefined> => {
	// Handle null/undefined objects
	if (isNullish(obj)) {
		return keys.map(() => undefined)
	}

	// Extract each property value
	return keys.map((key) => obj[key])
}

export default props
