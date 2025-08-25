/**
 * Subtracts 1 from a number
 *
 * Decrements a number by one. This is equivalent to n - 1 but provides
 * a semantic function for decrementing operations. Useful in functional
 * pipelines and iterative operations. Returns NaN for non-numeric inputs
 * to support safe error handling.
 *
 * @param n - Number to decrement
 * @returns Number minus 1, or NaN if invalid
 * @example
 * ```typescript
 * // Basic decrement
 * decrement(5)
 * // 4
 *
 * decrement(0)
 * // -1
 *
 * decrement(-1)
 * // -2
 *
 * // Decimal numbers
 * decrement(5.5)
 * // 4.5
 *
 * // Special values
 * decrement(Infinity)
 * // Infinity
 *
 * decrement(NaN)
 * // NaN
 *
 * // Array operations
 * const numbers = [5, 4, 3, 2, 1]
 * const decremented = numbers.map(decrement)
 * // [4, 3, 2, 1, 0]
 *
 * // Pipeline processing
 * const pipeline = [
 *   (x: number) => x * 2,
 *   decrement,
 *   (x: number) => x / 3
 * ]
 * const result = pipeline.reduce((acc, fn) => fn(acc), 6)
 * // 3.6666... ((6 * 2 - 1) / 3)
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 * @inverse decrement is the inverse of increment
 */
const decrement = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	return n - 1
}

export default decrement
