/**
 * Finds the minimum value using a mapping function
 *
 * Applies a transformation function to two values and returns the value
 * that produces the smaller result. This allows finding minimums based
 * on derived properties rather than the values themselves. Returns the
 * second value if the mapped results are equal. Returns NaN if either
 * mapped result is not a valid number.
 *
 * @curried (fn) => (a) => (b) => minimum
 * @param fn - Function to map values before comparison
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns The value that produces the smaller mapped result
 * @example
 * ```typescript
 * // Simple numeric mapping
 * const byAbs = minBy(Math.abs)
 * byAbs(-5)(3)
 * // 3
 *
 * // Object property comparison
 * type Person = { name: string; age: number }
 * const byAge = minBy((p: Person) => p.age)
 * const alice = { name: "Alice", age: 30 }
 * const bob = { name: "Bob", age: 25 }
 * byAge(alice)(bob)
 * // { name: "Bob", age: 25 }
 *
 * // String length comparison
 * const byLength = minBy((s: string) => s.length)
 * byLength("hello")("hi")
 * // "hi"
 *
 * // Distance from zero
 * const closestToZero = minBy(Math.abs)
 * closestToZero(5)(-3)
 * // -3
 *
 * // Array reduction
 * const points = [{ x: 5, y: 3 }, { x: 1, y: 1 }]
 * const closestToOrigin = minBy((p: { x: number; y: number }) =>
 *   Math.sqrt(p.x * p.x + p.y * p.y)
 * )
 * points.reduce((min, point) => closestToOrigin(min)(point))
 * // { x: 1, y: 1 }
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN when mapper produces invalid numbers
 * @higherOrder Takes a function and returns a comparison function
 */
const minBy = <T>(
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
	if (aValue == null || typeof aValue !== "number" || isNaN(aValue)) {
		return NaN as any
	}

	if (bValue == null || typeof bValue !== "number" || isNaN(bValue)) {
		return NaN as any
	}

	// Return the value with smaller mapped result
	// If equal, return the second value
	return aValue <= bValue ? a : b
}

export default minBy
