import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates frequency from period
 *
 * Computes frequency using the formula f = 1/T where f is frequency
 * and T is the period. Frequency is the number of cycles per unit time,
 * while period is the time for one complete cycle. Returns NaN for
 * invalid inputs or when period is zero or negative.
 *
 * @param period - Time for one complete cycle (must be positive)
 * @returns Frequency (cycles per unit time), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * frequency(1)     // 1 (1 second period = 1 Hz)
 * frequency(0.5)   // 2 (0.5 second period = 2 Hz)
 * frequency(2)     // 0.5 (2 second period = 0.5 Hz)
 * frequency(0.001) // 1000 (1 millisecond = 1 kHz)
 *
 * // Edge cases
 * frequency(0)  // NaN (instantaneous cycle impossible)
 * frequency(-1) // NaN (period cannot be negative)
 *
 * // Musical note (A4 = 440 Hz)
 * frequency(1 / 440) // 440
 *
 * // AC power frequencies
 * frequency(1 / 60) // 60 (60 Hz power in Americas)
 * frequency(1 / 50) // 50 (50 Hz power in Europe)
 *
 * // Invalid inputs
 * frequency(null)     // NaN
 * frequency(Infinity) // NaN
 * ```
 * @pure
 * @safe - Returns NaN for invalid inputs
 */
const frequency = (
	period: number | null | undefined,
): number => {
	if (isNullish(period) || typeof period !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(period)) {
		return NaN
	}

	// Period must be positive (cannot be zero or negative)
	if (period <= 0) {
		return NaN
	}

	// Calculate frequency as reciprocal of period
	return 1 / period
}

export default frequency
