import isNullish from "../../validation/isNullish/index.ts"

/**
 * Bessel function of the first kind Jn(x)
 *
 * Computes the Bessel function of the first kind using series expansion
 * for small x and asymptotic approximation for large x. Bessel functions
 * are solutions to Bessel's differential equation and appear in wave
 * propagation, heat conduction, and vibration problems with cylindrical
 * symmetry. This implementation supports integer orders n ≥ 0.
 *
 * @param n - Order of the Bessel function (non-negative integer)
 * @param x - Argument value
 * @returns Jn(x) value, or NaN if invalid inputs
 * @example
 * ```typescript
 * // J0(x) - zeroth order
 * besselJ(0)(0) // 1 (J0(0) = 1)
 * besselJ(0)(2.4048) // ≈ 0 (first zero of J0)
 *
 * // J1(x) - first order
 * besselJ(1)(0) // 0 (J1(0) = 0)
 * besselJ(1)(1) // 0.4400... (J1(1))
 *
 * // Vibrating circular membrane
 * const drumRadius = 1
 * const firstMode = 2.4048  // First zero of J0
 * const amplitude = (r: number) => besselJ(0)(firstMode * r / drumRadius)
 *
 * // FM synthesis sidebands
 * const modulationIndex = 2.5
 * const sideband = (n: number) => besselJ(n)(modulationIndex)
 *
 * // Edge cases
 * besselJ(-1)(2) // NaN (negative order)
 * besselJ(1.5)(2) // NaN (non-integer order)
 * ```
 * @pure
 * @curried
 * @safe
 */
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
