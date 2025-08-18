import type { Value } from "../../../../types/index.ts"
import omit from "../omit/index.ts"

/**
 * Returns an object without the specified keys
 * 
 * Creates a new object that contains all properties from the original except
 * those specified in the keys array. This is an alias for omit with the same
 * behavior - the original object is not modified. Non-existent keys are ignored.
 * 
 * @curried (keys) => (obj) => result
 * @param keys - Array of keys to exclude from the result
 * @param obj - The object to filter
 * @returns A new object without the specified keys
 * @example
 * ```typescript
 * // Basic exclusion
 * without(["b", "d"])({ a: 1, b: 2, c: 3, d: 4, e: 5 })
 * // { a: 1, c: 3, e: 5 }
 * 
 * without(["password", "secret"])({
 *   username: "alice",
 *   password: "hidden",
 *   email: "alice@ex.com",
 *   secret: "token"
 * })
 * // { username: "alice", email: "alice@ex.com" }
 * 
 * // Single key removal
 * without(["id"])({ id: 123, name: "Item", price: 99 })
 * // { name: "Item", price: 99 }
 * 
 * // Multiple keys
 * without(["a", "b", "c"])({ a: 1, b: 2, c: 3, d: 4 })
 * // { d: 4 }
 * 
 * // Non-existent keys (ignored)
 * without(["x", "y", "z"])({ a: 1, b: 2 })
 * // { a: 1, b: 2 }
 * 
 * // Mixed existent and non-existent keys
 * without(["a", "missing", "c"])({ a: 1, b: 2, c: 3 })
 * // { b: 2 }
 * 
 * // Empty keys array
 * without([])({ a: 1, b: 2 })
 * // { a: 1, b: 2 }
 * 
 * // Empty object
 * without(["a", "b"])({})
 * // {}
 * 
 * // All keys removed
 * without(["a", "b", "c"])({ a: 1, b: 2, c: 3 })
 * // {}
 * 
 * // Symbol keys
 * const sym = Symbol("key")
 * without([sym, "regular"])({
 *   [sym]: "symbol value",
 *   regular: "regular value",
 *   other: "keep this"
 * })
 * // { other: "keep this" }
 * 
 * // Practical use cases
 * 
 * // Remove sensitive fields
 * const removeSensitive = without(["password", "ssn", "creditCard"])
 * 
 * const userData = {
 *   id: 1,
 *   username: "john",
 *   password: "secret123",
 *   email: "john@ex.com",
 *   ssn: "123-45-6789"
 * }
 * 
 * removeSensitive(userData)
 * // { id: 1, username: "john", email: "john@ex.com" }
 * 
 * // API response cleaning
 * const cleanResponse = without(["_id", "__v", "_internal"])
 * 
 * cleanResponse({
 *   _id: "507f1f77bcf86cd799439011",
 *   name: "Product",
 *   price: 99,
 *   __v: 0,
 *   _internal: { cache: true }
 * })
 * // { name: "Product", price: 99 }
 * 
 * // Remove temporary fields
 * const removeTempFields = without(["temp", "cache", "draft"])
 * 
 * removeTempFields({
 *   title: "Article",
 *   content: "...",
 *   temp: "work in progress",
 *   cache: { old: true },
 *   published: false
 * })
 * // { title: "Article", content: "...", published: false }
 * 
 * // Configuration filtering
 * const removeDebugConfig = without(["debug", "verbose", "trace"])
 * 
 * const config = {
 *   port: 3000,
 *   host: "localhost",
 *   debug: true,
 *   verbose: true,
 *   ssl: false
 * }
 * 
 * removeDebugConfig(config)
 * // { port: 3000, host: "localhost", ssl: false }
 * 
 * // Form data preparation
 * const prepareForSubmission = without(["confirmPassword", "terms", "captcha"])
 * 
 * const formData = {
 *   username: "alice",
 *   password: "secure",
 *   confirmPassword: "secure",
 *   email: "alice@ex.com",
 *   terms: true,
 *   captcha: "xyz123"
 * }
 * 
 * prepareForSubmission(formData)
 * // { username: "alice", password: "secure", email: "alice@ex.com" }
 * 
 * // Database field exclusion
 * const excludeTimestamps = without(["createdAt", "updatedAt", "deletedAt"])
 * 
 * const record = {
 *   id: 1,
 *   name: "Record",
 *   value: 100,
 *   createdAt: "2024-01-01",
 *   updatedAt: "2024-01-02"
 * }
 * 
 * excludeTimestamps(record)
 * // { id: 1, name: "Record", value: 100 }
 * 
 * // Partial application patterns
 * const withoutId = without(["id"])
 * const withoutMeta = without(["meta", "metadata"])
 * const withoutInternal = without(["_internal", "_private"])
 * 
 * const data = {
 *   id: 1,
 *   name: "Item",
 *   meta: { version: 1 },
 *   _internal: { flag: true }
 * }
 * 
 * withoutId(data)       // { name: "Item", meta: {...}, _internal: {...} }
 * withoutMeta(data)     // { id: 1, name: "Item", _internal: {...} }
 * withoutInternal(data) // { id: 1, name: "Item", meta: {...} }
 * 
 * // Chaining exclusions
 * const clean = (obj: any) =>
 *   without(["password"])(
 *     without(["_id", "__v"])(
 *       without(["temp", "cache"])(obj)
 *     )
 *   )
 * 
 * // Comparison with omit (they're the same)
 * const obj = { a: 1, b: 2, c: 3 }
 * without(["b"])(obj)  // { a: 1, c: 3 }
 * omit(["b"])(obj)     // { a: 1, c: 3 }
 * 
 * // Creating public versions
 * const toPublicUser = without(["password", "email", "phone", "address"])
 * const toPublicPost = without(["draft", "authorId", "internalNotes"])
 * 
 * const user = {
 *   id: 1,
 *   username: "alice",
 *   password: "secret",
 *   email: "alice@ex.com",
 *   bio: "Developer"
 * }
 * 
 * toPublicUser(user)
 * // { id: 1, username: "alice", bio: "Developer" }
 * ```
 * @property Alias for omit - identical behavior to the omit function
 * @property Immutable - creates a new object, doesn't modify the original
 * @property Safe - non-existent keys are ignored
 */
const without = <T extends Record<string | symbol, Value>, K extends Array<keyof T>>(
	keys: K,
) => (
	obj: T,
): Omit<T, K[number]> => {
	// Use omit internally since without is an alias
	return omit(keys)(obj)
}

export default without