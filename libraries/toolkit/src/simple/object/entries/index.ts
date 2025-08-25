import type { Value } from "../../../types/index.ts"

/**
 * Returns an array of an object's own enumerable [key, value] pairs
 *
 * Creates an array of [key, value] tuples from an object's own enumerable
 * properties. Excludes symbol properties and prototype properties. Order
 * matches Object.keys() but is not guaranteed across JavaScript engines.
 *
 * @curried Single parameter - already curried
 * @param obj - The object to extract entries from
 * @returns Array of [key, value] tuples
 * @example
 * ```typescript
 * // Basic object entries
 * entries({ a: 1, b: 2, c: 3 })
 * // [["a", 1], ["b", 2], ["c", 3]]
 *
 * entries({ name: "John", age: 30 })
 * // [["name", "John"], ["age", 30]]
 *
 * entries({})
 * // []
 *
 * // Arrays (returns [index, element] pairs)
 * entries(["a", "b", "c"])
 * // [["0", "a"], ["1", "b"], ["2", "c"]]
 *
 * // Mixed value types
 * entries({
 *   str: "text",
 *   num: 42,
 *   bool: true
 * })
 * // [["str", "text"], ["num", 42], ["bool", true]]
 *
 * // Useful for iteration
 * const obj = { x: 10, y: 20, z: 30 }
 * for (const [key, value] of entries(obj)) {
 *   console.log(`${key}: ${value}`)
 * }
 * // x: 10
 * // y: 20
 * // z: 30
 *
 * // Transform to new object
 * const original = { a: 1, b: 2, c: 3 }
 * const doubled = Object.fromEntries(
 *   entries(original).map(([k, v]) => [k, v * 2])
 * )
 * // { a: 2, b: 4, c: 6 }
 *
 * // Filter entries
 * const data = { a: 1, b: null, c: 3, d: undefined, e: 5 }
 * const filtered = entries(data).filter(([_, v]) => v != null)
 * // [["a", 1], ["c", 3], ["e", 5]]
 *
 * // Symbol properties are excluded
 * const sym = Symbol("key")
 * entries({ [sym]: "symbol", regular: "string" })
 * // [["regular", "string"]]
 *
 * // Null/undefined handling
 * entries(null)                                // []
 * entries(undefined)                           // []
 *
 * // Non-objects
 * entries(42)                                  // []
 * entries("hi")                                // [["0", "h"], ["1", "i"]]
 * entries(true)                                // []
 * ```
 * @property Safe - handles null/undefined gracefully
 * @property Own properties only - excludes prototype chain
 * @property Enumerable only - excludes non-enumerable properties
 */
const entries = <T extends Record<string, Value>>(
	obj: T | null | undefined,
): Array<[keyof T & string, T[keyof T]]> => {
	if (obj == null) {
		return []
	}

	// Handle primitives
	if (typeof obj !== "object" && typeof obj !== "function") {
		// Strings are special - they return [index, char] pairs
		if (typeof obj === "string") {
			return Array.from(obj, (char, i) => [String(i), char]) as Array<
				[keyof T & string, T[keyof T]]
			>
		}
		return []
	}

	return Object.entries(obj) as Array<[keyof T & string, T[keyof T]]>
}

export default entries
