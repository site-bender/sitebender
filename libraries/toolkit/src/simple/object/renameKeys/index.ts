import type { Value } from "../../../types/index.ts"

/**
 * Returns an object with keys renamed according to a mapping
 *
 * Creates a new object where keys are renamed based on a provided mapping
 * object. Keys not in the mapping remain unchanged. If multiple old keys
 * map to the same new key, the last value wins. The original object is
 * not modified.
 *
 * @param keyMap - Object mapping old keys to new keys
 * @param obj - The object whose keys to rename
 * @returns A new object with renamed keys
 * @example
 * ```typescript
 * // Basic key renaming
 * renameKeys({ oldName: "newName", oldAge: "newAge" })({
 *   oldName: "Alice", oldAge: 30, city: "NYC"
 * })
 * // { newName: "Alice", newAge: 30, city: "NYC" }
 *
 * // Database column mapping
 * renameKeys({ user_id: "userId", user_name: "userName" })({
 *   user_id: 123, user_name: "Bob", status: "active"
 * })
 * // { userId: 123, userName: "Bob", status: "active" }
 *
 * // Convert snake_case to camelCase
 * const toCamelCase = renameKeys({
 *   first_name: "firstName", last_name: "lastName"
 * })
 * toCamelCase({ first_name: "John", last_name: "Doe" })
 * // { firstName: "John", lastName: "Doe" }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const renameKeys = <T extends Record<string | symbol, Value>>(
	keyMap: Record<string | symbol, string | symbol>,
) =>
(
	obj: T,
): Record<string | symbol, Value> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	const result: Record<string | symbol, Value> = {}

	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Process each key
	allKeys.forEach(oldKey => {
		// Check if this key should be renamed
		const newKey = keyMap[oldKey]
		const finalKey = newKey !== undefined ? newKey : oldKey

		// Set the value with the appropriate key
		result[finalKey] = obj[oldKey as keyof T]
	})

	return result
}

export default renameKeys
