/**
 * Calculates the logarithm of a number with a specified base
 *
 * Computes log_base(value) using the change of base formula:
 * log_b(x) = ln(x) / ln(b). When base is Math.E, returns the natural
 * logarithm. When base is 10, returns the common logarithm. Returns
 * NaN for invalid inputs, negative values, or base = 1.
 *
 * @param base - The logarithm base (must be positive and not 1)
 * @param value - The number to take the logarithm of (must be positive)
 * @returns Logarithm of value to the specified base, or NaN if invalid
 * @example
 * ```typescript
 * // Common logarithm (base 10)
 * logarithm(10)(100)
 * // 2
 *
 * logarithm(10)(1000)
 * // 3
 *
 * // Binary logarithm (base 2)
 * logarithm(2)(8)
 * // 3
 *
 * logarithm(2)(256)
 * // 8
 *
 * // Natural logarithm (base e)
 * logarithm(Math.E)(Math.E)
 * // 1
 *
 * // Invalid inputs
 * logarithm(1)(10)
 * // NaN
 *
 * logarithm(10)(-5)
 * // NaN
 *
 * logarithm(10)(0)
 * // -Infinity
 *
 * // Partial application
 * const log2 = logarithm(2)
 * log2(16)
 * // 4
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application for specific bases
 * @safe Returns NaN for invalid inputs
 */
const logarithm = (
	base: number | null | undefined,
) =>
(
	value: number | null | undefined,
): number => {
	if (base == null || typeof base !== "number") {
		return NaN
	}

	if (value == null || typeof value !== "number") {
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
