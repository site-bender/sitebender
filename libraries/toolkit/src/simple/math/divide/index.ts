/**
 * Divides the first number by the second
 * 
 * Performs division with curried application for functional composition.
 * Returns the quotient of dividend divided by divisor. Returns NaN for
 * invalid inputs or division by zero, enabling safe error propagation
 * in functional pipelines.
 * 
 * @curried (dividend) => (divisor) => quotient
 * @param dividend - Number to be divided (numerator)
 * @param divisor - Number to divide by (denominator)
 * @returns Quotient of dividend/divisor, or NaN if invalid
 * @example
 * ```typescript
 * // Basic division
 * divide(10)(2)
 * // 5
 * 
 * divide(15)(3)
 * // 5
 * 
 * divide(100)(4)
 * // 25
 * 
 * // Decimal results
 * divide(10)(3)
 * // 3.3333333333333335
 * 
 * divide(7)(2)
 * // 3.5
 * 
 * divide(1)(3)
 * // 0.3333333333333333
 * 
 * // Decimal operands
 * divide(5.5)(2)
 * // 2.75
 * 
 * divide(10)(2.5)
 * // 4
 * 
 * divide(7.5)(1.5)
 * // 5
 * 
 * // Negative numbers
 * divide(-10)(2)
 * // -5
 * 
 * divide(10)(-2)
 * // -5
 * 
 * divide(-10)(-2)
 * // 5
 * 
 * // Division by 1 (identity)
 * divide(42)(1)
 * // 42
 * 
 * divide(-7)(1)
 * // -7
 * 
 * // Division by -1 (negation)
 * divide(42)(-1)
 * // -42
 * 
 * divide(-7)(-1)
 * // 7
 * 
 * // Division by zero returns NaN
 * divide(10)(0)
 * // NaN
 * 
 * divide(0)(0)
 * // NaN
 * 
 * divide(-5)(0)
 * // NaN
 * 
 * // Zero divided by number
 * divide(0)(5)
 * // 0
 * 
 * divide(0)(-5)
 * // -0
 * 
 * // Large numbers
 * divide(1000000)(1000)
 * // 1000
 * 
 * divide(Number.MAX_SAFE_INTEGER)(2)
 * // 4503599627370495.5
 * 
 * // Small numbers
 * divide(0.001)(10)
 * // 0.0001
 * 
 * divide(1)(1000000)
 * // 0.000001
 * 
 * // Special values
 * divide(Infinity)(2)
 * // Infinity
 * 
 * divide(10)(Infinity)
 * // 0
 * 
 * divide(Infinity)(Infinity)
 * // NaN
 * 
 * divide(-Infinity)(2)
 * // -Infinity
 * 
 * divide(NaN)(5)
 * // NaN
 * 
 * divide(5)(NaN)
 * // NaN
 * 
 * // Invalid inputs return NaN
 * divide(null)(5)
 * // NaN
 * 
 * divide(10)(undefined)
 * // NaN
 * 
 * divide("10")(2)
 * // NaN
 * 
 * divide(10)("2")
 * // NaN
 * 
 * // Partial application
 * const half = divide(1)(2)
 * const halfOf = (n: number) => divide(n)(2)
 * halfOf(10)
 * // 5
 * halfOf(7)
 * // 3.5
 * 
 * const divideBy10 = (n: number) => divide(n)(10)
 * divideBy10(100)
 * // 10
 * divideBy10(55)
 * // 5.5
 * 
 * const reciprocal = divide(1)
 * reciprocal(4)
 * // 0.25
 * reciprocal(0.5)
 * // 2
 * 
 * // Percentage calculations
 * const toPercent = (n: number) => divide(n)(100)
 * toPercent(50)
 * // 0.5 (50%)
 * 
 * const percentOf = (percent: number) => (total: number) =>
 *   divide(percent * total)(100)
 * percentOf(25)(80)
 * // 20 (25% of 80)
 * 
 * // Average calculation
 * const sum = 150
 * const count = 6
 * const average = divide(sum)(count)
 * // 25
 * 
 * // Rate calculations
 * const distance = 300 // miles
 * const time = 5 // hours
 * const speed = divide(distance)(time)
 * // 60 mph
 * 
 * // Unit conversions
 * const metersToFeet = (meters: number) => divide(meters)(0.3048)
 * metersToFeet(10)
 * // 32.808...
 * 
 * const celsiusToFahrenheitRatio = divide(9)(5)
 * // 1.8
 * 
 * // Financial calculations
 * const principal = 1000
 * const periods = 12
 * const monthlyPayment = divide(principal)(periods)
 * // 83.333...
 * 
 * // Aspect ratio
 * const width = 1920
 * const height = 1080
 * const aspectRatio = divide(width)(height)
 * // 1.777... (16:9)
 * 
 * // Array operations
 * const numbers = [100, 50, 25, 10]
 * const halved = numbers.map(n => divide(n)(2))
 * // [50, 25, 12.5, 5]
 * 
 * // Scaling
 * const scale = divide(1)(4) // Quarter scale
 * const dimensions = [800, 600, 400]
 * const scaled = dimensions.map(d => d * scale)
 * // [200, 150, 100]
 * 
 * // Price per unit
 * const totalPrice = 45.99
 * const quantity = 3
 * const unitPrice = divide(totalPrice)(quantity)
 * // 15.33
 * 
 * // Frame rate calculation
 * const frames = 1800
 * const seconds = 60
 * const fps = divide(frames)(seconds)
 * // 30 fps
 * 
 * // Probability
 * const favorable = 13
 * const total = 52
 * const probability = divide(favorable)(total)
 * // 0.25 (probability of drawing a specific suit)
 * 
 * // Golden ratio approximation
 * function fibonacci(n: number): number {
 *   if (n <= 1) return n
 *   return fibonacci(n - 1) + fibonacci(n - 2)
 * }
 * const goldenApprox = divide(fibonacci(10))(fibonacci(9))
 * // 1.618... (approximates golden ratio)
 * 
 * // Safe division with validation
 * function safeDivide(a: unknown, b: unknown): number | null {
 *   const dividend = typeof a === 'number' ? a : NaN
 *   const divisor = typeof b === 'number' ? b : NaN
 *   const result = divide(dividend)(divisor)
 *   return isNaN(result) ? null : result
 * }
 * safeDivide(10, 2)
 * // 5
 * safeDivide(10, 0)
 * // null (division by zero)
 * safeDivide("10", 2)
 * // null (invalid input)
 * 
 * // Chaining operations
 * const calculate = (n: number) => 
 *   divide(divide(n)(2))(3) // (n / 2) / 3
 * calculate(30)
 * // 5
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs or division by zero
 * @property Non-commutative - divide(a)(b) !== divide(b)(a) in general
 */
const divide = (
	dividend: number | null | undefined
) => (
	divisor: number | null | undefined
): number => {
	if (dividend == null || typeof dividend !== 'number') {
		return NaN
	}
	
	if (divisor == null || typeof divisor !== 'number') {
		return NaN
	}
	
	// Division by zero returns NaN
	if (divisor === 0) {
		return NaN
	}
	
	return dividend / divisor
}

export default divide