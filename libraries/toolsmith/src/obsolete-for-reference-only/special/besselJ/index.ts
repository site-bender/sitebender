import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function besselJ(
	n: number | null | undefined,
) {
	return function besselJOfOrder(
		x: number | null | undefined,
	): number {
		if (isNullish(n) || typeof n !== "number") {
			return NaN
		}

		if (isNullish(x) || typeof x !== "number") {
			return NaN
		}

		// Order must be non-negative integer
		if (n < 0 || !Number.isInteger(n)) {
			return NaN
		}

		// Handle x = 0 case
		if (x === 0) {
			return n === 0 ? 1 : 0
		}

		// Use symmetry for negative x: J_n(-x) = (-1)^n * J_n(x)
		if (x < 0) {
			return (n % 2 === 0 ? 1 : -1) * besselJ(n)(Math.abs(x))
		}

		// For small x, use series expansion
		// For large x, use asymptotic approximation
		const absX = Math.abs(x)

		if (absX < 15) {
			// Series expansion: J_n(x) = sum_{m=0}^∞ (-1)^m/(m!(n+m)!) * (x/2)^(n+2m)
			let sum = 0
			const halfX = x / 2
			let term = Math.pow(halfX, n) / factorial(n)
			sum = term

			const maxIterations = 50
			function recursiveSum(m: number): number {
				if (m >= maxIterations) return 0
				term *= -halfX * halfX / (m * (n + m))
				if (Math.abs(term) < 1e-15 * Math.abs(sum + term)) {
					return term
				}
				return term + recursiveSum(m + 1)
			}
			sum += recursiveSum(1)

			return sum
		} else {
			// Asymptotic approximation for large x
			// J_n(x) ≈ sqrt(2/(πx)) * cos(x - nπ/2 - π/4)
			const phase = x - n * Math.PI / 2 - Math.PI / 4
			const amplitude = Math.sqrt(2 / (Math.PI * x))

			// Add first correction term for better accuracy
			const correction = 1 - (4 * n * n - 1) / (8 * x * x)

			return amplitude * Math.cos(phase) * correction
		}
	}
}

// Helper function to compute factorial
function factorial(n: number): number {
	if (n <= 1) return 1
	return n * factorial(n - 1)
}
