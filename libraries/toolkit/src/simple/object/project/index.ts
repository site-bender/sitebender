import type { Value } from "../../../types/index.ts"

import pick from "../pick/index.ts"

/**
 * Acts like pick on arrays of objects
 *
 * Applies a pick operation to each object in an array, extracting only
 * the specified properties from each object. Returns a new array where
 * each object contains only the requested keys. Useful for extracting
 * specific fields from collections of records.
 *
 * @param keys - Array of keys to pick from each object
 * @param array - Array of objects to project
 * @returns A new array with each object containing only the specified keys
 * @example
 * ```typescript
 * // Basic projection
 * project(["name", "age"])([
 *   { name: "Alice", age: 30, city: "NYC" },
 *   { name: "Bob", age: 25, city: "LA" }
 * ])
 * // [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }]
 *
 * // Single property extraction
 * project(["id"])([
 *   { id: 1, name: "Item 1", price: 100 },
 *   { id: 2, name: "Item 2", price: 200 }
 * ])
 * // [{ id: 1 }, { id: 2 }]
 *
 * // Empty keys array returns empty objects
 * project([])([
 *   { a: 1, b: 2 },
 *   { c: 3, d: 4 }
 * ])
 * // [{}, {}]
 *
 * // API response transformation
 * const publicUserData = project(["id", "username", "email"])
 * publicUserData([
 *   { id: 1, username: "alice", password: "hash1", email: "alice@ex.com" },
 *   { id: 2, username: "bob", password: "hash2", email: "bob@ex.com" }
 * ])
 * // Removes sensitive password field from all users
 *
 * // Reusable projections
 * const getCoordinates = project(["x", "y"])
 * getCoordinates([
 *   { x: 10, y: 20, color: "red" },
 *   { x: 30, y: 40, color: "blue" }
 * ])
 * // [{ x: 10, y: 20 }, { x: 30, y: 40 }]
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const project = <T extends Record<string | symbol, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(
	array: Array<T>,
): Array<Pick<T, K>> => {
	// Handle null/undefined array
	if (!array || !Array.isArray(array)) {
		return []
	}

	// Apply pick to each element
	const pickKeys = pick(keys)
	return array.map(pickKeys)
}

export default project
