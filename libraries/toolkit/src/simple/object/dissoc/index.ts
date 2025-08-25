import type { Value } from "../../../types/index.ts"

/**
 * Returns a shallow clone of an object with a property removed
 *
 * Creates a new object with all the properties of the original except
 * for the specified property. The original object is not modified.
 * If the property doesn't exist, returns a clone of the original object.
 *
 * @curried (key) => (obj) => result
 * @param key - The property key to remove
 * @param obj - The object to clone and update
 * @returns A new object without the specified property
 * @example
 * ```typescript
 * // Basic property removal
 * dissoc("b")({ a: 1, b: 2, c: 3 })      // { a: 1, c: 3 }
 * dissoc("name")({ name: "Alice", age: 30 }) // { age: 30 }
 * dissoc("x")({ x: 10, y: 20, z: 30 })   // { y: 20, z: 30 }
 *
 * // Removing non-existent property
 * dissoc("d")({ a: 1, b: 2, c: 3 })      // { a: 1, b: 2, c: 3 }
 * dissoc("missing")({ x: 1 })            // { x: 1 }
 *
 * // Empty object
 * dissoc("a")({})                        // {}
 *
 * // Single property object
 * dissoc("only")({ only: 42 })           // {}
 *
 * // Symbol keys
 * const sym = Symbol("key")
 * const obj = { a: 1, [sym]: "value" }
 * dissoc(sym)(obj)                       // { a: 1 }
 * dissoc("a")(obj)                       // { [Symbol(key)]: "value" }
 *
 * // Nested objects (shallow operation)
 * dissoc("user")({ user: { name: "Bob" }, id: 1 }) // { id: 1 }
 * dissoc("a")({ a: { b: 2 }, c: 3 })     // { c: 3 }
 *
 * // Preserves other properties
 * const original = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 * dissoc("c")(original)                  // { a: 1, b: 2, d: 4, e: 5 }
 *
 * // Partial application
 * const removePassword = dissoc("password")
 * removePassword({ user: "alice", password: "secret", email: "a@ex.com" })
 * // { user: "alice", email: "a@ex.com" }
 *
 * const removeId = dissoc("id")
 * removeId({ id: 1, name: "Item 1" })    // { name: "Item 1" }
 * removeId({ id: 2, name: "Item 2", category: "A" }) // { name: "Item 2", category: "A" }
 *
 * // Cleaning objects
 * const removeTempFields = dissoc("_temp")
 * removeTempFields({ data: "value", _temp: "cache" }) // { data: "value" }
 *
 * const removeDebug = dissoc("debug")
 * removeDebug({ setting: "prod", debug: true }) // { setting: "prod" }
 *
 * // Chaining dissociations
 * const obj2 = { a: 1, b: 2, c: 3, d: 4 }
 * const step1 = dissoc("b")(obj2)        // { a: 1, c: 3, d: 4 }
 * const step2 = dissoc("d")(step1)       // { a: 1, c: 3 }
 *
 * // Immutability check
 * const orig = { a: 1, b: 2 }
 * const without = dissoc("a")(orig)
 * orig        // { a: 1, b: 2 } (unchanged)
 * without     // { b: 2 }
 * ```
 * @property Immutable - creates a new object, doesn't modify the original
 * @property Shallow operation - only removes top-level property
 * @property Complementary to assoc - removes instead of adding/updating
 */
const dissoc = <K extends string | symbol>(
	key: K,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Omit<T, K> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {} as Omit<T, K>
	}

	// Create a shallow clone without the specified key
	const result = {} as Record<string | symbol, Value>

	// Copy all keys except the one to remove
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	for (const k of allKeys) {
		if (k !== key) {
			result[k] = obj[k]
		}
	}

	return result as Omit<T, K>
}

export default dissoc
