/**
 * Performs linear interpolation between two values
 *
 * Calculates a value between start and end based on a interpolation
 * factor t, where t=0 returns start and t=1 returns end. The formula
 * is: result = start + t * (end - start). Values of t outside [0,1]
 * will extrapolate beyond the range. Returns NaN for invalid inputs.
 *
 * @curried (start) => (end) => (t) => interpolated value
 * @param start - Starting value (at t=0)
 * @param end - Ending value (at t=1)
 * @param t - Interpolation factor (0 to 1 for interpolation)
 * @returns Interpolated value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic interpolation
 * linearInterpolation(0)(10)(0.5)
 * // 5 (halfway between 0 and 10)
 *
 * linearInterpolation(0)(100)(0.25)
 * // 25 (25% of the way)
 *
 * linearInterpolation(10)(20)(0.7)
 * // 17
 *
 * // Boundary values
 * linearInterpolation(5)(15)(0)
 * // 5 (start value)
 *
 * linearInterpolation(5)(15)(1)
 * // 15 (end value)
 *
 * // Negative ranges
 * linearInterpolation(-10)(10)(0.5)
 * // 0
 *
 * linearInterpolation(-5)(-2)(0.333)
 * // -4 (approximately)
 *
 * // Extrapolation (t outside [0,1])
 * linearInterpolation(10)(20)(1.5)
 * // 25 (extrapolated beyond end)
 *
 * linearInterpolation(10)(20)(-0.5)
 * // 5 (extrapolated before start)
 *
 * // Decreasing values
 * linearInterpolation(100)(0)(0.25)
 * // 75 (25% from 100 to 0)
 *
 * // Invalid inputs return NaN
 * linearInterpolation(null)(10)(0.5)
 * // NaN
 *
 * linearInterpolation(0)("10")(0.5)
 * // NaN
 *
 * // Practical examples
 *
 * // Animation easing
 * const animatePosition = linearInterpolation(0)(300)
 * animatePosition(0.0)  // 0 (start)
 * animatePosition(0.33) // 100
 * animatePosition(0.67) // 200
 * animatePosition(1.0)  // 300 (end)
 *
 * // Color blending (single channel)
 * const blendRed = linearInterpolation(255)(0)
 * blendRed(0.5)  // 127.5 (50% blend)
 *
 * // Temperature conversion mapping
 * const celsiusToFahrenheit = (c: number) =>
 *   linearInterpolation(32)(212)(c / 100)
 * celsiusToFahrenheit(0)   // 32°F
 * celsiusToFahrenheit(100) // 212°F
 * celsiusToFahrenheit(20)  // 71.6°F
 *
 * // Partial application for ranges
 * const percentToRange = (min: number) => (max: number) =>
 *   (percent: number) => linearInterpolation(min)(max)(percent / 100)
 *
 * const scoreScale = percentToRange(0)(100)
 * scoreScale(75) // 75
 *
 * const priceRange = percentToRange(10)(50)
 * priceRange(25) // 20
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for fixed ranges
 * @property Safe - Returns NaN for invalid inputs
 * @property Extrapolates - t values outside [0,1] extrapolate beyond range
 */
const linearInterpolation = (
	start: number | null | undefined,
) =>
(
	end: number | null | undefined,
) =>
(
	t: number | null | undefined,
): number => {
	if (start == null || typeof start !== "number") {
		return NaN
	}

	if (end == null || typeof end !== "number") {
		return NaN
	}

	if (t == null || typeof t !== "number") {
		return NaN
	}

	return start + t * (end - start)
}

export default linearInterpolation
