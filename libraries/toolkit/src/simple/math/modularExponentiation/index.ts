/**
 * Performs efficient modular exponentiation
 *
 * Calculates (base^exponent) mod modulus efficiently using the binary
 * exponentiation algorithm (exponentiation by squaring). This avoids
 * overflow for large exponents and is essential for cryptographic
 * operations. Returns NaN for invalid inputs (non-integers, negative
 * exponent, non-positive modulus).
 *
 * @curried (base) => (exponent) => (modulus) => number
 * @param base - Base number (integer)
 * @param exponent - Exponent (non-negative integer)
 * @param modulus - Modulus (positive integer)
 * @returns (base^exponent) mod modulus, or NaN if invalid
 * @example
 * ```typescript
 * modularExponentiation(2)(3)(5)
 * // 3 (2^3 = 8, 8 mod 5 = 3)
 *
 * modularExponentiation(2)(100)(13)
 * // 3 (efficient for large exponents)
 *
 * modularExponentiation(5)(0)(10)
 * // 1 (any number^0 = 1)
 *
 * modularExponentiation(-2)(3)(5)
 * // 2 ((-2)^3 = -8, -8 mod 5 = 2)
 *
 * // Fermat's Little Theorem
 * modularExponentiation(2)(10)(11)
 * // 1 (2^10 mod 11 = 1)
 *
 * // Cryptographic example
 * const encrypted = modularExponentiation(42)(65537)(3233)
 *
 * // Power cycling detection
 * const powers = Array.from({length: 6}, (_, i) =>
 *   modularExponentiation(3)(i)(7)
 * )
 * // [1, 3, 2, 6, 4, 5]
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs
 * @efficient O(log n) time complexity
 */
const modularExponentiation = (
	base: number | null | undefined,
) =>
(
	exponent: number | null | undefined,
) =>
(
	modulus: number | null | undefined,
): number => {
	if (base == null || typeof base !== "number") {
		return NaN
	}

	if (exponent == null || typeof exponent !== "number") {
		return NaN
	}

	if (modulus == null || typeof modulus !== "number") {
		return NaN
	}

	// Check for non-integers
	if (
		!Number.isInteger(base) || !Number.isInteger(exponent) ||
		!Number.isInteger(modulus)
	) {
		return NaN
	}

	// Check for negative exponent
	if (exponent < 0) {
		return NaN
	}

	// Check for non-positive modulus
	if (modulus <= 0) {
		return NaN
	}

	// Handle edge cases
	if (modulus === 1) {
		return 0
	}

	if (exponent === 0) {
		return 1
	}

	// Normalize base to be positive within modulus range
	const normalizedBase = base % modulus < 0
		? (base % modulus) + modulus
		: base % modulus

	// Binary exponentiation algorithm (recursive functional approach)
	const binaryPower = (
		result: number,
		currentBase: number,
		currentExp: number,
	): number => {
		if (currentExp === 0) {
			return result
		}

		const newResult = currentExp % 2 === 1
			? (result * currentBase) % modulus
			: result

		return binaryPower(
			newResult,
			(currentBase * currentBase) % modulus,
			Math.floor(currentExp / 2),
		)
	}

	return binaryPower(1, normalizedBase, exponent)
}

export default modularExponentiation
