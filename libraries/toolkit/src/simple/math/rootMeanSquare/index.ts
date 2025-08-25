/**
 * Calculates the root mean square (RMS) of an array of numbers
 *
 * Computes the square root of the arithmetic mean of the squares of the values.
 * RMS is particularly useful in signal processing, statistics, and physics for
 * measuring the magnitude of a varying quantity. Returns NaN for empty arrays
 * or arrays containing non-numeric values.
 *
 * @param values - Array of numbers to calculate RMS
 * @returns Root mean square of the values, or NaN if invalid
 * @example
 * ```typescript
 * // Basic RMS calculation
 * rootMeanSquare([3, 4])
 * // 3.5355... (√((9 + 16)/2) = √12.5)
 *
 * rootMeanSquare([1, 2, 3, 4, 5])
 * // 3.3166...
 *
 * // Negative numbers (squares are always positive)
 * rootMeanSquare([-3, 4])
 * // 3.5355... (same as [3, 4])
 *
 * rootMeanSquare([-2, -2, 2, 2])
 * // 2
 *
 * // Zero values
 * rootMeanSquare([0, 3, 4])
 * // 2.8867...
 *
 * // AC voltage calculation
 * const voltages = [0, 155, 220, 155, 0, -155, -220, -155]
 * const rmsVoltage = rootMeanSquare(voltages)
 * // ~155V (RMS of sine wave samples)
 *
 * // Audio signal level
 * const audioSamples = [-0.5, 0.3, 0.7, -0.2, 0.4]
 * const signalLevel = rootMeanSquare(audioSamples)
 * // 0.4690...
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs or empty arrays
 */
const rootMeanSquare = (
	values: Array<number> | null | undefined,
): number => {
	if (values == null || !Array.isArray(values)) {
		return NaN
	}

	if (values.length === 0) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValue = values.some(
		(value) => value == null || typeof value !== "number" || isNaN(value),
	)

	if (hasInvalidValue) {
		return NaN
	}

	// Calculate sum of squares using reduce
	const sumOfSquares = values.reduce((acc, value) => acc + value * value, 0)

	return Math.sqrt(sumOfSquares / values.length)
}

export default rootMeanSquare
