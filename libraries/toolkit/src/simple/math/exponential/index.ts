/**
 * Calculates e raised to the power of x (e^x)
 * 
 * Computes the exponential function with base e (Euler's number ≈ 2.71828).
 * This is the inverse of the natural logarithm. The exponential function
 * grows rapidly for positive values and approaches 0 for negative values.
 * Returns NaN for invalid inputs.
 * 
 * @param exponent - The power to raise e to
 * @returns e^exponent, or NaN if invalid
 * @example
 * ```typescript
 * // Common values
 * exponential(0)
 * // 1 (e^0 = 1)
 * 
 * exponential(1)
 * // 2.71828... (e^1 = e)
 * 
 * exponential(2)
 * // 7.38905... (e^2)
 * 
 * // Negative exponents
 * exponential(-1)
 * // 0.36787... (1/e)
 * 
 * exponential(-2)
 * // 0.13533... (1/e^2)
 * 
 * // Natural log inverse
 * exponential(Math.log(5))
 * // 5 (e^ln(5) = 5)
 * 
 * exponential(Math.log(10))
 * // 10
 * 
 * // Small values
 * exponential(0.5)
 * // 1.6487... (√e)
 * 
 * exponential(0.1)
 * // 1.1051...
 * 
 * // Large values (grows rapidly)
 * exponential(5)
 * // 148.413...
 * 
 * exponential(10)
 * // 22026.465...
 * 
 * // Very large/small values
 * exponential(100)
 * // 2.688e+43
 * 
 * exponential(-100)
 * // 3.720e-44 (approaches 0)
 * 
 * // Special values
 * exponential(Infinity)
 * // Infinity
 * 
 * exponential(-Infinity)
 * // 0
 * 
 * // Invalid inputs return NaN
 * exponential(null)
 * // NaN
 * 
 * exponential("2.5")
 * // NaN
 * 
 * // Practical examples
 * 
 * // Compound interest (continuous)
 * const continuousGrowth = (rate: number, time: number) =>
 *   exponential(rate * time)
 * continuousGrowth(0.05, 10)
 * // 1.6487... (64.87% growth)
 * 
 * // Exponential decay
 * const decay = (decayRate: number, time: number) =>
 *   exponential(-decayRate * time)
 * decay(0.1, 5)
 * // 0.6065... (60.65% remaining)
 * 
 * // Probability distributions
 * const poissonProbability = (lambda: number, k: number) => {
 *   const factorial = (n: number): number => 
 *     n <= 1 ? 1 : n * factorial(n - 1)
 *   return exponential(-lambda) * Math.pow(lambda, k) / factorial(k)
 * }
 * 
 * // Sigmoid function component
 * const sigmoid = (x: number) => 
 *   1 / (1 + exponential(-x))
 * sigmoid(0)  // 0.5
 * sigmoid(2)  // 0.8807...
 * 
 * // Population growth
 * const population = (initial: number, rate: number, time: number) =>
 *   initial * exponential(rate * time)
 * population(1000, 0.02, 25)
 * // 1648.72... (after 25 years)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Inverse - Inverse of natural logarithm
 */
const exponential = (
	exponent: number | null | undefined
): number => {
	if (exponent == null || typeof exponent !== 'number') {
		return NaN
	}
	
	return Math.exp(exponent)
}

export default exponential