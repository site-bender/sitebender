/**
 * Multiplies two numbers together
 * 
 * Performs multiplication of two numbers with curried application for
 * functional composition. Returns the product of the multiplicand and
 * multiplier. Returns NaN if either input is not a valid number,
 * enabling safe error propagation in functional pipelines.
 * 
 * @curried (multiplicand) => (multiplier) => product
 * @param multiplicand - First number (the number to be multiplied)
 * @param multiplier - Second number (the number to multiply by)
 * @returns Product of the two numbers, or NaN if invalid
 * @example
 * ```typescript
 * // Basic multiplication
 * multiply(2)(3)
 * // 6
 * 
 * multiply(5)(4)
 * // 20
 * 
 * multiply(7)(8)
 * // 56
 * 
 * // Negative numbers
 * multiply(-5)(3)
 * // -15
 * 
 * multiply(-10)(-2)
 * // 20
 * 
 * multiply(5)(-3)
 * // -15
 * 
 * // Decimal numbers
 * multiply(1.5)(2)
 * // 3
 * 
 * multiply(0.5)(0.5)
 * // 0.25
 * 
 * multiply(2.5)(4)
 * // 10
 * 
 * // Zero multiplication (annihilator)
 * multiply(0)(5)
 * // 0
 * 
 * multiply(100)(0)
 * // 0
 * 
 * multiply(0)(0)
 * // 0
 * 
 * // One multiplication (identity)
 * multiply(1)(5)
 * // 5
 * 
 * multiply(5)(1)
 * // 5
 * 
 * multiply(1)(1)
 * // 1
 * 
 * // Large numbers
 * multiply(1000000)(2)
 * // 2000000
 * 
 * multiply(999)(999)
 * // 998001
 * 
 * // Very small numbers
 * multiply(0.001)(0.001)
 * // 0.000001
 * 
 * multiply(0.0001)(10000)
 * // 1
 * 
 * // Special values
 * multiply(Infinity)(2)
 * // Infinity
 * 
 * multiply(-Infinity)(2)
 * // -Infinity
 * 
 * multiply(-Infinity)(-1)
 * // Infinity
 * 
 * multiply(Infinity)(0)
 * // NaN
 * 
 * multiply(5)(NaN)
 * // NaN
 * 
 * multiply(NaN)(NaN)
 * // NaN
 * 
 * // Invalid inputs return NaN
 * multiply(null)(5)
 * // NaN
 * 
 * multiply(5)(undefined)
 * // NaN
 * 
 * multiply("5")(3)
 * // NaN
 * 
 * multiply(5)("3")
 * // NaN
 * 
 * multiply({})(5)
 * // NaN
 * 
 * // Partial application
 * const double = multiply(2)
 * double(5)
 * // 10
 * double(21)
 * // 42
 * 
 * const triple = multiply(3)
 * triple(7)
 * // 21
 * triple(11)
 * // 33
 * 
 * const halve = multiply(0.5)
 * halve(10)
 * // 5
 * halve(7)
 * // 3.5
 * 
 * const negate = multiply(-1)
 * negate(5)
 * // -5
 * negate(-3)
 * // 3
 * 
 * // Array operations
 * const numbers = [1, 2, 3, 4, 5]
 * numbers.map(multiply(10))
 * // [10, 20, 30, 40, 50]
 * 
 * numbers.map(multiply(0.1))
 * // [0.1, 0.2, 0.3, 0.4, 0.5]
 * 
 * // Calculating area
 * const rectangleArea = (length: number) => multiply(length)
 * const area = rectangleArea(5)(3)
 * // 15
 * 
 * // Percentage calculations
 * const percentOf = (percent: number) => multiply(percent / 100)
 * percentOf(25)(80)
 * // 20
 * 
 * percentOf(15)(200)
 * // 30
 * 
 * // Tax calculations
 * const withTax = (rate: number) => (amount: number) => 
 *   amount + multiply(rate)(amount)
 * const with8PercentTax = withTax(0.08)
 * with8PercentTax(100)
 * // 108
 * 
 * // Discount calculations
 * const applyDiscount = (discount: number) => 
 *   multiply(1 - discount)
 * const twentyPercentOff = applyDiscount(0.2)
 * twentyPercentOff(50)
 * // 40
 * 
 * // Currency conversion
 * const usdToEur = multiply(0.85)
 * usdToEur(100)
 * // 85
 * 
 * const eurToUsd = multiply(1.18)
 * eurToUsd(100)
 * // 118
 * 
 * // Scale transformations
 * const scale2x = multiply(2)
 * const scale3x = multiply(3)
 * const scaleHalf = multiply(0.5)
 * 
 * scale2x(50)
 * // 100
 * scale3x(50)
 * // 150
 * scaleHalf(50)
 * // 25
 * 
 * // Physics calculations
 * const force = (mass: number) => (acceleration: number) => 
 *   multiply(mass)(acceleration)
 * force(10)(9.8)
 * // 98
 * 
 * // Compound interest factor
 * const compound = (rate: number) => (periods: number) => 
 *   Math.pow(multiply(1 + rate)(1), periods)
 * compound(0.05)(3)
 * // 1.157625
 * 
 * // Array product using reduce
 * const values = [2, 3, 4]
 * values.reduce((acc, val) => multiply(acc)(val), 1)
 * // 24
 * 
 * // Matrix scalar multiplication
 * const matrix = [[1, 2], [3, 4]]
 * const scalarMultiply = (scalar: number) => (matrix: Array<Array<number>>) =>
 *   matrix.map(row => row.map(multiply(scalar)))
 * scalarMultiply(2)(matrix)
 * // [[2, 4], [6, 8]]
 * 
 * // Powers of 2
 * const powerOfTwo = (n: number): number => 
 *   n === 0 ? 1 : multiply(2)(powerOfTwo(n - 1))
 * powerOfTwo(3)
 * // 8
 * 
 * // Factorial helper
 * const factorial = (n: number): number =>
 *   n <= 1 ? 1 : multiply(n)(factorial(n - 1))
 * factorial(5)
 * // 120
 * 
 * // Geometric sequence
 * const geometric = (first: number) => (ratio: number) => (n: number) =>
 *   multiply(first)(Math.pow(ratio, n))
 * const sequence = geometric(2)(3)
 * sequence(0)
 * // 2
 * sequence(1)
 * // 6
 * sequence(2)
 * // 18
 * 
 * // Complex number multiplication (real part only)
 * const complexMultiplyReal = (a: number, b: number, c: number, d: number) =>
 *   multiply(a)(c) - multiply(b)(d)
 * complexMultiplyReal(3, 2, 1, 4)
 * // -5
 * 
 * // Safe multiply with validation
 * const safeMultiply = (a: unknown) => (b: unknown): number | null => {
 *   const aNum = typeof a === 'number' ? a : NaN
 *   const bNum = typeof b === 'number' ? b : NaN
 *   const result = multiply(aNum)(bNum)
 *   return isNaN(result) ? null : result
 * }
 * safeMultiply(5)(3)
 * // 15
 * safeMultiply("5")(3)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Commutative - multiply(a)(b) === multiply(b)(a)
 * @property Associative - multiply(multiply(a)(b))(c) === multiply(a)(multiply(b)(c))
 * @property Identity - multiply(n)(1) === n
 * @property Annihilator - multiply(n)(0) === 0
 */
const multiply = (
	multiplicand: number | null | undefined
) => (
	multiplier: number | null | undefined
): number => {
	if (multiplicand == null || typeof multiplicand !== 'number') {
		return NaN
	}
	
	if (multiplier == null || typeof multiplier !== 'number') {
		return NaN
	}
	
	return multiplicand * multiplier
}

export default multiply