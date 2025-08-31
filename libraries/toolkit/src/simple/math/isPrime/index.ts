import isNullish from "../../validation/isNullish/index.ts"

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
 * // Small primes
 * isPrime(2)
 * // true
 *
 * isPrime(7)
 * // true
 *
 * isPrime(17)
 * // true
 *
 * // Composite numbers
 * isPrime(4)
 * // false
 *
 * isPrime(9)
 * // false
 *
 * isPrime(100)
 * // false
 *
 * // Edge cases
 * isPrime(1)
 * // false
 *
 * isPrime(2.5)
 * // false
 *
 * isPrime(-7)
 * // false
 *
 * isPrime(null)
 * // false
 * ```
 * @pure Always returns same result for same input
 * @predicate Returns boolean indicating primality
 * @safe Returns false for invalid inputs
 */
const isPrime = (
	n: number | null | undefined,
): boolean => {
	if (isNullish(n) || typeof n !== "number") {
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
