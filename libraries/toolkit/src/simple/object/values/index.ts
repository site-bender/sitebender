import type { Value } from "../../../types/index.ts"

/**
 * Returns an array of an object's own enumerable property values
 *
 * Retrieves all values from own enumerable properties of an object,
 * excluding symbol properties and prototype properties. Order matches
 * Object.keys() but is not guaranteed across JavaScript engines.
 *
 * @param obj - The object to extract values from
 * @returns Array of values
 * @example
 * 
 * // Basic object values
 * values({ a: 1, b: 2, c: 3 })     // [1, 2, 3]
 * values({ name: "John", age: 30 }) // ["John", 30]
 * values({})                       // []
 *
 * // Arrays (returns elements)
 * values(["a", "b", "c"])          // ["a", "b", "c"]
 *
 * // Symbol properties are excluded
 * const sym = Symbol("key")
 * values({ [sym]: "symbol", regular: "string" }) // ["string"]
 *
 * // Strings return character array
 * values("hello")                  // ["h", "e", "l", "l", "o"]
 *
 * // Data extraction
 * const data = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
 * data.map(values)                 // [[1, "Alice"], [2, "Bob"]]
 * 
 * @pure
 * @immutable
 * @safe
 */
const values = <T extends Record<string, Value>>(
	obj: T | null | undefined,
): Array<T[keyof T]> => {
	if (obj == null) {
		return []
	}

	// Handle primitives
	if (typeof obj !== "object" && typeof obj !== "function") {
		// Strings are special - they return characters
		if (typeof obj === "string") {
			return Array.from(obj) as Array<T[keyof T]>
		}
		return []
	}

	return Object.values(obj) as Array<T[keyof T]>
}

export default values
