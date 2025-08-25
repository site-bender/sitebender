/**
 * Calculates the gamma function Γ(x)
 *
 * Computes the gamma function, which extends factorials to real numbers.
 * For positive integers n, Γ(n) = (n-1)!. Uses Lanczos approximation for
 * real values, accurate to about 10 decimal places. Input must be positive
 * (implementation handles positive values only). Returns NaN for invalid inputs.
 *
 * @param x - Positive real number
 * @returns Gamma of x, or NaN if invalid
 * @example
 * ```typescript
 * // Integer values (factorial relationship)
 * gammaFunction(1)
 * // 1 (0! = 1)
 *
 * gammaFunction(2)
 * // 1 (1! = 1)
 *
 * gammaFunction(3)
 * // 2 (2! = 2)
 *
 * gammaFunction(4)
 * // 6 (3! = 6)
 *
 * gammaFunction(5)
 * // 24 (4! = 24)
 *
 * gammaFunction(6)
 * // 120 (5! = 120)
 *
 * // Half-integer values
 * gammaFunction(0.5)
 * // 1.7724... (√π)
 *
 * gammaFunction(1.5)
 * // 0.8862... (√π/2)
 *
 * gammaFunction(2.5)
 * // 1.3293... (3√π/4)
 *
 * // Fractional values
 * gammaFunction(0.1)
 * // 9.5135...
 *
 * gammaFunction(0.9)
 * // 1.0686...
 *
 * gammaFunction(3.7)
 * // 4.1706...
 *
 * // Large values
 * gammaFunction(10)
 * // 362880 (9!)
 *
 * gammaFunction(15)
 * // 87178291200 (14!)
 *
 * gammaFunction(20.5)
 * // 3.16051e+17
 *
 * // Values near 1 and 2
 * gammaFunction(1.1)
 * // 0.9513...
 *
 * gammaFunction(1.9)
 * // 0.9617...
 *
 * // Invalid inputs return NaN
 * gammaFunction(0)
 * // NaN (pole at 0)
 *
 * gammaFunction(-1)
 * // NaN (negative not supported)
 *
 * gammaFunction(null)
 * // NaN
 *
 * gammaFunction("5")
 * // NaN
 *
 * // Practical examples
 *
 * // Factorial calculation
 * const factorial = (n: number) => {
 *   if (n < 0 || n !== Math.floor(n)) return NaN
 *   return gammaFunction(n + 1)
 * }
 * factorial(5)   // 120
 * factorial(10)  // 3628800
 *
 * // Beta function B(x,y) = Γ(x)Γ(y)/Γ(x+y)
 * const beta = (x: number, y: number) =>
 *   gammaFunction(x) * gammaFunction(y) / gammaFunction(x + y)
 * beta(2, 3)     // 0.0833... (1/12)
 * beta(0.5, 0.5) // 3.1415... (π)
 *
 * // Chi-squared distribution
 * const chiSquaredPDF = (x: number, k: number) => {
 *   if (x <= 0) return 0
 *   const halfK = k / 2
 *   return Math.pow(x, halfK - 1) * Math.exp(-x / 2) /
 *          (Math.pow(2, halfK) * gammaFunction(halfK))
 * }
 * chiSquaredPDF(2, 2)  // 0.1839... (k=2 at x=2)
 *
 * // Volume of n-dimensional sphere
 * const nSphereVolume = (n: number, radius: number) => {
 *   const halfN = n / 2
 *   return Math.pow(Math.PI, halfN) * Math.pow(radius, n) /
 *          gammaFunction(halfN + 1)
 * }
 * nSphereVolume(2, 1)  // 3.1415... (area of circle)
 * nSphereVolume(3, 1)  // 4.1887... (volume of sphere)
 *
 * // Stirling's approximation comparison
 * const stirling = (n: number) =>
 *   Math.sqrt(2 * Math.PI * n) * Math.pow(n / Math.E, n)
 * const exact = gammaFunction(11)     // 3628800 (10!)
 * const approx = stirling(10)         // 3598695.6...
 * const error = Math.abs(exact - approx) / exact  // 0.0083 (0.83% error)
 *
 * // Pochhammer symbol (rising factorial)
 * const pochhammer = (x: number, n: number) =>
 *   gammaFunction(x + n) / gammaFunction(x)
 * pochhammer(3, 4)  // 360 (3×4×5×6)
 * pochhammer(0.5, 3)  // 1.875 (0.5×1.5×2.5)
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Extension - Extends factorial to real numbers
 * @property Accurate - ~10 decimal places via Lanczos approximation
 */
const gammaFunction = (
	x: number | null | undefined,
): number => {
	if (x == null || typeof x !== "number") {
		return NaN
	}

	// Gamma function has poles at non-positive integers
	if (x <= 0) {
		return NaN
	}

	// Lanczos approximation coefficients
	const g = 7
	const coef = [
		0.99999999999980993,
		676.5203681218851,
		-1259.1392167224028,
		771.32342877765313,
		-176.61502916214059,
		12.507343278686905,
		-0.13857109526572012,
		9.9843695780195716e-6,
		1.5056327351493116e-7,
	]

	// For x < 0.5, use reflection formula (not needed here as we only handle positive)

	let z = x - 1
	let sum = coef[0]

	for (let i = 1; i < 9; i++) {
		sum += coef[i] / (z + i)
	}

	const t = z + g + 0.5
	const sqrt2pi = Math.sqrt(2 * Math.PI)

	return sqrt2pi * Math.pow(t, z + 0.5) * Math.exp(-t) * sum
}

export default gammaFunction
