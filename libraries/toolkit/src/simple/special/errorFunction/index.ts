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
 * // Common values
 * errorFunction(0)
 * // 0
 *
 * errorFunction(1)
 * // 0.8427... (about 84.27% within ±1σ)
 *
 * errorFunction(-1)
 * // -0.8427... (odd function: erf(-x) = -erf(x))
 *
 * errorFunction(2)
 * // 0.9953... (about 99.53% within ±2σ)
 *
 * errorFunction(3)
 * // 0.99997... (about 99.997% within ±3σ)
 *
 * // Small values (linear approximation near 0)
 * errorFunction(0.1)
 * // 0.1124...
 *
 * errorFunction(0.5)
 * // 0.5204...
 *
 * // Large values approach ±1
 * errorFunction(4)
 * // 0.999999984...
 *
 * errorFunction(-4)
 * // -0.999999984...
 *
 * // Fractional values
 * errorFunction(0.25)
 * // 0.2763...
 *
 * errorFunction(1.5)
 * // 0.9661...
 *
 * errorFunction(2.5)
 * // 0.9991...
 *
 * // Invalid inputs return NaN
 * errorFunction(null)
 * // NaN
 *
 * errorFunction("1")
 * // NaN
 *
 * errorFunction(undefined)
 * // NaN
 *
 * // Practical examples
 *
 * // Normal distribution CDF
 * const normalCDF = (x: number, mean: number, stdDev: number) => {
 *   const z = (x - mean) / (stdDev * Math.sqrt(2))
 *   return 0.5 * (1 + errorFunction(z))
 * }
 * normalCDF(100, 100, 15)  // 0.5 (at mean)
 * normalCDF(115, 100, 15)  // 0.841... (1σ above)
 * normalCDF(85, 100, 15)   // 0.158... (1σ below)
 *
 * // Probability within range
 * const probabilityInRange = (lower: number, upper: number) => {
 *   // For standard normal distribution
 *   return (errorFunction(upper / Math.sqrt(2)) -
 *           errorFunction(lower / Math.sqrt(2))) / 2
 * }
 * probabilityInRange(-1, 1)  // 0.682... (68.2%)
 * probabilityInRange(-2, 2)  // 0.954... (95.4%)
 *
 * // Heat diffusion (physics)
 * const temperatureProfile = (x: number, diffusionTime: number) => {
 *   const scaled = x / Math.sqrt(4 * diffusionTime)
 *   return 0.5 * (1 - errorFunction(scaled))
 * }
 * temperatureProfile(1, 0.25)  // Temperature at position x, time t
 *
 * // Signal processing (Q-function)
 * const qFunction = (x: number) =>
 *   0.5 * (1 - errorFunction(x / Math.sqrt(2)))
 * qFunction(1)  // 0.158... (tail probability)
 * qFunction(2)  // 0.0227...
 *
 * // Confidence intervals
 * const confidenceLevel = (zScore: number) =>
 *   errorFunction(zScore / Math.sqrt(2))
 * confidenceLevel(1.96)  // 0.95 (95% confidence)
 * confidenceLevel(2.58)  // 0.99 (99% confidence)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Bounded - Output always between -1 and 1
 * @property Odd - erf(-x) = -erf(x)
 * @property Monotonic - Strictly increasing function
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
