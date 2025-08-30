import isNullish from "../../simple/validation/isNullish/index.ts"

/**
 * Generates a random floating-point number between min and max
 *
 * Returns a random number in the range [min, max) using Math.random().
 * The minimum is inclusive and the maximum is exclusive. If min > max,
 * the values are automatically swapped. This uses pseudo-random generation
 * suitable for non-cryptographic purposes.
 *
 * ⚠️ IMPURE: This function is non-deterministic and returns different
 * values each time it's called.
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns Random float in range [min, max), or NaN if invalid
 * @example
 * ```typescript
 * // Random between 0 and 1
 * randomFloat(0)(1)     // 0.7263849502...
 * 
 * // Random between 0 and 100
 * randomFloat(0)(100)   // 42.8391047...
 * 
 * // Random between -1 and 1
 * randomFloat(-1)(1)    // -0.2847395...
 * 
 * // Handles swapped bounds
 * randomFloat(10)(5)    // 7.239... (between 5 and 10)
 * 
 * // Partial application for ranges
 * const randomPercent = randomFloat(0)
 * randomPercent(100)    // 0-100
 * randomPercent(1)      // 0-1
 * 
 * // Invalid inputs return NaN
 * randomFloat(null)(10) // NaN
 * ```
 * @curried
 * @impure
 * @safe
 */
const randomFloat = (
	min: number | null | undefined,
) =>
(
	max: number | null | undefined,
): number => {
	if (isNullish(min) || typeof min !== "number" || !isFinite(min)) {
		return NaN
	}

	if (isNullish(max) || typeof max !== "number" || !isFinite(max)) {
		return NaN
	}

	// Handle swapped bounds
	const actualMin = Math.min(min, max)
	const actualMax = Math.max(min, max)

	// Generate random float in range [min, max)
	return Math.random() * (actualMax - actualMin) + actualMin
}

export default randomFloat
