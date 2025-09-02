import isNullish from "../../validation/isNullish/index.ts"

/**
 * Finds the maximum value using a mapping function
 *
 * Applies a transformation function to two values and returns the value
 * that produces the larger result. This allows finding maximums based
 * on derived properties rather than the values themselves. Returns the
 * second value if the mapped results are equal. Returns NaN if either
 * mapped result is not a valid number.
 *
 * @param fn - Function to map values before comparison
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns The value that produces the larger mapped result
 * @example
 * ```typescript
 * // Absolute value comparison
 * const byAbs = maxBy(Math.abs)
 * byAbs(-5)(3)
 * // -5
 *
 * // Object property comparison
 * type Person = { name: string; age: number }
 * const byAge = maxBy((p: Person) => p.age)
 * const alice = { name: "Alice", age: 30 }
 * const bob = { name: "Bob", age: 25 }
 * byAge(alice)(bob)
 * // { name: "Alice", age: 30 }
 *
 * // String length comparison
 * const byLength = maxBy((s: string) => s.length)
 * byLength("hello")("hi")
 * // "hello"
 *
 * // Array length comparison
 * const bySize = maxBy((arr: Array<unknown>) => arr.length)
 * bySize([1, 2, 3])([4, 5])
 * // [1, 2, 3]
 *
 * // Invalid mapper results
 * const badMapper = maxBy(() => NaN)
 * badMapper(1)(2)
 * // NaN
 *
 * // Array reduction
 * const points = [
 *   { x: 5, y: 3 },
 *   { x: -2, y: 7 },
 *   { x: 1, y: 1 }
 * ]
 * const furthestFromOrigin = maxBy((p: { x: number; y: number }) =>
 *   Math.sqrt(p.x * p.x + p.y * p.y)
 * )
 * points.reduce((max, point) => furthestFromOrigin(max)(point))
 * // { x: -2, y: 7 }
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN when mapper produces invalid numbers
 */
const maxBy = <T>(
	fn: (value: T) => number,
) =>
(
	a: T,
) =>
(
	b: T,
): T => {
	if (typeof fn !== "function") {
		return NaN as any
	}

	const aValue = fn(a)
	const bValue = fn(b)

	// Check if mapped values are valid numbers
	if (isNullish(aValue) || typeof aValue !== "number" || isNaN(aValue)) {
		return NaN as any
	}

	if (isNullish(bValue) || typeof bValue !== "number" || isNaN(bValue)) {
		return NaN as any
	}

	// Return the value with larger mapped result
	// If equal, return the second value
	return aValue >= bValue ? a : b
}

export default maxBy
