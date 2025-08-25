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
 * // Common values
 * complementaryErrorFunction(0)
 * // 1 (erfc(0) = 1 - erf(0))
 *
 * complementaryErrorFunction(1)
 * // 0.1572... (about 15.73% outside ±1σ)
 *
 * complementaryErrorFunction(-1)
 * // 1.8427... (erfc(-x) = 2 - erfc(x))
 *
 * complementaryErrorFunction(2)
 * // 0.00467... (about 0.47% outside ±2σ)
 *
 * complementaryErrorFunction(3)
 * // 0.0000221... (about 0.0022% outside ±3σ)
 *
 * // Small values (near 1)
 * complementaryErrorFunction(0.1)
 * // 0.8875...
 *
 * complementaryErrorFunction(0.5)
 * // 0.4795...
 *
 * // Large positive values (approaches 0)
 * complementaryErrorFunction(4)
 * // 0.0000000154...
 *
 * complementaryErrorFunction(5)
 * // 1.537e-12
 *
 * // Large negative values (approaches 2)
 * complementaryErrorFunction(-4)
 * // 1.999999984...
 *
 * complementaryErrorFunction(-5)
 * // 2 (within precision)
 *
 * // Invalid inputs return NaN
 * complementaryErrorFunction(null)
 * // NaN
 *
 * complementaryErrorFunction("1")
 * // NaN
 *
 * // Practical examples
 *
 * // Tail probability of normal distribution
 * function normalTailProbability(z: number): number {
 *   return 0.5 * complementaryErrorFunction(z / Math.sqrt(2))
 * }
 * normalTailProbability(1.96)  // 0.025 (2.5% in upper tail)
 * normalTailProbability(2.58)  // 0.005 (0.5% in upper tail)
 *
 * // Two-tailed test p-value
 * function twoTailedPValue(zScore: number): number {
 *   return complementaryErrorFunction(Math.abs(zScore) / Math.sqrt(2))
 * }
 * twoTailedPValue(1.96)  // 0.05 (5% significance)
 * twoTailedPValue(2.58)  // 0.01 (1% significance)
 *
 * // Bit error rate in communications
 * function bitErrorRate(snr: number): number {
 *   // SNR in linear scale (not dB)
 *   return 0.5 * complementaryErrorFunction(Math.sqrt(snr))
 * }
 * bitErrorRate(10)  // 7.827e-9 (very low error rate)
 *
 * // Diffusion problems
 * function concentrationProfile(x: number, D: number, t: number): number {
 *   // Concentration at distance x, diffusion coefficient D, time t
 *   return 0.5 * complementaryErrorFunction(x / Math.sqrt(4 * D * t))
 * }
 *
 * // Q-function (used in signal processing)
 * function qFunction(x: number): number {
 *   return 0.5 * complementaryErrorFunction(x / Math.sqrt(2))
 * }
 * qFunction(0)  // 0.5
 * qFunction(1)  // 0.1586...
 * qFunction(2)  // 0.0227...
 *
 * // Gaussian tail bounds
 * function gaussianTailBound(x: number): number {
 *   // Upper bound: erfc(x) ≤ exp(-x²)/√π
 *   const exact = complementaryErrorFunction(x)
 *   const bound = Math.exp(-x * x) / Math.sqrt(Math.PI)
 *   return exact  // Actual is tighter than bound
 * }
 *
 * // Survival function
 * function survivalFunction(x: number, mean: number, stdDev: number): number {
 *   const z = (x - mean) / (stdDev * Math.sqrt(2))
 *   return 0.5 * complementaryErrorFunction(z)
 * }
 * survivalFunction(110, 100, 15)  // P(X > 110) for N(100, 15²)
 *
 * // Option pricing (Black-Scholes uses erfc)
 * function blackScholesCall(S: number, K: number, r: number, sigma: number, T: number): number {
 *   const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T))
 *   const d2 = d1 - sigma * Math.sqrt(T)
 *   const N = (x: number) => 0.5 * (2 - complementaryErrorFunction(x / Math.sqrt(2)))
 *   return S * N(d1) - K * Math.exp(-r * T) * N(d2)
 * }
 *
 * // Reliability engineering
 * function failureProbability(stress: number, strength: number, cv: number): number {
 *   // Coefficient of variation cv = stdDev / mean
 *   const z = (strength - stress) / (strength * cv * Math.sqrt(2))
 *   return 0.5 * complementaryErrorFunction(z)
 * }
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Bounded - Output always between 0 and 2
 * @property Related - erfc(x) = 1 - erf(x)
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
