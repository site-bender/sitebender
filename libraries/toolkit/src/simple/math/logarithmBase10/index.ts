/**
 * Calculates the base-10 (common) logarithm of a number
 * 
 * Computes log₁₀(x), the power to which 10 must be raised to get x.
 * Commonly used in scientific notation, pH calculations, decibels,
 * and order of magnitude comparisons. Input must be positive.
 * Returns NaN for non-positive or invalid inputs.
 * 
 * @param x - Positive number
 * @returns Base-10 logarithm of x, or NaN if invalid
 * @example
 * ```typescript
 * // Powers of 10
 * logarithmBase10(1)
 * // 0 (10^0 = 1)
 * 
 * logarithmBase10(10)
 * // 1 (10^1 = 10)
 * 
 * logarithmBase10(100)
 * // 2 (10^2 = 100)
 * 
 * logarithmBase10(1000)
 * // 3 (10^3 = 1000)
 * 
 * logarithmBase10(0.1)
 * // -1 (10^-1 = 0.1)
 * 
 * logarithmBase10(0.01)
 * // -2 (10^-2 = 0.01)
 * 
 * // Common values
 * logarithmBase10(2)
 * // 0.301... (log₁₀(2))
 * 
 * logarithmBase10(5)
 * // 0.698... (log₁₀(5))
 * 
 * logarithmBase10(50)
 * // 1.698... (log₁₀(50))
 * 
 * logarithmBase10(1000000)
 * // 6 (one million)
 * 
 * logarithmBase10(0.000001)
 * // -6 (one millionth)
 * 
 * // Scientific notation
 * logarithmBase10(6.022e23)
 * // 23.78... (Avogadro's number)
 * 
 * logarithmBase10(1.6e-19)
 * // -18.795... (elementary charge)
 * 
 * // Invalid inputs return NaN
 * logarithmBase10(0)
 * // NaN (log of 0 undefined)
 * 
 * logarithmBase10(-10)
 * // NaN (log of negative undefined)
 * 
 * logarithmBase10(null)
 * // NaN
 * 
 * logarithmBase10("100")
 * // NaN
 * 
 * // Practical examples
 * 
 * // pH calculation (pH = -log₁₀[H+])
 * const pH = (hydrogenConcentration: number) =>
 *   -logarithmBase10(hydrogenConcentration)
 * pH(1e-7)   // 7 (neutral)
 * pH(1e-3)   // 3 (acidic)
 * pH(1e-11)  // 11 (basic)
 * 
 * // Decibel calculation
 * const decibels = (power: number, reference: number) =>
 *   10 * logarithmBase10(power / reference)
 * decibels(1, 0.001)     // 30 dB
 * decibels(100, 1)       // 20 dB
 * 
 * // Order of magnitude
 * const orderOfMagnitude = (n: number) =>
 *   Math.floor(logarithmBase10(Math.abs(n)))
 * orderOfMagnitude(350)      // 2 (hundreds)
 * orderOfMagnitude(0.005)    // -3 (thousandths)
 * orderOfMagnitude(7.5e9)    // 9 (billions)
 * 
 * // Richter scale (earthquake magnitude)
 * const richterMagnitude = (amplitude: number, reference = 1) =>
 *   logarithmBase10(amplitude / reference)
 * richterMagnitude(1000)     // 3.0
 * richterMagnitude(100000)   // 5.0
 * 
 * // Number of digits in integer
 * const digitCount = (n: number) =>
 *   Math.floor(logarithmBase10(Math.abs(n))) + 1
 * digitCount(42)       // 2 digits
 * digitCount(1000)     // 4 digits
 * digitCount(9999999)  // 7 digits
 * 
 * // Scientific notation exponent
 * const scientificExponent = (n: number) =>
 *   Math.floor(logarithmBase10(Math.abs(n)))
 * scientificExponent(3.5e8)   // 8
 * scientificExponent(0.00042) // -4
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Input must be positive
 * @property Monotonic - Strictly increasing for positive inputs
 */
const logarithmBase10 = (
	x: number | null | undefined
): number => {
	if (x == null || typeof x !== 'number') {
		return NaN
	}
	
	if (x <= 0) {
		return NaN
	}
	
	return Math.log10(x)
}

export default logarithmBase10