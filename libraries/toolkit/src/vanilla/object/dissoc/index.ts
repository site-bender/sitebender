import type { Value } from "../../../types/index.ts"

/**
 * Returns a shallow clone of an object with a property removed
 *
 * Creates a new object with all the properties of the original except
 * for the specified property. The original object is not modified.
 * If the property doesn't exist, returns a clone of the original object.
 *
 * @pure
 * @immutable
 * @curried
 * @param key - The property key to remove
 * @param obj - The object to clone and update
 * @returns A new object without the specified property
 * @example
 * ```typescript
 * // Basic property removal
 * dissoc("b")({ a: 1, b: 2, c: 3 })      // { a: 1, c: 3 }
 * dissoc("name")({ name: "Alice", age: 30 }) // { age: 30 }
 *
 * // Removing non-existent property returns clone
 * dissoc("d")({ a: 1, b: 2, c: 3 })      // { a: 1, b: 2, c: 3 }
 *
 * // Symbol keys
 * const sym = Symbol("key")
 * const obj = { a: 1, [sym]: "value" }
 * dissoc(sym)(obj)                       // { a: 1 }
 *
 * // Partial application
 * const removePassword = dissoc("password")
 * removePassword({ user: "alice", password: "secret", email: "a@ex.com" })
 * // { user: "alice", email: "a@ex.com" }
 *
 * // Chaining dissociations
 * const obj2 = { a: 1, b: 2, c: 3, d: 4 }
 * const step1 = dissoc("b")(obj2)        // { a: 1, c: 3, d: 4 }
 * const step2 = dissoc("d")(step1)       // { a: 1, c: 3 }
 * ```
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
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	return allKeys
		.filter((k) => k !== key)
		.reduce(
			(acc, k) => ({ ...acc, [k]: obj[k] }),
			{} as Record<string | symbol, Value>,
		) as Omit<T, K>
}

export default dissoc
