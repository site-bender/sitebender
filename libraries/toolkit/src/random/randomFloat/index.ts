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
 * @curried (min) => (max) => number
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns Random float in range [min, max), or NaN if invalid
 * @example
 * ```typescript
 * // Random between 0 and 1
 * randomFloat(0)(1)
 * // 0.7263849502...
 * 
 * // Random between 0 and 100
 * randomFloat(0)(100)
 * // 42.8391047...
 * 
 * // Random between -1 and 1
 * randomFloat(-1)(1)
 * // -0.2847395...
 * 
 * // Handles swapped bounds
 * randomFloat(10)(5)
 * // 7.239... (between 5 and 10)
 * 
 * // Random prices
 * const price = randomFloat(0.99)(99.99)
 * // 45.67...
 * 
 * // Random coordinates
 * const x = randomFloat(-100)(100)
 * const y = randomFloat(-100)(100)
 * 
 * // Random opacity
 * const opacity = randomFloat(0.3)(1.0)
 * 
 * // Partial application for ranges
 * const randomPercent = randomFloat(0)
 * randomPercent(100)  // 0-100
 * randomPercent(1)    // 0-1
 * 
 * // Invalid inputs return NaN
 * randomFloat(null)(10)
 * // NaN
 * 
 * randomFloat(0)(NaN)
 * // NaN
 * ```
 * @property Impure - Non-deterministic pseudo-random generation
 * @property Curried - Enables partial application for reusable ranges
 * @property Safe - Returns NaN for invalid inputs
 */
const randomFloat = (
	min: number | null | undefined
) => (
	max: number | null | undefined
): number => {
	if (min == null || typeof min !== 'number' || !isFinite(min)) {
		return NaN
	}
	
	if (max == null || typeof max !== 'number' || !isFinite(max)) {
		return NaN
	}
	
	// Handle swapped bounds
	const actualMin = Math.min(min, max)
	const actualMax = Math.max(min, max)
	
	// Generate random float in range [min, max)
	return Math.random() * (actualMax - actualMin) + actualMin
}

export default randomFloat