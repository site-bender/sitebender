import type { Value } from "../../../types/index.ts"

/**
 * Maps a function over all values in an object, preserving keys
 *
 * Transforms each value in an object by applying a function, while keeping
 * the same keys. Creates a new object with the same keys but transformed values.
 * Useful for bulk transformations of object values.
 *
 * @pure
 * @immutable
 * @curried
 * @param fn - Function to apply to each value
 * @param obj - Object whose values will be transformed
 * @returns A new object with same keys but transformed values
 * @example
 * ```typescript
 * // Basic usage
 * mapValues((x: number) => x * 2)({ a: 1, b: 2, c: 3 })
 * // { a: 2, b: 4, c: 6 }
 *
 * // String transformation
 * mapValues((s: string) => s.toUpperCase())({ first: "hello", last: "world" })
 * // { first: "HELLO", last: "WORLD" }
 *
 * // Type detection
 * mapValues((v: Value) => typeof v)({ name: "Alice", age: 30, active: true })
 * // { name: "string", age: "number", active: "boolean" }
 *
 * // Extract nested values
 * mapValues((user: { name: string }) => user.name)({
 *   u1: { name: "Alice" },
 *   u2: { name: "Bob" }
 * })
 * // { u1: "Alice", u2: "Bob" }
 *
 * // Partial application
 * const doubleValues = mapValues((x: number) => x * 2)
 * doubleValues({ x: 10, y: 20 }) // { x: 20, y: 40 }
 *
 * // Edge cases
 * mapValues((x: number) => x + 1)(null) // {}
 * mapValues((x: number) => x * 2)({}) // {}
 * ```
 */
const mapValues = <T extends Value, R extends Value>(
	fn: (value: T) => R,
) =>
<K extends string | symbol>(
	obj: Record<K, T> | null | undefined,
): Record<K, R> => {
	if (obj == null || typeof obj !== "object") {
		return {} as Record<K, R>
	}

	// Get all keys (both string and symbol)
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Use reduce to build the result object
	return allKeys.reduce((acc, key) => ({
		...acc,
		[key]: fn((obj as Record<string | symbol, T>)[key]),
	}), {} as Record<K, R>)
}

export default mapValues
