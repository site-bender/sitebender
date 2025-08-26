/**
 * Extracts a list of property values from an array of objects
 *
 * Maps over an array of objects and extracts the value of a specified
 * property from each object. Returns an array of the extracted values.
 * If an object doesn't have the property, undefined is included in the
 * result. This is a specialized map operation for property extraction.
 *
 * @curried (key) => (array) => result
 * @param key - The property key to extract from each object
 * @param array - Array of objects to extract property from
 * @returns Array of extracted property values
 * @example
 * ```typescript
 * // Extract names from users
 * const users = [
 *   { id: 1, name: "Alice", age: 30 },
 *   { id: 2, name: "Bob", age: 25 },
 *   { id: 3, name: "Charlie", age: 35 }
 * ]
 * pluck("name")(users)
 * // ["Alice", "Bob", "Charlie"]
 *
 * // Extract from array of products
 * const products = [
 *   { sku: "ABC123", price: 29.99, stock: 10 },
 *   { sku: "DEF456", price: 49.99, stock: 5 },
 *   { sku: "GHI789", price: 19.99, stock: 0 }
 * ]
 * pluck("price")(products)
 * // [29.99, 49.99, 19.99]
 *
 * // Handle missing properties
 * const mixed = [
 *   { a: 1, b: 2 },
 *   { a: 3 },
 *   { a: 4, b: 5, c: 6 },
 *   { b: 7 }
 * ]
 * pluck("a")(mixed)
 * // [1, 3, 4, undefined]
 *
 * // Extract boolean flags
 * const items = [
 *   { id: 1, active: true, verified: false },
 *   { id: 2, active: false, verified: true },
 *   { id: 3, active: true, verified: true }
 * ]
 * pluck("active")(items)
 * // [true, false, true]
 *
 * // Numeric keys (array indices)
 * const arrays = [
 *   [10, 20, 30],
 *   [40, 50, 60],
 *   [70, 80, 90]
 * ]
 * pluck(1)(arrays)  // Extract index 1 from each array
 * // [20, 50, 80]
 *
 * // Partial application for reusable extractors
 * const getName = pluck("name")
 * const getId = pluck("id")
 * getName(users)  // ["Alice", "Bob", "Charlie"]
 * getId(users)    // [1, 2, 3]
 *
 * // Handle null/undefined and mixed types gracefully
 * pluck("key")(null)      // []
 * pluck("key")(undefined) // []
 * ```
 * @curried Returns function for reusable property extraction
 * @pure Function has no side effects
 * @immutable Does not modify input array or objects
 * @safe Handles null/undefined inputs and missing properties gracefully
 */
const pluck = <T, K extends keyof T>(
	key: K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T[K] | undefined> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	return array.map((item) =>
		item != null && typeof item === "object" ? item[key] : undefined
	)
}

export default pluck
