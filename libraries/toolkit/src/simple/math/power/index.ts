/**
 * Raises a number to a power (exponentiation)
 * 
 * Calculates base raised to the exponent power using JavaScript's
 * Math.pow function. Handles fractional and negative exponents.
 * Returns NaN for invalid inputs or mathematically undefined results.
 * 
 * @curried (exponent) => (base) => result
 * @param exponent - The power to raise to
 * @param base - The number to be raised
 * @returns Base raised to the exponent power, or NaN if invalid
 * @example
 * ```typescript
 * // Basic exponentiation
 * power(2)(3)
 * // 9 (3^2)
 * 
 * power(3)(2)
 * // 8 (2^3)
 * 
 * power(2)(10)
 * // 100 (10^2)
 * 
 * // Power of 1 (identity)
 * power(1)(5)
 * // 5
 * 
 * power(1)(100)
 * // 100
 * 
 * // Power of 0 (always 1)
 * power(0)(5)
 * // 1
 * 
 * power(0)(100)
 * // 1
 * 
 * power(0)(0)
 * // 1
 * 
 * // Negative exponents (reciprocals)
 * power(-1)(2)
 * // 0.5 (1/2)
 * 
 * power(-2)(2)
 * // 0.25 (1/4)
 * 
 * power(-3)(2)
 * // 0.125 (1/8)
 * 
 * // Fractional exponents (roots)
 * power(0.5)(4)
 * // 2 (square root of 4)
 * 
 * power(0.5)(9)
 * // 3 (square root of 9)
 * 
 * power(1/3)(8)
 * // 2 (cube root of 8)
 * 
 * power(1/3)(27)
 * // 3 (cube root of 27)
 * 
 * // Negative bases
 * power(2)(-3)
 * // 9
 * 
 * power(3)(-2)
 * // -8
 * 
 * power(2)(-4)
 * // 16
 * 
 * // Decimal bases
 * power(2)(1.5)
 * // 2.25
 * 
 * power(3)(0.5)
 * // 0.125
 * 
 * power(2)(2.5)
 * // 6.25
 * 
 * // Large exponents
 * power(10)(2)
 * // 1024
 * 
 * power(20)(2)
 * // 1048576
 * 
 * power(100)(10)
 * // 1e+100
 * 
 * // Special values
 * power(2)(Infinity)
 * // Infinity
 * 
 * power(2)(-Infinity)
 * // 0
 * 
 * power(Infinity)(2)
 * // Infinity
 * 
 * power(-Infinity)(3)
 * // -Infinity
 * 
 * power(0)(0)
 * // 1 (by convention)
 * 
 * power(2)(NaN)
 * // NaN
 * 
 * power(NaN)(2)
 * // NaN
 * 
 * // Invalid inputs
 * power(null)(2)
 * // NaN
 * 
 * power(2)(undefined)
 * // NaN
 * 
 * power("2")(3)
 * // NaN
 * 
 * power(2)("3")
 * // NaN
 * 
 * // Partial application
 * const square = power(2)
 * square(5)
 * // 25
 * square(7)
 * // 49
 * 
 * const cube = power(3)
 * cube(3)
 * // 27
 * cube(4)
 * // 64
 * 
 * const sqrt = power(0.5)
 * sqrt(16)
 * // 4
 * sqrt(25)
 * // 5
 * 
 * const reciprocal = power(-1)
 * reciprocal(2)
 * // 0.5
 * reciprocal(4)
 * // 0.25
 * 
 * // Array operations
 * const numbers = [1, 2, 3, 4, 5]
 * numbers.map(pow(2))
 * // [1, 4, 9, 16, 25]
 * 
 * numbers.map(pow(3))
 * // [1, 8, 27, 64, 125]
 * 
 * numbers.map(pow(0.5))
 * // [1, 1.414..., 1.732..., 2, 2.236...]
 * 
 * // Powers of 2 sequence
 * const powersOfTwo = Array.from({ length: 10 }, (_, i) => pow(i)(2))
 * // [1, 2, 4, 8, 16, 32, 64, 128, 256, 512]
 * 
 * // Geometric growth
 * const growth = (rate: number) => (periods: number) => 
 *   pow(periods)(1 + rate)
 * growth(0.05)(10)
 * // 1.628... (5% growth over 10 periods)
 * 
 * // Compound interest
 * const compound = (principal: number, rate: number, time: number) =>
 *   principal * power(time)(1 + rate)
 * compound(1000, 0.05, 3)
 * // 1157.625
 * 
 * // Circle area from radius
 * const circleArea = (radius: number) => Math.PI * power(2)(radius)
 * circleArea(5)
 * // 78.539...
 * 
 * // Sphere volume from radius
 * const sphereVolume = (radius: number) => 
 *   (4/3) * Math.PI * power(3)(radius)
 * sphereVolume(3)
 * // 113.097...
 * 
 * // Pythagorean theorem
 * const hypotenuse = (a: number, b: number) => 
 *   sqrt(pow(2)(a) + pow(2)(b))
 * hypotenuse(3, 4)
 * // 5
 * 
 * // Exponential decay
 * const decay = (initial: number, rate: number, time: number) =>
 *   initial * power(time)(Math.E * rate)
 * decay(100, -0.1, 5)
 * // 60.653...
 * 
 * // Binary to decimal
 * const binaryToDecimal = (binary: string) =>
 *   binary.split('').reverse().reduce((acc, bit, i) => 
 *     acc + parseInt(bit) * power(i)(2), 0)
 * binaryToDecimal("1010")
 * // 10
 * 
 * // Scientific notation
 * const scientific = (mantissa: number) => (exponent: number) =>
 *   mantissa * power(exponent)(10)
 * scientific(3.14)(2)
 * // 314
 * scientific(6.02)(23)
 * // 6.02e+23
 * 
 * // Logarithm inverse
 * const exp = power // e^x when base is Math.E
 * const natural = (x: number) => pow(x)(Math.E)
 * natural(1)
 * // 2.718... (e)
 * 
 * // Nth root
 * const nthRoot = (n: number) => pow(1/n)
 * const fourthRoot = nthRoot(4)
 * fourthRoot(16)
 * // 2
 * 
 * // Distance formula in n dimensions
 * const euclideanDistance = (points: Array<number>) =>
 *   sqrt(points.reduce((sum, p) => sum + pow(2)(p), 0))
 * euclideanDistance([3, 4])
 * // 5
 * 
 * // Standard deviation helper
 * const squaredDifference = (mean: number) => (value: number) =>
 *   pow(2)(value - mean)
 * const differences = [1, 2, 3, 4, 5].map(squaredDifference(3))
 * // [4, 1, 0, 1, 4]
 * 
 * // Energy calculations (E = mc²)
 * const energy = (mass: number) => {
 *   const c = 299792458 // speed of light in m/s
 *   return mass * power(2)(c)
 * }
 * 
 * // Safe pow with validation
 * const safePow = (exp: unknown) => (base: unknown): number | null => {
 *   const expNum = typeof exp === 'number' ? exp : NaN
 *   const baseNum = typeof base === 'number' ? base : NaN
 *   const result = power(expNum)(baseNum)
 *   return isNaN(result) ? null : result
 * }
 * safePow(2)(3)
 * // 9
 * safePow("2")(3)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Mathematical - Follows standard exponentiation rules
 */
const power = (
	exponent: number | null | undefined
) => (
	base: number | null | undefined
): number => {
	if (exponent == null || typeof exponent !== 'number') {
		return NaN
	}
	
	if (base == null || typeof base !== 'number') {
		return NaN
	}
	
	return Math.pow(base, exponent)
}

export default power