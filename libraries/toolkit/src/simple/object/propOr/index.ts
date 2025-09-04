import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the value of a property or a default value if not found
 *
 * Like prop, but returns a default value when the property doesn't exist
 * or when the object is null/undefined. Useful for safe property access
 * with fallback values in functional pipelines.
 *
 * @curried (defaultValue) => (key) => (obj) => value
 * @param defaultValue - The value to return if property is not found
 * @param key - The property key to extract
 * @param obj - The object to extract from
 * @returns The value of the property, or defaultValue if not found
 * @example
 * ```typescript
 * // Basic usage with defaults
 * propOr("Unknown")("name")({ name: "Alice" })         // "Alice"
 * propOr("Unknown")("name")({})                        // "Unknown"
 * propOr(0)("count")({ count: 5 })                     // 5
 * propOr(0)("count")({})                               // 0
 *
 * // Configuration with defaults
 * const getPort = propOr(3000)("port")
 * getPort({ port: 8080 })                             // 8080
 * getPort({})                                         // 3000
 *
 * // Safe data extraction
 * const getName = propOr("Anonymous")("name")
 * const users = [{ name: "Alice" }, {}]
 * users.map(getName)                                  // ["Alice", "Anonymous"]
 * ```
 * @pure @immutable @curried @safe
 */
const propOr = <D extends Value>(
	defaultValue: D,
) =>
<K extends string | symbol, V>(
	key: K,
) =>
<T extends Record<K, unknown>>(
	obj: T,
): V | D => {
	// Handle null/undefined objects
	if (isNullish(obj)) {
		return defaultValue
	}

	// Check if property exists (including undefined values)
	if (Object.prototype.hasOwnProperty.call(obj as object, key as string | symbol)) {
		return (obj as Record<string | symbol, unknown>)[key] as V
	}

	// Return default for missing properties
	return defaultValue
}

export default propOr
