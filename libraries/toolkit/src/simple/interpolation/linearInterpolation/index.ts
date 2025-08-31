import isNullish from "../../validation/isNullish/index.ts"

/**
 * Performs linear interpolation between two values
 *
 * Calculates a value between start and end based on a interpolation
 * factor t, where t=0 returns start and t=1 returns end. The formula
 * is: result = start + t * (end - start). Values of t outside [0,1]
 * will extrapolate beyond the range. Returns NaN for invalid inputs.
 *
 * @curried
 * @param start - Starting value (at t=0)
 * @param end - Ending value (at t=1)
 * @param t - Interpolation factor (0 to 1 for interpolation)
 * @returns Interpolated value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic interpolation
 * linearInterpolation(0)(10)(0.5) // 5
 * linearInterpolation(0)(100)(0.25) // 25
 * linearInterpolation(-10)(10)(0.5) // 0
 *
 * // Edge cases
 * linearInterpolation(5)(15)(0) // 5 (start)
 * linearInterpolation(5)(15)(1) // 15 (end)
 * linearInterpolation(10)(20)(1.5) // 25 (extrapolation)
 * linearInterpolation(null)(10)(0.5) // NaN
 *
 * // Partial application
 * const animatePosition = linearInterpolation(0)(300)
 * animatePosition(0.5) // 150
 * animatePosition(0.75) // 225
 * ```
 * @pure
 * @curried
 * @safe
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
	if (isNullish(start) || typeof start !== "number") {
		return NaN
	}

	if (isNullish(end) || typeof end !== "number") {
		return NaN
	}

	if (isNullish(t) || typeof t !== "number") {
		return NaN
	}

	return start + t * (end - start)
}

export default linearInterpolation
