import type { Value } from "../../../types/index.ts"

/**
 * Returns a shallow clone of an object with a property set to a value
 *
 * Creates a new object with all the properties of the original object plus
 * the specified property set to the given value. If the property already
 * exists, it will be overwritten with the new value. The original object
 * is not modified (immutable operation).
 *
 * @pure
 * @immutable
 * @curried
 * @param key - The property key to set
 * @param value - The value to set for the property
 * @param obj - The object to clone and update
 * @returns A new object with the property set to the value
 * @example
 * ```typescript
 * // Basic usage - adding new property
 * assoc("c")(3)({ a: 1, b: 2 })          // { a: 1, b: 2, c: 3 }
 * assoc("name")("John")({ age: 30 })     // { age: 30, name: "John" }
 *
 * // Updating existing property
 * assoc("b")(20)({ a: 1, b: 2, c: 3 })   // { a: 1, b: 20, c: 3 }
 *
 * // Symbol keys
 * const sym = Symbol("key")
 * assoc(sym)("value")({ a: 1 })          // { a: 1, [Symbol(key)]: "value" }
 *
 * // Partial application for reusable setters
 * const setId = assoc("id")
 * const withId5 = setId(5)
 * withId5({ name: "Alice" })             // { name: "Alice", id: 5 }
 * withId5({ name: "Bob", age: 30 })      // { name: "Bob", age: 30, id: 5 }
 *
 * // Composition with other functions
 * const addTimestamp = assoc("timestamp")(Date.now())
 * const addStatus = assoc("status")("active")
 * const processRecord = (obj: Record<string, Value>) =>
 *   addStatus(addTimestamp(obj))
 * processRecord({ id: 1, name: "Task" })
 * // { id: 1, name: "Task", timestamp: 1234567890, status: "active" }
 * ```
 */
const assoc = <K extends string | symbol, V extends Value>(
	key: K,
) =>
(
	value: V,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): T & Record<K, V> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return { [key]: value } as T & Record<K, V>
	}

	// Create shallow clone with new/updated property
	return {
		...obj,
		[key]: value,
	} as T & Record<K, V>
}

export default assoc
