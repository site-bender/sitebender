/**
 * Calculates the logarithm of a number with a specified base
 * 
 * Computes log_base(value) using the change of base formula:
 * log_b(x) = ln(x) / ln(b). When base is Math.E, returns the natural
 * logarithm. When base is 10, returns the common logarithm. Returns
 * NaN for invalid inputs, negative values, or base = 1.
 * 
 * @curried (base) => (value) => logarithm
 * @param base - The logarithm base (must be positive and not 1)
 * @param value - The number to take the logarithm of (must be positive)
 * @returns Logarithm of value to the specified base, or NaN if invalid
 * @example
 * ```typescript
 * // Natural logarithm (base e)
 * logarithm(Math.E)(Math.E)
 * // 1
 * 
 * logarithm(Math.E)(1)
 * // 0
 * 
 * logarithm(Math.E)(2.718281828)
 * // 1 (approximately)
 * 
 * // Common logarithm (base 10)
 * logarithm(10)(100)
 * // 2
 * 
 * logarithm(10)(1000)
 * // 3
 * 
 * logarithm(10)(0.01)
 * // -2
 * 
 * // Binary logarithm (base 2)
 * logarithm(2)(8)
 * // 3
 * 
 * logarithm(2)(256)
 * // 8
 * 
 * logarithm(2)(0.5)
 * // -1
 * 
 * // Arbitrary bases
 * logarithm(3)(27)
 * // 3 (3^3 = 27)
 * 
 * logarithm(5)(125)
 * // 3 (5^3 = 125)
 * 
 * // Identity: log_b(b) = 1
 * logarithm(7)(7)
 * // 1
 * 
 * // Zero: log_b(1) = 0
 * logarithm(100)(1)
 * // 0
 * 
 * // Invalid inputs return NaN
 * logarithm(1)(10)
 * // NaN (base 1 is undefined)
 * 
 * logarithm(10)(-5)
 * // NaN (negative values)
 * 
 * logarithm(0)(10)
 * // NaN (base must be positive)
 * 
 * logarithm(10)(0)
 * // -Infinity (log of zero)
 * 
 * logarithm(null)(10)
 * // NaN
 * 
 * // Practical examples
 * 
 * // pH calculation (-log10 of H+ concentration)
 * const pH = (hConcentration: number) => -logarithm(10)(hConcentration)
 * pH(1e-7)
 * // 7 (neutral pH)
 * 
 * // Information entropy (bits)
 * const bitsRequired = logarithm(2)
 * bitsRequired(256)
 * // 8 (bits to represent 256 values)
 * 
 * // Partial application for specific bases
 * const log2 = logarithm(2)
 * const log10 = logarithm(10)
 * const ln = logarithm(Math.E)
 * 
 * log2(16)   // 4
 * log10(100) // 2
 * ln(Math.E) // 1
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for specific bases
 * @property Safe - Returns NaN for invalid inputs
 */
const logarithm = (
	base: number | null | undefined
) => (
	value: number | null | undefined
): number => {
	if (base == null || typeof base !== 'number') {
		return NaN
	}
	
	if (value == null || typeof value !== 'number') {
		return NaN
	}
	
	// Base must be positive and not 1
	if (base <= 0 || base === 1) {
		return NaN
	}
	
	// Value must be positive (0 returns -Infinity)
	if (value < 0) {
		return NaN
	}
	
	// Use change of base formula: log_b(x) = ln(x) / ln(b)
	return Math.log(value) / Math.log(base)
}

export default logarithm