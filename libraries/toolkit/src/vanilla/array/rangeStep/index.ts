/**
 * Generates an array of numbers from start to end with custom step
 *
 * Creates an array containing a sequence of numbers from start towards end,
 * incrementing by the specified step value. The sequence stops before
 * exceeding end (for positive step) or going below end (for negative step).
 * Returns empty array if the step direction doesn't lead from start to end.
 * This is the flexible version of range that allows custom increments.
 *
 * @param step - Increment between values (can be negative)
 * @param start - Starting number (inclusive)
 * @param end - Ending boundary (exclusive)
 * @returns Array of numbers from start towards end by step
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // Step by 2
 * rangeStep(2)(0)(10) // [0, 2, 4, 6, 8]
 *
 * // Negative step (counting down)
 * rangeStep(-1)(5)(0) // [5, 4, 3, 2, 1]
 *
 * // Decimal step
 * rangeStep(0.5)(0)(3) // [0, 0.5, 1, 1.5, 2, 2.5]
 *
 * // Partial application
 * const byTens = rangeStep(10)
 * byTens(0)(31) // [0, 10, 20, 30]
 *
 * // Edge cases
 * rangeStep(0)(1)(10) // [] (zero step prevented)
 * rangeStep(1)(10)(5) // [] (wrong direction)
 * rangeStep(1)(5)(5)  // [] (start equals end)
 * ```
 */
const rangeStep = (
	step: number,
) =>
(
	start: number,
) =>
(
	end: number,
): Array<number> => {
	// Prevent infinite loops with zero step
	if (step === 0) {
		return []
	}

	// Check if step direction is correct
	if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
		return []
	}

	const length = Math.ceil(
		step > 0 ? (end - start) / step : (start - end) / Math.abs(step),
	)

	// Handle non-finite length
	if (!isFinite(length)) {
		return []
	}

	return Array.from({ length }, (_, i) => start + i * step)
}

export default rangeStep
