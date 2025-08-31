/**
 * Returns an object without the specified keys
 *
 * Creates a new object that contains all properties from the original except
 * those specified in the keys array. This is an alias for omit with the same
 * behavior - the original object is not modified. Non-existent keys are ignored.
 *
 * @param keys - Array of keys to exclude from the result
 * @param obj - The object to filter
 * @returns A new object without the specified keys
 * @example
 * // Basic exclusion
 * without(["b", "d"])({ a: 1, b: 2, c: 3, d: 4, e: 5 })
 * // { a: 1, c: 3, e: 5 }
 *
 * // Remove sensitive fields
 * const removeSensitive = without(["password", "ssn"])
 * removeSensitive({ id: 1, username: "john", password: "secret", ssn: "123" })
 * // { id: 1, username: "john" }
 *
 * // Alias for omit (identical behavior)
 * const obj = { a: 1, b: 2, c: 3 }
 * without(["b"])(obj)  // { a: 1, c: 3 }
 * omit(["b"])(obj)     // { a: 1, c: 3 }
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 */
import omit from "../omit/index.ts"

const without = omit

export default without
