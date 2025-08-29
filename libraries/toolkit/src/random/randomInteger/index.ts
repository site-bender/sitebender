/**
 * Generates a random integer between min and max (inclusive)
 *
 * Returns a random integer in the range [min, max] using Math.random().
 * Both minimum and maximum are inclusive. If min > max, the values are
 * automatically swapped. This uses pseudo-random generation suitable for
 * non-cryptographic purposes.
 *
 * ⚠️ IMPURE: This function is non-deterministic and returns different
 * values each time it's called.
 *
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer in range [min, max], or NaN if invalid
 * @example
 * ```typescript
 * // Random die roll (1-6)
 * randomInteger(1)(6)  // 4
 * 
 * // Random array index
 * const arr = ['a', 'b', 'c', 'd']
 * const index = randomInteger(0)(arr.length - 1)  // 2
 * 
 * // Random from -10 to 10
 * randomInteger(-10)(10)  // -3
 * 
 * // Handles swapped bounds
 * randomInteger(100)(1)   // 42 (between 1 and 100)
 * 
 * // Partial application for dice
 * const d6 = randomInteger(1)
 * d6(6)   // 1-6
 * const d20 = randomInteger(1)
 * d20(20) // 1-20
 * 
 * // Invalid inputs return NaN
 * randomInteger(null)(10)     // NaN
 * randomInteger(0)(Infinity)  // NaN
 * ```
 * @curried
 * @impure
 * @safe
 */
const randomInteger = (
	min: number | null | undefined,
) =>
(
	max: number | null | undefined,
): number => {
	if (min == null || typeof min !== "number" || !isFinite(min)) {
		return NaN
	}

	if (max == null || typeof max !== "number" || !isFinite(max)) {
		return NaN
	}

	// Convert to integers
	const minInt = Math.floor(min)
	const maxInt = Math.floor(max)

	// Handle swapped bounds
	const actualMin = Math.min(minInt, maxInt)
	const actualMax = Math.max(minInt, maxInt)

	// Generate random integer in range [min, max]
	// Math.floor(Math.random() * (max - min + 1)) + min
	return Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin
}

export default randomInteger
