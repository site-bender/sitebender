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
 * // 10 (all numbers 1-10 are coprime to 11)
 * 
 * totient(13)
 * // 12
 * 
 * // Composite numbers
 * totient(9)
 * // 6 (1,2,4,5,7,8 are coprime to 9)
 * 
 * totient(10)
 * // 4 (1,3,7,9 are coprime to 10)
 * 
 * totient(12)
 * // 4 (1,5,7,11 are coprime to 12)
 * 
 * // Powers of primes: φ(p^k) = p^k - p^(k-1)
 * totient(8) // 2^3
 * // 4 (φ(8) = 8 - 4 = 4: numbers 1,3,5,7)
 * 
 * totient(25) // 5^2
 * // 20 (φ(25) = 25 - 5 = 20)
 * 
 * // Special cases
 * totient(1)
 * // 1 (by definition, 1 is coprime to itself)
 * 
 * totient(2)
 * // 1 (only 1 is coprime to 2)
 * 
 * // Invalid inputs
 * totient(0)
 * // NaN (must be positive)
 * 
 * totient(-5)
 * // NaN (must be positive)
 * 
 * totient(3.5)
 * // NaN (must be integer)
 * 
 * totient(null)
 * // NaN
 * 
 * // RSA cryptography relation
 * // For RSA with primes p and q:
 * // n = p * q
 * // φ(n) = (p-1) * (q-1)
 * const p = 11, q = 13
 * const n = p * q // 143
 * const phiN = totient(n)
 * // 120 (which equals (11-1) * (13-1))
 * 
 * // Euler's theorem application
 * // If gcd(a,n) = 1, then a^φ(n) ≡ 1 (mod n)
 * const checkEuler = (a: number, n: number): boolean => {
 *   if (gcd(a)(n) !== 1) return false
 *   const phi = totient(n)
 *   // Would use modularExponentiation here
 *   return true // simplified
 * }
 * 
 * // Counting reduced fractions
 * // φ(n) counts irreducible fractions with denominator n
 * const n = 6
 * const phi = totient(n) // 2
 * // Fractions: 1/6 and 5/6 are in lowest terms
 * 
 * // Sum of totients equals n (for divisors)
 * // Σ φ(d) = n where d divides n
 * const divisorsOf12 = [1, 2, 3, 4, 6, 12]
 * const sum = divisorsOf12.map(totient).reduce((a, b) => a + b)
 * // 12 (1 + 1 + 2 + 2 + 2 + 4 = 12)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Domain - Only valid for positive integers
 */
const totient = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
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