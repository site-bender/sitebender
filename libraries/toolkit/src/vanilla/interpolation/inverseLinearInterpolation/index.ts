import isNullish from "../../validation/isNullish/index.ts"

/**
 * Finds the interpolation parameter t from a linearly interpolated value
 *
 * Given a value that was linearly interpolated between start and end,
 * finds the parameter t such that lerp(start, end, t) = value.
 * This is the inverse operation of linear interpolation.
 * Formula: t = (value - start) / (end - start).
 * Returns NaN for invalid inputs or when start equals end.
 *
 * @curried
 * @param start - Start value of the range
 * @param end - End value of the range
 * @param value - The interpolated value to find t for
 * @returns Parameter t (typically 0 to 1), or NaN if invalid
 * @example
 * ```typescript
 * // Basic inverse interpolation
 * inverseLinearInterpolation(0)(10)(5) // 0.5
 * inverseLinearInterpolation(0)(100)(25) // 0.25
 * inverseLinearInterpolation(-10)(10)(0) // 0.5
 *
 * // Edge cases
 * inverseLinearInterpolation(0)(10)(0) // 0 (value equals start)
 * inverseLinearInterpolation(0)(10)(10) // 1 (value equals end)
 * inverseLinearInterpolation(5)(5)(3) // NaN (zero range)
 * inverseLinearInterpolation(null)(10)(5) // NaN
 *
 * // Partial application
 * const percentOfRange = inverseLinearInterpolation(0)(100)
 * percentOfRange(25) // 0.25
 * percentOfRange(75) // 0.75
 * ```
 * @pure
 * @curried
 * @safe
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
	if (isNullish(start) || typeof start !== "number") {
		return NaN
	}

	if (isNullish(end) || typeof end !== "number") {
		return NaN
	}

	if (isNullish(value) || typeof value !== "number") {
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
