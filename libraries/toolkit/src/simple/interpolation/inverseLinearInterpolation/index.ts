/**
 * Finds the interpolation parameter t from a linearly interpolated value
 *
 * Given a value that was linearly interpolated between start and end,
 * finds the parameter t such that lerp(start, end, t) = value.
 * This is the inverse operation of linear interpolation.
 * Formula: t = (value - start) / (end - start).
 * Returns NaN for invalid inputs or when start equals end.
 *
 * @curried (start) => (end) => (value) => number
 * @param start - Start value of the range
 * @param end - End value of the range
 * @param value - The interpolated value to find t for
 * @returns Parameter t (typically 0 to 1), or NaN if invalid
 * @example
 * ```typescript
 * // Basic inverse interpolation
 * inverseLinearInterpolation(0)(10)(5)
 * // 0.5 (5 is halfway between 0 and 10)
 *
 * inverseLinearInterpolation(0)(100)(25)
 * // 0.25 (25 is 25% of the way from 0 to 100)
 *
 * inverseLinearInterpolation(10)(20)(15)
 * // 0.5 (15 is halfway between 10 and 20)
 *
 * // Exact endpoints
 * inverseLinearInterpolation(0)(10)(0)
 * // 0 (value equals start)
 *
 * inverseLinearInterpolation(0)(10)(10)
 * // 1 (value equals end)
 *
 * // Values outside range (extrapolation)
 * inverseLinearInterpolation(0)(10)(15)
 * // 1.5 (value is beyond end)
 *
 * inverseLinearInterpolation(0)(10)(-5)
 * // -0.5 (value is before start)
 *
 * // Negative ranges
 * inverseLinearInterpolation(-10)(10)(0)
 * // 0.5 (0 is halfway between -10 and 10)
 *
 * inverseLinearInterpolation(10)(-10)(5)
 * // 0.25 (reversed range)
 *
 * // Floating point values
 * inverseLinearInterpolation(1.5)(2.5)(2.0)
 * // 0.5
 *
 * inverseLinearInterpolation(0)(Math.PI)(Math.PI / 2)
 * // 0.5 (π/2 is halfway to π)
 *
 * // Invalid: same start and end
 * inverseLinearInterpolation(5)(5)(3)
 * // NaN (cannot invert when range is zero)
 *
 * // Invalid inputs
 * inverseLinearInterpolation(null)(10)(5)
 * // NaN
 *
 * inverseLinearInterpolation(0)(null)(5)
 * // NaN
 *
 * // Practical examples
 *
 * // Progress bar percentage
 * const getProgress = (min: number, max: number, current: number) => {
 *   const t = inverseLinearInterpolation(min)(max)(current)
 *   return Math.max(0, Math.min(1, t)) * 100 // Clamp to 0-100%
 * }
 * getProgress(0, 200, 50) // 25%
 *
 * // Temperature conversion reverse lookup
 * const celsiusToFahrenheit = (c: number) => c * 9/5 + 32
 * const findCelsius = (fahrenheit: number) => {
 *   // If we know F is between two C values
 *   const c1 = 0, c2 = 100
 *   const f1 = celsiusToFahrenheit(c1) // 32
 *   const f2 = celsiusToFahrenheit(c2) // 212
 *   const t = inverseLinearInterpolation(f1)(f2)(fahrenheit)
 *   return c1 + t * (c2 - c1)
 * }
 * findCelsius(68) // ~20°C
 *
 * // Animation timing
 * const getAnimationTime = (startPos: number, endPos: number, currentPos: number) => {
 *   return inverseLinearInterpolation(startPos)(endPos)(currentPos)
 * }
 *
 * // Color channel mapping
 * const getNormalizedValue = (value: number) => {
 *   return inverseLinearInterpolation(0)(255)(value)
 * }
 * getNormalizedValue(128) // 0.502...
 *
 * // Partial application for fixed range
 * const percentOfYear = inverseLinearInterpolation(0)(365)
 * percentOfYear(91) // 0.249... (about 25% through year)
 * percentOfYear(183) // 0.501... (about halfway)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs or zero range
 * @property Inverse - Reverses linear interpolation operation
 */
const inverseLinearInterpolation = (
	start: number | null | undefined,
) =>
(
	end: number | null | undefined,
) =>
(
	value: number | null | undefined,
): number => {
	if (start == null || typeof start !== "number") {
		return NaN
	}

	if (end == null || typeof end !== "number") {
		return NaN
	}

	if (value == null || typeof value !== "number") {
		return NaN
	}

	// Check for non-finite values
	if (!isFinite(start) || !isFinite(end) || !isFinite(value)) {
		return NaN
	}

	// Cannot invert when start equals end (zero range)
	const range = end - start
	if (range === 0) {
		return NaN
	}

	// Calculate t parameter
	return (value - start) / range
}

export default inverseLinearInterpolation
