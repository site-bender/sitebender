import type { Value } from "../../../types/index.ts"

/**
 * Transforms an object using a transformation specification
 *
 * Applies a set of transformation functions to an object's properties based
 * on a specification object. Each key in the spec corresponds to a key in the
 * result, and each value is a function that computes the result value from
 * the input object. Powerful for reshaping and deriving new data structures.
 *
 * @param spec - Object mapping result keys to transformation functions
 * @param obj - The object to transform
 * @returns A new object with transformed values according to the spec
 * @example
 * // Basic transformation
 * transform({
 *   fullName: (obj) => `${obj.firstName} ${obj.lastName}`,
 *   isAdult: (obj) => obj.age >= 18
 * })({ firstName: "John", lastName: "Doe", age: 25 })
 * // { fullName: "John Doe", isAdult: true }
 *
 * // Property renaming and computation
 * transform({
 *   id: (obj) => obj.user_id,
 *   name: (obj) => obj.user_name,
 *   email: (obj) => obj.user_email.toLowerCase()
 * })({ user_id: 123, user_name: "Alice", user_email: "ALICE@EXAMPLE.COM" })
 * // { id: 123, name: "Alice", email: "alice@example.com" }
 *
 * // Array aggregation
 * transform({
 *   total: (obj) => obj.items.reduce((sum: number, item: { price: number }) => sum + item.price, 0),
 *   count: (obj) => obj.items.length
 * })({ items: [{ price: 10 }, { price: 20 }] })
 * // { total: 30, count: 2 }
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const transform =
	<S extends Record<string, (obj: Record<string, unknown>) => Value>>(
		spec: S,
	) =>
	<T extends Record<string | symbol, Value>>(
		obj: T,
	): { [K in keyof S]: ReturnType<S[K]> } => {
		// Handle null/undefined
		const safeObj = (!obj || typeof obj !== "object") ? {} as T : obj

		// Apply each transformation in the spec
		return Object.keys(spec).reduce((result, key) => {
			const transformer = spec[key]
			return {
				...result,
				[key]: transformer(safeObj as unknown as Record<string, unknown>),
			}
		}, {} as { [K in keyof S]: ReturnType<S[K]> })
	}

export default transform
