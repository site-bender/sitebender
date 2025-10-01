import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
