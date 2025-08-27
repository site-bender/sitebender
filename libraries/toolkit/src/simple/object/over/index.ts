import type { Value } from "../../../types/index.ts"
import type { Lens } from "../lens/index.ts"

/**
 * Applies a function to a value at a lens focus
 *
 * Uses a lens to focus on a specific part of a data structure, applies
 * a transformation function to that focused value, and returns a new
 * structure with the transformed value. This is the primary way to
 * modify values through lenses while maintaining immutability.
 *
 * @pure
 * @immutable
 * @curried
 * @param lens - The lens to focus through
 * @param fn - Function to apply to the focused value
 * @param obj - The object to transform
 * @returns A new object with the focused value transformed
 * @example
 * ```typescript
 * import lensProp from "../lensProp/index.ts"
 * import lensPath from "../lensPath/index.ts"
 *
 * // Basic usage
 * const ageLens = lensProp("age")
 * over(ageLens)((age: number) => age + 1)({ name: "Alice", age: 30 })
 * // { name: "Alice", age: 31 }
 *
 * // Nested updates
 * const emailLens = lensPath(["contact", "email"])
 * over(emailLens)((e: string) => e.toLowerCase())({
 *   name: "Bob",
 *   contact: { email: "BOB@EXAMPLE.COM" }
 * })
 * // { name: "Bob", contact: { email: "bob@example.com" } }
 *
 * // Array updates
 * const firstLens = lensIndex(0)
 * over(firstLens)((n: number) => n * 10)([1, 2, 3])
 * // [10, 2, 3]
 *
 * // Partial application
 * const increment = over(lensProp("count"))((n: number) => n + 1)
 * increment({ count: 5 }) // { count: 6 }
 *
 * // Chaining
 * const xLens = lensProp("x")
 * const yLens = lensProp("y")
 * const point = { x: 10, y: 20 }
 * over(yLens)((y: number) => y * 2)(over(xLens)((x: number) => x + 5)(point))
 * // { x: 15, y: 40 }
 * ```
 */
const over = <S, A>(
	lens: Lens<S, A>,
) =>
(
	fn: (value: A) => A,
) =>
(
	obj: S,
): S => {
	// Get the current value through the lens
	const currentValue = lens.get(obj)

	// Apply the transformation
	const newValue = fn(currentValue)

	// Set the new value through the lens
	return lens.set(newValue)(obj)
}

export default over
