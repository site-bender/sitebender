import type { Value } from "../../../types/index.ts"

/**
 * Modifies a property value using a function
 *
 * Creates a new object with the specified property's value transformed
 * by the provided function. If the property doesn't exist, the function
 * receives undefined. The original object is not modified (immutable).
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 * @param prop - The property key to modify
 * @param fn - Function to transform the property value
 * @param obj - The object to modify
 * @returns A new object with the property value transformed
 * @example
 * ```typescript
 * // Basic usage
 * modify("count")((n: number) => n + 1)({ count: 5, label: "Counter" })
 * // { count: 6, label: "Counter" }
 *
 * // String transformation
 * modify("name")((s: string) => s.toUpperCase())({ name: "bob", id: 1 })
 * // { name: "BOB", id: 1 }
 *
 * // Array modification
 * modify("items")((arr: Array<number>) => [...arr, 4])({ items: [1, 2, 3] })
 * // { items: [1, 2, 3, 4] }
 *
 * // Missing property
 * modify("missing")((val: any) => val || "default")({ a: 1 })
 * // { a: 1, missing: "default" }
 *
 * // Partial application
 * const incrementAge = modify("age")((a: number) => a + 1)
 * incrementAge({ name: "Alice", age: 30 }) // { name: "Alice", age: 31 }
 *
 * // Edge cases
 * modify("x")((n: number) => n * 2)(null) // { x: NaN }
 * modify("x")((n: number) => n * 2)({}) // { x: NaN }
 * ```
 */
const modify = <K extends string | symbol, V extends Value, R extends Value>(
	prop: K,
) =>
(
	fn: (value: V) => R,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): T & Record<K, R> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return { [prop]: fn(undefined as unknown as V) } as T & Record<K, R>
	}

	// Get current value (may be undefined)
	const currentValue = obj[prop] as V

	// Apply transformation and create new object
	return {
		...obj,
		[prop]: fn(currentValue),
	} as T & Record<K, R>
}

export default modify
