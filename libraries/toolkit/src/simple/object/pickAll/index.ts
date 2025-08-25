import type { Value } from "../../../types/index.ts"

/**
 * Creates a new object with only the specified keys, including undefined for missing keys
 *
 * Like pick, but includes all requested keys in the result even if they
 * don't exist in the source object (as undefined). This ensures the result
 * always has a consistent shape with all requested properties present.
 * The original object is not modified.
 *
 * @curried (keys) => (obj) => result
 * @param keys - Array of keys to include in the result
 * @param obj - The object to pick keys from
 * @returns A new object with all specified keys (missing ones as undefined)
 * @example
 * ```typescript
 * // Basic usage - includes missing keys as undefined
 * pickAll(["a", "b", "c"])({ a: 1, b: 2 })
 * // { a: 1, b: 2, c: undefined }
 *
 * pickAll(["x", "y", "z"])({ x: 10 })
 * // { x: 10, y: undefined, z: undefined }
 *
 * // All keys exist
 * pickAll(["name", "age"])({ name: "Alice", age: 30, city: "NYC" })
 * // { name: "Alice", age: 30 }
 *
 * // No keys exist
 * pickAll(["a", "b", "c"])({ x: 1, y: 2 })
 * // { a: undefined, b: undefined, c: undefined }
 *
 * // Empty keys array
 * pickAll([])({ a: 1, b: 2 })
 * // {}
 *
 * // Empty object
 * pickAll(["a", "b"])({})
 * // { a: undefined, b: undefined }
 *
 * // Null and undefined values preserved
 * pickAll(["a", "b", "c"])({ a: null, b: undefined })
 * // { a: null, b: undefined, c: undefined }
 *
 * // Nested objects (shallow operation)
 * pickAll(["user", "settings"])({
 *   user: { name: "Bob" },
 *   id: 1
 * })
 * // { user: { name: "Bob" }, settings: undefined }
 *
 * // Symbol keys
 * const sym = Symbol("key")
 * pickAll([sym, "regular"])({ [sym]: "value", other: "data" })
 * // { [Symbol(key)]: "value", regular: undefined }
 *
 * // Practical use cases
 *
 * // Ensuring consistent API response shape
 * const normalizeUser = pickAll(["id", "name", "email", "avatar"])
 *
 * normalizeUser({ id: 1, name: "Alice" })
 * // { id: 1, name: "Alice", email: undefined, avatar: undefined }
 *
 * normalizeUser({ id: 2, name: "Bob", email: "bob@ex.com", age: 30 })
 * // { id: 2, name: "Bob", email: "bob@ex.com", avatar: undefined }
 *
 * // Form field initialization
 * const initFormFields = pickAll([
 *   "username",
 *   "email",
 *   "password",
 *   "confirmPassword"
 * ])
 *
 * initFormFields({ username: "alice" })
 * // {
 * //   username: "alice",
 * //   email: undefined,
 * //   password: undefined,
 * //   confirmPassword: undefined
 * // }
 *
 * // Configuration with defaults detection
 * const getConfig = pickAll(["host", "port", "timeout", "retries"])
 *
 * const config = getConfig({ host: "localhost" })
 * // { host: "localhost", port: undefined, timeout: undefined, retries: undefined }
 *
 * // Can then apply defaults to undefined values
 * const withDefaults = (obj: any) => ({
 *   host: obj.host ?? "0.0.0.0",
 *   port: obj.port ?? 3000,
 *   timeout: obj.timeout ?? 5000,
 *   retries: obj.retries ?? 3
 * })
 *
 * withDefaults(config)
 * // { host: "localhost", port: 3000, timeout: 5000, retries: 3 }
 *
 * // Database record normalization
 * const normalizeRecord = pickAll([
 *   "id",
 *   "createdAt",
 *   "updatedAt",
 *   "deletedAt"
 * ])
 *
 * normalizeRecord({ id: 1, createdAt: "2024-01-01" })
 * // {
 * //   id: 1,
 * //   createdAt: "2024-01-01",
 * //   updatedAt: undefined,
 * //   deletedAt: undefined
 * // }
 *
 * // Extracting known fields from dynamic objects
 * const extractKnownFields = pickAll(["type", "payload", "meta"])
 *
 * const event1 = { type: "click", payload: { x: 100 }, extra: "data" }
 * const event2 = { type: "submit" }
 *
 * extractKnownFields(event1)
 * // { type: "click", payload: { x: 100 }, meta: undefined }
 *
 * extractKnownFields(event2)
 * // { type: "submit", payload: undefined, meta: undefined }
 *
 * // Partial application for consistent shapes
 * const pickUserFields = pickAll(["id", "name", "role"])
 * const pickPostFields = pickAll(["id", "title", "content", "authorId"])
 *
 * const users = [
 *   { id: 1, name: "Alice", role: "admin", extra: "data" },
 *   { id: 2, name: "Bob" }
 * ]
 *
 * users.map(pickUserFields)
 * // [
 * //   { id: 1, name: "Alice", role: "admin" },
 * //   { id: 2, name: "Bob", role: undefined }
 * // ]
 *
 * // Type checking helper
 * const hasAllFields = <T extends Record<string, any>>(
 *   fields: Array<keyof T>
 * ) => (obj: any): obj is T => {
 *   const picked = pickAll(fields)(obj)
 *   return fields.every(field => picked[field] !== undefined)
 * }
 *
 * const isCompleteUser = hasAllFields(["id", "name", "email"])
 * isCompleteUser({ id: 1, name: "Alice", email: "a@ex.com" }) // true
 * isCompleteUser({ id: 1, name: "Alice" })                    // false
 *
 * // Difference from pick
 * const obj = { a: 1, b: 2 }
 *
 * // pick excludes missing keys
 * pick(["a", "c", "d"])(obj)    // { a: 1 }
 *
 * // pickAll includes missing keys as undefined
 * pickAll(["a", "c", "d"])(obj) // { a: 1, c: undefined, d: undefined }
 * ```
 * @property Always consistent shape - result always has all requested keys
 * @property Missing as undefined - non-existent keys get undefined value
 * @property Immutable - creates a new object, doesn't modify the original
 */
const pickAll = <K extends string | symbol>(
	keys: Array<K>,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Record<K, Value | undefined> => {
	// Handle null/undefined gracefully
	const source = (!obj || typeof obj !== "object") ? {} : obj

	// Build result with all specified keys
	return keys.reduce((acc, key) => {
		// Always include the key, even if undefined
		return {
			...acc,
			[key]: source[key as keyof typeof source],
		}
	}, {} as Record<K, Value | undefined>)
}

export default pickAll
