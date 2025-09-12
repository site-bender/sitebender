import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Extracts a list of property values from an array of objects
 *
 * Maps over an array of objects and extracts the value of a specified
 * property from each object. Returns an array of the extracted values.
 * If an object doesn't have the property, undefined is included in the
 * result. This is a specialized map operation for property extraction.
 *
 * @param key - The property key to extract from each object
 * @param array - Array of objects to extract property from
 * @returns Array of extracted property values
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // Extract names from users
 * const users = [
 *   { id: 1, name: "Alice", age: 30 },
 *   { id: 2, name: "Bob", age: 25 },
 *   { id: 3, name: "Charlie", age: 35 }
 * ]
 * pluck("name")(users) // ["Alice", "Bob", "Charlie"]
 * pluck("age")(users)  // [30, 25, 35]
 *
 * // Handle missing properties
 * const mixed = [
 *   { a: 1, b: 2 },
 *   { a: 3 },
 *   { b: 7 }
 * ]
 * pluck("a")(mixed) // [1, 3, undefined]
 *
 * // Partial application
 * const getName = pluck("name")
 * getName(users) // ["Alice", "Bob", "Charlie"]
 *
 * // Edge cases
 * pluck("key")(null) // []
 * pluck("key")(undefined) // []
 * pluck("key")([]) // []
 * ```
 */
const pluck = <T, K extends keyof T>(
	key: K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T[K] | undefined> => {
	if (isNullish(array)) {
		return []
	}

	return array.map((item) => {
		if (isNotNullish(item) && typeof item === "object") {
			return (item as Record<string | number | symbol, unknown>)[
				key as unknown as string
			] as T[K] | undefined
		}
		return undefined
	})
}

export default pluck
