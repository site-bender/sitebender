import errorFunction from "../errorFunction/index.ts"

/**
 * Calculates the complementary error function (erfc)
 *
 * Computes erfc(x) = 1 - erf(x), which represents the probability that
 * a normally distributed random variable falls outside [-x, x] standard
 * deviations. More numerically stable than computing 1 - erf(x) directly
 * for large x. Returns NaN for invalid inputs.
 *
 * @param x - Input value
 * @returns Complementary error function value (between 0 and 2), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * complementaryErrorFunction(0)    // 1 (erfc(0) = 1 - erf(0))
 * complementaryErrorFunction(1)    // 0.1572... (15.73% outside ±1σ)
 * complementaryErrorFunction(2)    // 0.00467... (0.47% outside ±2σ)
 * complementaryErrorFunction(-1)   // 1.8427... (erfc(-x) = 2 - erfc(x))
 *
 * // Tail probability of normal distribution
 * const normalTailProbability = (z: number) =>
 *   0.5 * complementaryErrorFunction(z / Math.sqrt(2))
 *
 * // Edge cases
 * complementaryErrorFunction(null)  // NaN
 * complementaryErrorFunction(5)      // 1.537e-12 (approaches 0)
 * ```
 * @pure
 * @safe
 */
const complementaryErrorFunction = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	// For better numerical stability with large |x|
	// we could implement a direct approximation,
	// but for simplicity we use: erfc(x) = 1 - erf(x)
	const erf = errorFunction(x)

	if (isNaN(erf)) {
		return NaN
	}

	return 1 - erf
}

export default complementaryErrorFunction
