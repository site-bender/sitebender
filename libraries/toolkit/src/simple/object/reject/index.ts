import type { Value } from "../../../types/index.ts"

/**
 * Returns an object with properties that don't satisfy a predicate
 *
 * The complement of pickBy - creates a new object containing only the
 * properties for which the predicate returns false. The predicate receives
 * both the value and key. The original object is not modified.
 *
 * @param predicate - Function to test each property (value, key) => boolean
 * @param obj - The object to filter
 * @returns A new object with properties that don't satisfy the predicate
 * @example
 * // Reject by value
 * reject((value: any) => typeof value === "number")({
 *   a: 1, b: "two", c: 3, d: "four"
 * })
 * // { b: "two", d: "four" }
 *
 * // Reject by key pattern
 * reject((value: any, key: string) => key.startsWith("_"))({
 *   name: "Alice", _id: 123, email: "alice@ex.com"
 * })
 * // { name: "Alice", email: "alice@ex.com" }
 *
 * // Remove falsy values
 * const removeFalsy = reject((value: any) => !value)
 * removeFalsy({ name: "Alice", email: "", age: 0, active: true })
 * // { name: "Alice", active: true }
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const reject = <T extends Record<string | symbol, Value>>(
	predicate: (value: Value, key: string | symbol) => boolean,
) =>
(
	obj: T,
): Partial<T> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Filter entries where predicate returns false
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => !predicate(value, key))
	) as Partial<T>
}

export default reject