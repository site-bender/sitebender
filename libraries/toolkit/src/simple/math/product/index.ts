/**
 * Multiplies all numbers in an array together
 * 
 * Calculates the product of all numbers in the array by multiplying
 * them together sequentially. Returns 1 for an empty array (multiplicative
 * identity). Returns NaN if any element is not a valid number.
 * 
 * @param numbers - Array of numbers to multiply
 * @returns The product of all numbers, or NaN if invalid input
 * @example
 * ```typescript
 * // Basic multiplication
 * product([2, 3, 4])
 * // 24
 * 
 * product([1, 2, 3, 4, 5])
 * // 120
 * 
 * product([10, 10])
 * // 100
 * 
 * // Single element
 * product([7])
 * // 7
 * 
 * product([0])
 * // 0
 * 
 * product([-5])
 * // -5
 * 
 * // Empty array (multiplicative identity)
 * product([])
 * // 1
 * 
 * // With zero (annihilator)
 * product([1, 2, 0, 3, 4])
 * // 0
 * 
 * product([0, 100, 200])
 * // 0
 * 
 * // Negative numbers
 * product([-2, 3, 4])
 * // -24
 * 
 * product([-2, -3, 4])
 * // 24
 * 
 * product([-1, -1, -1])
 * // -1
 * 
 * product([-2, -2, -2, -2])
 * // 16
 * 
 * // Decimal numbers
 * product([0.5, 2, 4])
 * // 4
 * 
 * product([0.1, 0.2, 0.3])
 * // 0.006
 * 
 * product([1.5, 2.5, 3.5])
 * // 13.125
 * 
 * // Mixed positive and negative
 * product([2, -3, 4, -5])
 * // 120
 * 
 * product([-1, 2, -3, 4])
 * // 24
 * 
 * // With ones (identity elements)
 * product([1, 1, 1, 5])
 * // 5
 * 
 * product([2, 1, 3, 1, 4])
 * // 24
 * 
 * // Large numbers
 * product([100, 200, 300])
 * // 6000000
 * 
 * product([1000, 1000])
 * // 1000000
 * 
 * // Small numbers
 * product([0.001, 0.001, 0.001])
 * // 1e-9
 * 
 * product([0.01, 0.1, 10, 100])
 * // 1
 * 
 * // Special values
 * product([Infinity, 2])
 * // Infinity
 * 
 * product([-Infinity, 2])
 * // -Infinity
 * 
 * product([-Infinity, -2])
 * // Infinity
 * 
 * product([Infinity, 0])
 * // NaN
 * 
 * product([1, 2, NaN])
 * // NaN
 * 
 * // Invalid inputs
 * product(null)
 * // NaN
 * 
 * product(undefined)
 * // NaN
 * 
 * product("not an array")
 * // NaN
 * 
 * product([1, "2", 3])
 * // NaN
 * 
 * product([1, null, 3])
 * // NaN
 * 
 * product([1, undefined, 3])
 * // NaN
 * 
 * product([1, {}, 3])
 * // NaN
 * 
 * // Factorial implementation
 * const factorial = (n: number): number => 
 *   product(Array.from({ length: n }, (_, i) => i + 1))
 * factorial(5)
 * // 120
 * factorial(0)
 * // 1
 * 
 * // Geometric mean helper
 * const geometricMean = (values: Array<number>): number => {
 *   const prod = product(values)
 *   return Math.pow(prod, 1 / values.length)
 * }
 * geometricMean([2, 8])
 * // 4
 * geometricMean([1, 3, 9, 27])
 * // 6.24...
 * 
 * // Probability calculations (independent events)
 * const probabilities = [0.5, 0.8, 0.9]
 * const combinedProbability = product(probabilities)
 * // 0.36
 * 
 * // Compound growth factors
 * const growthRates = [1.05, 1.08, 1.03, 1.07]
 * const totalGrowth = product(growthRates)
 * // 1.247...
 * 
 * // Volume calculation
 * const dimensions = [10, 20, 30]
 * const volume = product(dimensions)
 * // 6000
 * 
 * // Matrix determinant helper (2x2)
 * const det2x2 = (a: number, b: number, c: number, d: number) =>
 *   product([a, d]) - product([b, c])
 * det2x2(1, 2, 3, 4)
 * // -2
 * 
 * // Powers of a number
 * const powersOf2 = [2, 2, 2, 2, 2]
 * product(powersOf2)
 * // 32
 * 
 * // Scale factors
 * const scales = [2, 0.5, 4, 0.25]
 * const totalScale = product(scales)
 * // 1
 * 
 * // Currency conversion chain
 * const conversionRates = [1.18, 0.85, 1.32]
 * const finalRate = product(conversionRates)
 * // 1.32...
 * 
 * // Discount factors
 * const discounts = [0.9, 0.8, 0.95] // 10%, 20%, 5% off
 * const finalPriceRatio = product(discounts)
 * // 0.684 (68.4% of original)
 * 
 * // Gear ratios
 * const gearRatios = [3, 2, 4]
 * const totalRatio = product(gearRatios)
 * // 24
 * 
 * // Combinatorial calculations
 * const choices = [3, 4, 2] // 3 shirts, 4 pants, 2 shoes
 * const totalCombinations = product(choices)
 * // 24
 * 
 * // Scientific notation mantissas
 * const mantissas = [3.0, 2.0, 5.0]
 * const combinedMantissa = product(mantissas)
 * // 30
 * 
 * // Risk factors (multiplicative)
 * const survivalRates = [0.99, 0.98, 0.97, 0.96]
 * const overallSurvival = product(survivalRates)
 * // 0.903...
 * 
 * // Polynomial evaluation helper
 * const evaluatePoly = (coeffs: Array<number>, x: number) =>
 *   coeffs.map((c, i) => c * Math.pow(x, i))
 *     .reduce((sum, term) => sum + term, 0)
 * // Not directly using product, but related
 * 
 * // Aspect ratio chain
 * const aspectRatios = [16/9, 3/4, 4/3]
 * const finalAspect = product(aspectRatios)
 * // 1.777...
 * 
 * // Quality degradation
 * const qualityFactors = [0.95, 0.98, 0.97, 0.99]
 * const finalQuality = product(qualityFactors)
 * // 0.894...
 * 
 * // Pipeline with validation
 * const numbers = [2, 3, 4]
 * const doubled = numbers.map(n => n * 2)
 * const result = product(doubled)
 * // 192
 * 
 * // Safe product with validation
 * const safeProduct = (values: unknown): number | null => {
 *   if (!Array.isArray(values)) return null
 *   const result = product(values)
 *   return isNaN(result) ? null : result
 * }
 * safeProduct([1, 2, 3])
 * // 6
 * safeProduct("invalid")
 * // null
 * safeProduct([1, "2", 3])
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Identity - Returns 1 for empty array
 * @property Annihilator - Returns 0 if any element is 0
 */
const product = (
	numbers: Array<number> | null | undefined
): number => {
	if (numbers == null || !Array.isArray(numbers)) {
		return NaN
	}
	
	if (numbers.length === 0) {
		return 1 // multiplicative identity
	}
	
	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		num => num == null || typeof num !== 'number' || isNaN(num)
	)
	
	if (hasInvalidValue) {
		return NaN
	}
	
	// Calculate product using reduce
	return numbers.reduce((acc, num) => acc * num, 1)
}

export default product