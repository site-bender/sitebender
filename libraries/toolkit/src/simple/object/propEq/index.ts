import type { Value } from "../../../types/index.ts"

/**
 * Checks if a property equals a specific value
 *
 * Returns true if the specified property of an object equals the given
 * value (using strict equality ===). Returns false if the property doesn't
 * exist or doesn't equal the value. Useful for filtering and validation.
 *
 * @param key - The property key to check
 * @param value - The value to compare against
 * @param obj - The object to test
 * @returns True if obj[key] === value, false otherwise
 * @example
 * ```typescript
 * // Basic equality checks
 * propEq("name")("Alice")({ name: "Alice", age: 30 })     // true
 * propEq("name")("Bob")({ name: "Alice", age: 30 })       // false
 * propEq("age")(30)({ name: "Alice", age: 30 })           // true
 *
 * // Filtering arrays
 * const users = [
 *   { id: 1, role: "admin" },
 *   { id: 2, role: "user" }
 * ]
 * const isAdmin = propEq("role")("admin")
 * users.filter(isAdmin)  // [{ id: 1, role: "admin" }]
 *
 * // Finding by ID
 * const findById = (id: number) => propEq("id")(id)
 * const items = [{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }]
 * items.find(findById(2))  // { id: 2, name: "Item 2" }
 *
 * // Missing properties return false (unless comparing to undefined)
 * propEq("missing")("any")({ present: "value" })      // false
 * propEq("missing")(undefined)({ present: "value" })  // true
 *
 * // Symbol keys supported
 * const sym = Symbol("id")
 * propEq(sym)(123)({ [sym]: 123 })  // true
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 * @predicate
 */
const propEq = <K extends string | symbol, V extends Value>(
	key: K,
) =>
(
	value: V,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined objects
	if (obj == null) {
		return undefined === value
	}

	// Strict equality check
	return obj[key] === value
}

export default propEq
