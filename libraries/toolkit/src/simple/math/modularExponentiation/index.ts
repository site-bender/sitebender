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
 * // Simple cases
 * modularExponentiation(2)(3)(5)
 * // 3 (2^3 = 8, 8 mod 5 = 3)
 *
 * modularExponentiation(3)(4)(7)
 * // 4 (3^4 = 81, 81 mod 7 = 4)
 *
 * modularExponentiation(5)(2)(10)
 * // 5 (5^2 = 25, 25 mod 10 = 5)
 *
 * // Large exponents (would overflow without modular arithmetic)
 * modularExponentiation(2)(100)(13)
 * // 3 (2^100 mod 13 = 3)
 *
 * modularExponentiation(3)(1000)(7)
 * // 4 (3^1000 mod 7 = 4)
 *
 * // Edge cases
 * modularExponentiation(0)(5)(10)
 * // 0 (0^5 = 0)
 *
 * modularExponentiation(5)(0)(10)
 * // 1 (any number^0 = 1)
 *
 * modularExponentiation(1)(1000000)(7)
 * // 1 (1^anything = 1)
 *
 * // Negative base (works with modular arithmetic)
 * modularExponentiation(-2)(3)(5)
 * // 2 ((-2)^3 = -8, -8 mod 5 = 2)
 *
 * // Invalid inputs
 * modularExponentiation(2)(-1)(5)
 * // NaN (negative exponent)
 *
 * modularExponentiation(2)(3)(0)
 * // NaN (modulus must be positive)
 *
 * modularExponentiation(2.5)(3)(5)
 * // NaN (non-integer base)
 *
 * // Cryptographic example (RSA-like)
 * const message = 42
 * const publicExp = 65537
 * const modulus = 3233 // small example
 * const encrypted = modularExponentiation(message)(publicExp)(modulus)
 *
 * // Fermat's Little Theorem test
 * // If p is prime, then a^(p-1) ≡ 1 (mod p) for a not divisible by p
 * modularExponentiation(2)(10)(11) // 11 is prime
 * // 1 (2^10 mod 11 = 1, confirming theorem)
 *
 * // Partial application for fixed modulus
 * const mod7 = (base: number) => (exp: number) =>
 *   modularExponentiation(base)(exp)(7)
 * mod7(2)(3) // 1
 * mod7(3)(4) // 4
 * mod7(5)(2) // 4
 *
 * // Power cycling detection
 * const base = 3
 * const mod = 7
 * const powers = Array.from({length: 10}, (_, i) =>
 *   modularExponentiation(base)(i)(mod)
 * )
 * // [1, 3, 2, 6, 4, 5, 1, 3, 2, 6] (cycle repeats every 6)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Efficient - O(log n) time complexity
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
	let normalizedBase = base % modulus
	if (normalizedBase < 0) {
		normalizedBase += modulus
	}

	// Binary exponentiation algorithm
	let result = 1
	let currentBase = normalizedBase
	let currentExp = exponent

	while (currentExp > 0) {
		// If current exponent is odd, multiply result by base
		if (currentExp % 2 === 1) {
			result = (result * currentBase) % modulus
		}

		// Square the base and halve the exponent
		currentBase = (currentBase * currentBase) % modulus
		currentExp = Math.floor(currentExp / 2)
	}

	return result
}

export default modularExponentiation
