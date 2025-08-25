import gcd from "../gcd/index.ts"

/**
 * Calculates Euler's totient function φ(n)
 *
 * Counts the positive integers up to n that are relatively prime to n
 * (i.e., their greatest common divisor with n is 1). Also known as
 * Euler's phi function. For prime numbers p, φ(p) = p - 1. Returns
 * NaN for non-positive integers or invalid inputs.
 *
 * @param n - Positive integer to calculate totient of
 * @returns φ(n), the count of integers coprime to n, or NaN if invalid
 * @example
 * ```typescript
 * // Prime numbers: φ(p) = p - 1
 * totient(7)
 * // 6 (1,2,3,4,5,6 are all coprime to 7)
 *
 * totient(11)
 * // 10
 *
 * // Composite numbers
 * totient(9)
 * // 6 (1,2,4,5,7,8 are coprime to 9)
 *
 * totient(10)
 * // 4 (1,3,7,9 are coprime to 10)
 *
 * // Powers of primes: φ(p^k) = p^k - p^(k-1)
 * totient(8) // 2^3
 * // 4
 *
 * totient(25) // 5^2
 * // 20
 *
 * // Special case
 * totient(1)
 * // 1
 *
 * // RSA cryptography relation
 * const p = 11, q = 13
 * const n = p * q // 143
 * const phiN = totient(n)
 * // 120 (which equals (11-1) * (13-1))
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const totient = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	// Check for non-integer
	if (!Number.isInteger(n)) {
		return NaN
	}

	// Check for non-positive
	if (n <= 0) {
		return NaN
	}

	// Special case for n = 1
	if (n === 1) {
		return 1
	}

	// Use the formula: φ(n) = n * Π(1 - 1/p) for all prime factors p
	// We'll implement this by factorizing and applying the formula
	let result = n
	let temp = n

	// Check for factor of 2
	if (temp % 2 === 0) {
		result = result / 2
		while (temp % 2 === 0) {
			temp = temp / 2
		}
	}

	// Check for odd factors
	for (let i = 3; i * i <= temp; i += 2) {
		if (temp % i === 0) {
			result = result - result / i
			while (temp % i === 0) {
				temp = temp / i
			}
		}
	}

	// If temp > 1, then it's a prime factor
	if (temp > 1) {
		result = result - result / temp
	}

	return Math.floor(result)
}

export default totient
