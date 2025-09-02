import isNullish from "../../validation/isNullish/index.ts"

/**
 * Constrains a number between minimum and maximum bounds
 *
 * Restricts a value to lie within a specified range. If the value is
 * less than the minimum, returns the minimum. If greater than the
 * maximum, returns the maximum. Otherwise returns the value unchanged.
 * Returns NaN for invalid inputs to support safe error handling.
 *
 * @param min - Lower bound (inclusive)
 * @param max - Upper bound (inclusive)
 * @param value - Number to constrain
 * @returns Value constrained to [min, max], or NaN if invalid
 * @example
 * ```typescript
 * // Basic clamping
 * clamp(0)(10)(5)
 * // 5 (within range)
 *
 * clamp(0)(10)(15)
 * // 10 (clamped to max)
 *
 * clamp(0)(10)(-5)
 * // 0 (clamped to min)
 *
 * // Negative ranges
 * clamp(-10)(-5)(-7)
 * // -7
 *
 * // Same min and max (forces value)
 * clamp(5)(5)(10)
 * // 5
 *
 * // Invalid range returns NaN
 * clamp(10)(5)(7)
 * // NaN
 *
 * // Special values
 * clamp(0)(10)(Infinity)
 * // 10
 *
 * // Invalid inputs return NaN
 * clamp(null)(10)(5)
 * // NaN
 *
 * // Partial application
 * const clampPercent = clamp(0)(100)
 * clampPercent(150)
 * // 100
 *
 * clampPercent(-20)
 * // 0
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs or invalid range
 * @idempotent clamp(a)(b)(clamp(a)(b)(x)) === clamp(a)(b)(x)
 */
const clamp = (
	min: number | null | undefined,
) =>
(
	max: number | null | undefined,
) =>
(
	value: number | null | undefined,
): number => {
	if (isNullish(min) || typeof min !== "number") {
		return NaN
	}

	if (isNullish(max) || typeof max !== "number") {
		return NaN
	}

	if (isNullish(value) || typeof value !== "number") {
		return NaN
	}

	// Check for invalid range
	if (min > max) {
		return NaN
	}

	if (value < min) {
		return min
	}

	if (value > max) {
		return max
	}

	return value
}

export default clamp
