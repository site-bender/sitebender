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
 * gammaFunction(1) // 1 (0! = 1)
 * gammaFunction(5) // 24 (4! = 24)
 * gammaFunction(10) // 362880 (9!)
 * 
 * // Half-integer values
 * gammaFunction(0.5) // 1.7724... (√π)
 * gammaFunction(1.5) // 0.8862... (√π/2)
 * 
 * // Factorial calculation
 * const factorial = (n: number) => {
 *   if (n < 0 || n !== Math.floor(n)) return NaN
 *   return gammaFunction(n + 1)
 * }
 * 
 * // Beta function B(x,y) = Γ(x)Γ(y)/Γ(x+y)
 * const beta = (x: number, y: number) =>
 *   gammaFunction(x) * gammaFunction(y) / gammaFunction(x + y)
 * 
 * // Edge cases
 * gammaFunction(0) // NaN (pole at 0)
 * gammaFunction(-1) // NaN (negative not supported)
 * ```
 * @pure
 * @safe
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

	const addCoefficients = (i: number): number => {
		if (i >= 9) return 0
		return coef[i] / (z + i) + addCoefficients(i + 1)
	}
	sum += addCoefficients(1)

	const t = z + g + 0.5
	const sqrt2pi = Math.sqrt(2 * Math.PI)

	return sqrt2pi * Math.pow(t, z + 0.5) * Math.exp(-t) * sum
}

export default gammaFunction
