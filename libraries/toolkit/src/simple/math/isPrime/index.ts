/**
 * Checks if a number is prime
 *
 * Determines whether a positive integer greater than 1 has no positive
 * divisors other than 1 and itself. Uses optimized trial division up to
 * the square root. Returns false for numbers less than 2, non-integers,
 * or invalid inputs. Handles large numbers efficiently.
 *
 * @param n - Number to check for primality
 * @returns True if n is prime, false otherwise
 * @example
 * ```typescript
 * // Small prime numbers
 * isPrime(2)
 * // true (smallest prime)
 *
 * isPrime(3)
 * // true
 *
 * isPrime(5)
 * // true
 *
 * isPrime(7)
 * // true
 *
 * isPrime(11)
 * // true
 *
 * isPrime(13)
 * // true
 *
 * // Non-prime numbers
 * isPrime(0)
 * // false
 *
 * isPrime(1)
 * // false (not prime by definition)
 *
 * isPrime(4)
 * // false (2 × 2)
 *
 * isPrime(6)
 * // false (2 × 3)
 *
 * isPrime(8)
 * // false (2 × 4)
 *
 * isPrime(9)
 * // false (3 × 3)
 *
 * isPrime(10)
 * // false (2 × 5)
 *
 * // Larger primes
 * isPrime(17)
 * // true
 *
 * isPrime(23)
 * // true
 *
 * isPrime(29)
 * // true
 *
 * isPrime(31)
 * // true
 *
 * isPrime(37)
 * // true
 *
 * isPrime(41)
 * // true
 *
 * isPrime(97)
 * // true
 *
 * // Larger composites
 * isPrime(100)
 * // false (10 × 10)
 *
 * isPrime(121)
 * // false (11 × 11)
 *
 * isPrime(169)
 * // false (13 × 13)
 *
 * // Mersenne primes
 * isPrime(127)
 * // true (2^7 - 1)
 *
 * isPrime(8191)
 * // true (2^13 - 1)
 *
 * // Large primes
 * isPrime(7919)
 * // true (1000th prime)
 *
 * isPrime(104729)
 * // true (10000th prime)
 *
 * isPrime(1299709)
 * // true (100000th prime)
 *
 * // Carmichael numbers (pseudoprimes)
 * isPrime(561)
 * // false (3 × 11 × 17)
 *
 * isPrime(1105)
 * // false (5 × 13 × 17)
 *
 * // Negative numbers
 * isPrime(-2)
 * // false (primes are positive)
 *
 * isPrime(-7)
 * // false
 *
 * isPrime(-13)
 * // false
 *
 * // Non-integers
 * isPrime(2.5)
 * // false
 *
 * isPrime(3.0)
 * // true (integer value)
 *
 * isPrime(7.1)
 * // false
 *
 * // Special values
 * isPrime(Infinity)
 * // false
 *
 * isPrime(-Infinity)
 * // false
 *
 * isPrime(NaN)
 * // false
 *
 * // Invalid inputs
 * isPrime(null)
 * // false
 *
 * isPrime(undefined)
 * // false
 *
 * isPrime("7")
 * // false
 *
 * isPrime({})
 * // false
 *
 * // Generate prime sequence
 * function generatePrimes(limit: number): Array<number> {
 *   const primes: Array<number> = []
 *   for (let n = 2; n <= limit; n++) {
 *     if (isPrime(n)) {
 *       primes.push(n)
 *     }
 *   }
 *   return primes
 * }
 * generatePrimes(30)
 * // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
 *
 * // Count primes in range
 * function countPrimes(start: number, end: number): number {
 *   let count = 0
 *   for (let n = start; n <= end; n++) {
 *     if (isPrime(n)) count++
 *   }
 *   return count
 * }
 * countPrimes(1, 100)
 * // 25 (there are 25 primes less than 100)
 *
 * // Twin primes
 * function areTwinPrimes(n: number): boolean {
 *   return isPrime(n) && isPrime(n + 2)
 * }
 * areTwinPrimes(11)
 * // true (11 and 13 are twin primes)
 * areTwinPrimes(17)
 * // true (17 and 19)
 * areTwinPrimes(23)
 * // false (25 is not prime)
 *
 * // Sophie Germain primes
 * function isSophieGermainPrime(n: number): boolean {
 *   return isPrime(n) && isPrime(2 * n + 1)
 * }
 * isSophieGermainPrime(11)
 * // true (11 and 23 are both prime)
 *
 * // Prime factorization helper
 * function getPrimeFactors(n: number): Array<number> {
 *   const factors: Array<number> = []
 *   let remaining = n
 *
 *   for (let i = 2; i <= Math.sqrt(remaining); i++) {
 *     while (remaining % i === 0 && isPrime(i)) {
 *       factors.push(i)
 *       remaining /= i
 *     }
 *   }
 *
 *   if (remaining > 1) factors.push(remaining)
 *   return factors
 * }
 * getPrimeFactors(60)
 * // [2, 2, 3, 5]
 *
 * // Goldbach's conjecture test
 * function isGoldbachSum(n: number): boolean {
 *   if (n % 2 !== 0 || n < 4) return false
 *   for (let i = 2; i <= n / 2; i++) {
 *     if (isPrime(i) && isPrime(n - i)) {
 *       return true
 *     }
 *   }
 *   return false
 * }
 * isGoldbachSum(10)
 * // true (3 + 7 or 5 + 5)
 *
 * // Next prime
 * function nextPrime(n: number): number {
 *   let candidate = Math.floor(n) + 1
 *   while (!isPrime(candidate)) {
 *     candidate++
 *   }
 *   return candidate
 * }
 * nextPrime(10)
 * // 11
 * nextPrime(14)
 * // 17
 *
 * // Previous prime
 * function previousPrime(n: number): number | null {
 *   let candidate = Math.floor(n) - 1
 *   while (candidate >= 2) {
 *     if (isPrime(candidate)) return candidate
 *     candidate--
 *   }
 *   return null
 * }
 * previousPrime(10)
 * // 7
 * previousPrime(2)
 * // null
 *
 * // Prime gap
 * function primeGap(n: number): number | null {
 *   if (!isPrime(n)) return null
 *   const next = nextPrime(n)
 *   return next - n
 * }
 * primeGap(7)
 * // 4 (next prime is 11)
 *
 * // Primality testing for RSA key generation
 * function isProbablePrime(n: number, iterations: number = 5): boolean {
 *   // For small numbers, use deterministic test
 *   if (n < 1000) return isPrime(n)
 *   // For larger numbers, would use Miller-Rabin or similar
 *   // This is simplified - real implementation would be more complex
 *   return isPrime(n)
 * }
 *
 * // Euler's totient function helper
 * function coprimeCount(n: number): number {
 *   if (isPrime(n)) return n - 1
 *   // More complex calculation for composites
 *   let count = 0
 *   for (let i = 1; i < n; i++) {
 *     // Check if gcd(i, n) === 1
 *     let a = i, b = n
 *     while (b !== 0) {
 *       const temp = b
 *       b = a % b
 *       a = temp
 *     }
 *     if (a === 1) count++
 *   }
 *   return count
 * }
 *
 * // Circular prime check
 * function isCircularPrime(n: number): boolean {
 *   if (!isPrime(n)) return false
 *   const str = n.toString()
 *   for (let i = 1; i < str.length; i++) {
 *     const rotated = str.slice(i) + str.slice(0, i)
 *     if (!isPrime(parseInt(rotated))) return false
 *   }
 *   return true
 * }
 * isCircularPrime(197)
 * // true (197, 971, 719 are all prime)
 *
 * // Performance test
 * const largeNumber = 1000003
 * isPrime(largeNumber)
 * // true (efficiently computed)
 *
 * // Safe prime check with validation
 * function safeIsPrime(value: unknown): boolean {
 *   return typeof value === 'number' && isPrime(value)
 * }
 * safeIsPrime(7)
 * // true
 * safeIsPrime("7")
 * // false
 * safeIsPrime(null)
 * // false
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns false for invalid inputs
 * @property Efficient - O(√n) time complexity
 * @property Integer-only - Returns false for non-integers
 */
const isPrime = (
	n: number | null | undefined,
): boolean => {
	if (n == null || typeof n !== "number") {
		return false
	}

	// Check for special values
	if (!isFinite(n) || isNaN(n)) {
		return false
	}

	// Check for integer
	if (!Number.isInteger(n)) {
		return false
	}

	// Numbers less than 2 are not prime
	if (n < 2) {
		return false
	}

	// 2 is the only even prime
	if (n === 2) {
		return true
	}

	// Even numbers greater than 2 are not prime
	if (n % 2 === 0) {
		return false
	}

	// Check odd divisors up to sqrt(n)
	const limit = Math.sqrt(n)
	for (let i = 3; i <= limit; i += 2) {
		if (n % i === 0) {
			return false
		}
	}

	return true
}

export default isPrime
