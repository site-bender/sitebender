/**
 * Returns the prime factorization of a positive integer
 * 
 * Decomposes n into its prime factors with their multiplicities, returned
 * as a Map where keys are prime factors and values are their powers.
 * For example, 12 = 2² × 3¹ returns Map {2 => 2, 3 => 1}. Returns an
 * empty Map for invalid inputs or n = 1.
 * 
 * @param n - Positive integer greater than 1 to factorize
 * @returns Map of prime factors to their multiplicities, or empty Map if invalid
 * @example
 * ```typescript
 * // Simple factorizations
 * primeFactorization(12)
 * // Map { 2 => 2, 3 => 1 } (12 = 2² × 3)
 * 
 * primeFactorization(15)
 * // Map { 3 => 1, 5 => 1 } (15 = 3 × 5)
 * 
 * primeFactorization(24)
 * // Map { 2 => 3, 3 => 1 } (24 = 2³ × 3)
 * 
 * // Prime numbers
 * primeFactorization(7)
 * // Map { 7 => 1 } (7 is prime)
 * 
 * primeFactorization(13)
 * // Map { 13 => 1 }
 * 
 * primeFactorization(17)
 * // Map { 17 => 1 }
 * 
 * // Perfect powers
 * primeFactorization(8)
 * // Map { 2 => 3 } (8 = 2³)
 * 
 * primeFactorization(27)
 * // Map { 3 => 3 } (27 = 3³)
 * 
 * primeFactorization(81)
 * // Map { 3 => 4 } (81 = 3⁴)
 * 
 * // Larger numbers
 * primeFactorization(60)
 * // Map { 2 => 2, 3 => 1, 5 => 1 } (60 = 2² × 3 × 5)
 * 
 * primeFactorization(100)
 * // Map { 2 => 2, 5 => 2 } (100 = 2² × 5²)
 * 
 * primeFactorization(360)
 * // Map { 2 => 3, 3 => 2, 5 => 1 } (360 = 2³ × 3² × 5)
 * 
 * // Edge cases
 * primeFactorization(1)
 * // Map {} (1 has no prime factors)
 * 
 * primeFactorization(2)
 * // Map { 2 => 1 } (2 is the smallest prime)
 * 
 * // Invalid inputs
 * primeFactorization(0)
 * // Map {} (invalid)
 * 
 * primeFactorization(-12)
 * // Map {} (negative numbers not supported)
 * 
 * primeFactorization(3.5)
 * // Map {} (non-integer)
 * 
 * primeFactorization(null)
 * // Map {}
 * 
 * // Reconstruct number from factorization
 * const reconstruct = (factors: Map<number, number>): number => {
 *   let result = 1
 *   for (const [prime, power] of factors) {
 *     result *= Math.pow(prime, power)
 *   }
 *   return result
 * }
 * const factors = primeFactorization(60)
 * reconstruct(factors) // 60
 * 
 * // Count total divisors using factorization
 * const countDivisors = (n: number): number => {
 *   const factors = primeFactorization(n)
 *   let count = 1
 *   for (const power of factors.values()) {
 *     count *= (power + 1)
 *   }
 *   return count
 * }
 * countDivisors(12) // 6 (divisors: 1,2,3,4,6,12)
 * 
 * // Check if perfect square
 * const isPerfectSquare = (n: number): boolean => {
 *   const factors = primeFactorization(n)
 *   for (const power of factors.values()) {
 *     if (power % 2 !== 0) return false
 *   }
 *   return true
 * }
 * isPerfectSquare(36) // true (6²)
 * isPerfectSquare(48) // false
 * 
 * // Greatest common divisor via factorization
 * const gcdFactors = (a: number, b: number): number => {
 *   const factorsA = primeFactorization(a)
 *   const factorsB = primeFactorization(b)
 *   let result = 1
 *   for (const [prime, powerA] of factorsA) {
 *     const powerB = factorsB.get(prime) || 0
 *     result *= Math.pow(prime, Math.min(powerA, powerB))
 *   }
 *   return result
 * }
 * gcdFactors(12, 18) // 6
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns empty Map for invalid inputs
 * @property Efficient - O(√n) time complexity
 */
const primeFactorization = (
	n: number | null | undefined
): Map<number, number> => {
	const result = new Map<number, number>()
	
	if (n == null || typeof n !== 'number') {
		return result
	}
	
	// Check for non-integer
	if (!Number.isInteger(n)) {
		return result
	}
	
	// Check for non-positive
	if (n <= 1) {
		return result
	}
	
	let temp = n
	
	// Factor out 2s
	let count = 0
	while (temp % 2 === 0) {
		count++
		temp = temp / 2
	}
	if (count > 0) {
		result.set(2, count)
	}
	
	// Factor out odd primes
	for (let i = 3; i * i <= temp; i += 2) {
		count = 0
		while (temp % i === 0) {
			count++
			temp = temp / i
		}
		if (count > 0) {
			result.set(i, count)
		}
	}
	
	// If temp > 1, then it's a prime factor
	if (temp > 1) {
		result.set(temp, 1)
	}
	
	return result
}

export default primeFactorization