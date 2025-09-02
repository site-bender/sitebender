import isNullish from "../../validation/isNullish/index.ts"

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
 * primeFactorization(12)
 * // Map { 2 => 2, 3 => 1 }
 *
 * primeFactorization(7)
 * // Map { 7 => 1 } (prime)
 *
 * primeFactorization(8)
 * // Map { 2 => 3 } (perfect power)
 *
 * primeFactorization(60)
 * // Map { 2 => 2, 3 => 1, 5 => 1 }
 *
 * primeFactorization(1)
 * // Map {} (no prime factors)
 *
 * // Reconstruct number from factorization
 * const reconstruct = (factors: Map<number, number>): number =>
 *   Array.from(factors.entries())
 *     .reduce((acc, [prime, power]) => acc * Math.pow(prime, power), 1)
 * const factors = primeFactorization(60)
 * reconstruct(factors) // 60
 *
 * // Count total divisors
 * const countDivisors = (n: number): number =>
 *   Array.from(primeFactorization(n).values())
 *     .reduce((acc, power) => acc * (power + 1), 1)
 * countDivisors(12) // 6
 * ```
 * @pure Always returns same result for same input
 * @safe Returns empty Map for invalid inputs
 * @efficient O(√n) time complexity
 */
const primeFactorization = (
	n: number | null | undefined,
): Map<number, number> => {
	const result = new Map<number, number>()

	if (isNullish(n) || typeof n !== "number") {
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

	// Helper function to count and remove factors
	const extractFactor = (num: number, factor: number): [number, number] => {
		const countFactor = (current: number, acc: number): number =>
			current % factor === 0 ? countFactor(current / factor, acc + 1) : acc
		const count = countFactor(num, 0)
		return [
			count === 0
				? num
				: Math.pow(factor, count) === num
				? 1
				: num / Math.pow(factor, count),
			count,
		]
	}

	// Extract factors recursively
	const factorize = (
		num: number,
		currentFactor: number,
	): Map<number, number> => {
		if (num === 1 || currentFactor * currentFactor > num) {
			return num > 1 ? new Map([[num, 1]]) : new Map()
		}

		const [remaining, count] = extractFactor(num, currentFactor)
		const remainingFactors = factorize(
			remaining,
			currentFactor === 2 ? 3 : currentFactor + 2,
		)

		if (count > 0) {
			remainingFactors.set(currentFactor, count)
		}

		return remainingFactors
	}

	return factorize(n, 2)
}

export default primeFactorization
