/**
 * Bessel function of the first kind Jn(x)
 *
 * Computes the Bessel function of the first kind using series expansion
 * for small x and asymptotic approximation for large x. Bessel functions
 * are solutions to Bessel's differential equation and appear in wave
 * propagation, heat conduction, and vibration problems with cylindrical
 * symmetry. This implementation supports integer orders n ≥ 0.
 *
 * @curried (n) => (x) => number
 * @param n - Order of the Bessel function (non-negative integer)
 * @param x - Argument value
 * @returns Jn(x) value, or NaN if invalid inputs
 * @example
 * ```typescript
 * // J0(x) - zeroth order
 * besselJ(0)(0)
 * // 1 (J0(0) = 1)
 *
 * besselJ(0)(1)
 * // 0.7651... (J0(1))
 *
 * besselJ(0)(2.4048)
 * // ≈ 0 (first zero of J0)
 *
 * // J1(x) - first order
 * besselJ(1)(0)
 * // 0 (J1(0) = 0)
 *
 * besselJ(1)(1)
 * // 0.4400... (J1(1))
 *
 * besselJ(1)(3.8317)
 * // ≈ 0 (first zero of J1)
 *
 * // Higher orders
 * besselJ(2)(2)
 * // 0.3528...
 *
 * besselJ(3)(3)
 * // 0.3091...
 *
 * besselJ(5)(5)
 * // 0.2611...
 *
 * // Negative arguments (symmetry: J_n(-x) = (-1)^n * J_n(x))
 * besselJ(0)(-2)
 * // 0.2238... (same as J0(2))
 *
 * besselJ(1)(-2)
 * // -0.5767... (negative of J1(2))
 *
 * besselJ(2)(-3)
 * // 0.4860... (same as J2(3))
 *
 * // Large arguments (oscillatory behavior)
 * besselJ(0)(10)
 * // -0.2459...
 *
 * besselJ(1)(10)
 * // 0.0434...
 *
 * // Invalid inputs
 * besselJ(-1)(2)
 * // NaN (negative order)
 *
 * besselJ(1.5)(2)
 * // NaN (non-integer order)
 *
 * besselJ(null)(2)
 * // NaN
 *
 * // Practical examples
 *
 * // Vibrating circular membrane (drum)
 * // Amplitude at radius r for mode (0,1)
 * const drumRadius = 1
 * const firstMode = 2.4048  // First zero of J0
 * const amplitude = (r: number) => besselJ(0)(firstMode * r / drumRadius)
 * amplitude(0)     // 1 (maximum at center)
 * amplitude(0.5)   // 0.4400...
 * amplitude(1)     // ≈ 0 (node at edge)
 *
 * // Diffraction pattern (circular aperture)
 * // Intensity ∝ [2*J1(x)/x]²
 * const diffractionIntensity = (x: number) => {
 *   if (x === 0) return 1
 *   const j1 = besselJ(1)(x)
 *   return Math.pow(2 * j1 / x, 2)
 * }
 *
 * // FM synthesis (frequency modulation)
 * // Carrier amplitude for nth sideband
 * const modulationIndex = 2.5
 * const sideband = (n: number) => besselJ(n)(modulationIndex)
 * sideband(0)  // 0.0483... (carrier)
 * sideband(1)  // 0.4970... (first sideband)
 * sideband(2)  // 0.4460... (second sideband)
 *
 * // Partial application for specific orders
 * const j0 = besselJ(0)
 * const j1 = besselJ(1)
 * const j2 = besselJ(2)
 * [0, 1, 2, 3, 4, 5].map(j0)
 * // [1, 0.7651, 0.2238, -0.2601, -0.3971, -0.1775]
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for specific orders
 * @property Safe - Returns NaN for invalid inputs
 */
const besselJ = (
	n: number | null | undefined,
) =>
(
	x: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	if (x == null || typeof x !== "number") {
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

		for (let m = 1; m < 50; m++) {
			term *= -halfX * halfX / (m * (n + m))
			sum += term

			// Stop when term becomes negligible
			if (Math.abs(term) < 1e-15 * Math.abs(sum)) {
				break
			}
		}

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

// Helper function to compute factorial
const factorial = (n: number): number => {
	if (n <= 1) return 1
	let result = 1
	for (let i = 2; i <= n; i++) {
		result *= i
	}
	return result
}

export default besselJ
