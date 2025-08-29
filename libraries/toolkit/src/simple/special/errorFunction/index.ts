/**
 * Calculates the error function (erf)
 *
 * Computes the error function, a special function used in probability,
 * statistics, and partial differential equations. It represents the
 * probability that a normally distributed random variable falls within
 * [-x, x] standard deviations. Uses a numerical approximation accurate
 * to about 5 decimal places. Returns NaN for invalid inputs.
 *
 * @param x - Input value
 * @returns Error function value (between -1 and 1), or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * errorFunction(0)      // 0
 * errorFunction(1)      // 0.8427... (84.27% within ±1σ)
 * errorFunction(-1)     // -0.8427... (odd function)
 * errorFunction(2)      // 0.9953... (99.53% within ±2σ)
 *
 * // Normal distribution CDF
 * const normalCDF = (x: number, mean: number, stdDev: number) => {
 *   const z = (x - mean) / (stdDev * Math.sqrt(2))
 *   return 0.5 * (1 + errorFunction(z))
 * }
 *
 * // Edge cases
 * errorFunction(null)   // NaN
 * errorFunction(4)      // 0.999999984... (approaches 1)
 * ```
 * @pure
 * @safe
 */
const errorFunction = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	// Use Abramowitz and Stegun approximation
	// Maximum error: 5×10^-4
	const sign = x >= 0 ? 1 : -1
	x = Math.abs(x)

	const a1 = 0.254829592
	const a2 = -0.284496736
	const a3 = 1.421413741
	const a4 = -1.453152027
	const a5 = 1.061405429
	const p = 0.3275911

	// A&S formula 7.1.26
	const t = 1.0 / (1.0 + p * x)
	const t2 = t * t
	const t3 = t2 * t
	const t4 = t3 * t
	const t5 = t4 * t

	const y = 1.0 -
		(((((a5 * t5 + a4 * t4) + a3 * t3) + a2 * t2) + a1 * t) * Math.exp(-x * x))

	return sign * y
}

export default errorFunction
