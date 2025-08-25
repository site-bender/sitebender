/**
 * Partition object entries by predicate
 *
 * Splits an object into two objects based on a predicate function applied
 * to each key-value pair. Returns a tuple where the first object contains
 * entries that satisfy the predicate and the second contains those that don't.
 * Useful for filtering, separating concerns, and conditional processing.
 *
 * @curried (predicate) => (obj) => [matching, nonMatching]
 * @param predicate - Function that tests each [key, value] pair
 * @param obj - Object to partition
 * @returns Tuple of two objects: [matching, nonMatching]
 * @example
 * ```typescript
 * // Partition by value
 * const isPositive = ([_, value]: [string, number]) => value > 0
 * partitionBy(isPositive)({ a: 1, b: -2, c: 3, d: -4, e: 5 })
 * // [{ a: 1, c: 3, e: 5 }, { b: -2, d: -4 }]
 *
 * // Partition by key
 * const isPrivate = ([key, _]: [string, any]) => key.startsWith("_")
 * partitionBy(isPrivate)({
 *   _id: 123,
 *   name: "Alice",
 *   _token: "secret",
 *   email: "alice@example.com"
 * })
 * // [{ _id: 123, _token: "secret" }, { name: "Alice", email: "alice@example.com" }]
 *
 * // Partition by value type
 * const isString = ([_, value]: [string, any]) => typeof value === "string"
 * partitionBy(isString)({ a: 1, b: "hello", c: true, d: "world" })
 * // [{ b: "hello", d: "world" }, { a: 1, c: true }]
 *
 * // Empty object
 * partitionBy(isPositive)({})
 * // [{}, {}]
 *
 * // All match
 * partitionBy(isPositive)({ a: 1, b: 2, c: 3 })
 * // [{ a: 1, b: 2, c: 3 }, {}]
 *
 * // None match
 * partitionBy(isPositive)({ a: -1, b: -2, c: -3 })
 * // [{}, { a: -1, b: -2, c: -3 }]
 *
 * // Partition by null/undefined
 * const isNullish = ([_, value]: [string, any]) => value == null
 * partitionBy(isNullish)({
 *   a: null,
 *   b: undefined,
 *   c: 0,
 *   d: "",
 *   e: false
 * })
 * // [{ a: null, b: undefined }, { c: 0, d: "", e: false }]
 *
 * // Partition configuration
 * const isEnabled = ([key, value]: [string, boolean]) => value === true
 * const features = {
 *   darkMode: true,
 *   notifications: false,
 *   autoSave: true,
 *   analytics: false,
 *   beta: true
 * }
 * const [enabled, disabled] = partitionBy(isEnabled)(features)
 * // enabled: { darkMode: true, autoSave: true, beta: true }
 * // disabled: { notifications: false, analytics: false }
 *
 * // Partition by key pattern
 * const isApiKey = ([key, _]: [string, any]) => key.includes("api")
 * partitionBy(isApiKey)({
 *   apiUrl: "https://api.example.com",
 *   apiKey: "secret",
 *   timeout: 5000,
 *   retries: 3,
 *   apiVersion: "v2"
 * })
 * // [
 * //   { apiUrl: "...", apiKey: "secret", apiVersion: "v2" },
 * //   { timeout: 5000, retries: 3 }
 * // ]
 *
 * // Partition validation results
 * const isValid = ([_, value]: [string, { valid: boolean }]) => value.valid
 * const validations = {
 *   email: { valid: true, value: "user@example.com" },
 *   password: { valid: false, value: "123" },
 *   username: { valid: true, value: "alice" },
 *   age: { valid: false, value: -5 }
 * }
 * const [valid, invalid] = partitionBy(isValid)(validations)
 * // valid: { email: {...}, username: {...} }
 * // invalid: { password: {...}, age: {...} }
 *
 * // Partition by value length
 * const isLong = ([_, value]: [string, string]) => value.length > 5
 * partitionBy(isLong)({
 *   short: "hi",
 *   medium: "hello",
 *   long: "greetings",
 *   tiny: "x"
 * })
 * // [{ long: "greetings" }, { short: "hi", medium: "hello", tiny: "x" }]
 *
 * // Partition permissions
 * const canWrite = ([_, perm]: [string, string]) =>
 *   perm.includes("w") || perm.includes("write")
 * partitionBy(canWrite)({
 *   owner: "rwx",
 *   group: "r-x",
 *   other: "r--",
 *   admin: "write-all"
 * })
 * // [{ owner: "rwx", admin: "write-all" }, { group: "r-x", other: "r--" }]
 *
 * // Complex predicate
 * interface User {
 *   name: string
 *   age: number
 *   active: boolean
 * }
 * const isActiveAdult = ([_, user]: [string, User]) =>
 *   user.active && user.age >= 18
 * const users = {
 *   alice: { name: "Alice", age: 25, active: true },
 *   bob: { name: "Bob", age: 17, active: true },
 *   charlie: { name: "Charlie", age: 30, active: false }
 * }
 * partitionBy(isActiveAdult)(users)
 * // [{ alice: {...} }, { bob: {...}, charlie: {...} }]
 *
 * // Destructuring result
 * const numbers = { a: 1, b: 2, c: 3, d: 4, e: 5 }
 * const isEven = ([_, n]: [string, number]) => n % 2 === 0
 * const [evens, odds] = partitionBy(isEven)(numbers)
 * // evens: { b: 2, d: 4 }
 * // odds: { a: 1, c: 3, e: 5 }
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input object
 * @property Type-safe - Preserves key-value types
 */
const partitionBy = <K extends string, V>(
	predicate: (entry: [K, V]) => boolean,
) =>
(
	obj: Record<K, V>,
): [Record<K, V>, Record<K, V>] => {
	const matching: Record<K, V> = {} as Record<K, V>
	const nonMatching: Record<K, V> = {} as Record<K, V>

	for (const [key, value] of Object.entries(obj) as Array<[K, V]>) {
		if (predicate([key, value])) {
			matching[key] = value
		} else {
			nonMatching[key] = value
		}
	}

	return [matching, nonMatching]
}

export default partitionBy
