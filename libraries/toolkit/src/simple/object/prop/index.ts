import type { Value } from "../../../types/index.ts"

/**
 * Returns the value of a property from an object
 *
 * Extracts and returns the value of the specified property from an object.
 * Returns undefined if the property doesn't exist or if the object is
 * null/undefined. Useful for property access in functional pipelines.
 *
 * @param key - The property key to extract
 * @param obj - The object to extract from
 * @returns The value of the property, or undefined if not found
 * @example
 * ```typescript
 * // Basic property access
 * prop("name")({ name: "Alice", age: 30 })        // "Alice"
 * prop("age")({ name: "Alice", age: 30 })         // 30
 * prop("city")({ name: "Alice", age: 30 })        // undefined
 *
 * // Extracting from array of objects
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" }
 * ]
 * users.map(prop("name"))                         // ["Alice", "Bob"]
 *
 * // Symbol keys
 * const sym = Symbol("id")
 * prop(sym)({ [sym]: 12345, regular: "value" })   // 12345
 *
 * // Null/undefined objects
 * prop("any")(null)                               // undefined
 * prop("any")(undefined)                          // undefined
 *
 * // Property getter functions
 * const getId = prop("id")
 * const getName = prop("name")
 * getId({ id: 1, name: "Alice" })                 // 1
 * getName({ id: 1, name: "Alice" })               // "Alice"
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const prop = <T extends Record<string | symbol, Value>, K extends keyof T>(
	key: K,
) =>
(
	obj: T,
): T[K] | undefined => {
	// Handle null/undefined objects
	if (obj == null) {
		return undefined
	}

	// Return the property value
	return obj[key]
}

export default prop
