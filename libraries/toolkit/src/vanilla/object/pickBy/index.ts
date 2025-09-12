import type { Value } from "../../../types/index.ts"

/**
 * Creates a new object with only the properties that satisfy a predicate
 *
 * Filters an object's properties based on a predicate function that receives
 * both the value and key. Only properties for which the predicate returns
 * true are included in the result. The original object is not modified.
 *
 * @param predicate - Function to test each property (value, key) => boolean
 * @param obj - The object to filter
 * @returns A new object with only properties that satisfy the predicate
 * @example
 * ```typescript
 * // Filter by value type
 * pickBy((v: any) => typeof v === "number")({ a: 1, b: "two", c: 3 })  // { a: 1, c: 3 }
 *
 * // Filter by key pattern
 * pickBy((v: any, k: string) => k.startsWith("user_"))({
 *   user_id: 1, user_name: "Alice", age: 30
 * })  // { user_id: 1, user_name: "Alice" }
 *
 * // Remove null/undefined values
 * pickBy((v: any) => v != null)({ a: 1, b: null, c: undefined, d: 0 })  // { a: 1, d: 0 }
 *
 * // Partial application
 * const compact = pickBy((v: any) => Boolean(v))
 * compact({ name: "Alice", email: "", age: 0 })  // { name: "Alice" }
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const pickBy = <T extends Record<string | symbol, Value>>(
	predicate: (value: Value, key: string | symbol) => boolean,
) =>
(
	obj: T,
): Partial<T> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Filter properties based on predicate using reduce (pure FP)
	return allKeys.reduce((acc, key) => {
		const value = obj[key as keyof T]
		return predicate(value, key) ? { ...acc, [key]: value } : acc
	}, {} as Partial<T>)
}

export default pickBy
