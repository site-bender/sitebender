/**
 * Returns the square root of a number
 * 
 * Calculates the non-negative square root of a non-negative number.
 * Returns NaN for negative numbers (no real square root) or invalid
 * inputs. Uses Math.sqrt internally for accurate computation.
 * 
 * @param n - The number to find the square root of
 * @returns The square root, or NaN if negative or invalid
 * @example
 * ```typescript
 * // Perfect squares
 * sqrt(4)
 * // 2
 * 
 * sqrt(9)
 * // 3
 * 
 * sqrt(16)
 * // 4
 * 
 * sqrt(25)
 * // 5
 * 
 * sqrt(100)
 * // 10
 * 
 * // Non-perfect squares
 * sqrt(2)
 * // 1.4142135623730951
 * 
 * sqrt(3)
 * // 1.7320508075688772
 * 
 * sqrt(5)
 * // 2.23606797749979
 * 
 * sqrt(10)
 * // 3.1622776601683795
 * 
 * // Decimal numbers
 * sqrt(0.25)
 * // 0.5
 * 
 * sqrt(0.5)
 * // 0.7071067811865476
 * 
 * sqrt(1.5)
 * // 1.224744871391589
 * 
 * sqrt(2.25)
 * // 1.5
 * 
 * // Zero
 * sqrt(0)
 * // 0
 * 
 * sqrt(-0)
 * // 0
 * 
 * // One
 * sqrt(1)
 * // 1
 * 
 * // Large numbers
 * sqrt(1000000)
 * // 1000
 * 
 * sqrt(1000000000)
 * // 31622.776601683792
 * 
 * sqrt(Number.MAX_SAFE_INTEGER)
 * // 94906265.62425154
 * 
 * // Very small numbers
 * sqrt(0.0001)
 * // 0.01
 * 
 * sqrt(0.000001)
 * // 0.001
 * 
 * sqrt(Number.EPSILON)
 * // 1.4901161193847656e-8
 * 
 * // Negative numbers (no real root)
 * sqrt(-1)
 * // NaN
 * 
 * sqrt(-4)
 * // NaN
 * 
 * sqrt(-100)
 * // NaN
 * 
 * // Special values
 * sqrt(Infinity)
 * // Infinity
 * 
 * sqrt(-Infinity)
 * // NaN
 * 
 * sqrt(NaN)
 * // NaN
 * 
 * // Invalid inputs
 * sqrt(null)
 * // NaN
 * 
 * sqrt(undefined)
 * // NaN
 * 
 * sqrt("4")
 * // NaN
 * 
 * sqrt({})
 * // NaN
 * 
 * sqrt([])
 * // NaN
 * 
 * // Array operations
 * const squares = [1, 4, 9, 16, 25]
 * squares.map(sqrt)
 * // [1, 2, 3, 4, 5]
 * 
 * const numbers = [2, 8, 18, 32, 50]
 * numbers.map(sqrt)
 * // [1.414..., 2.828..., 4.242..., 5.656..., 7.071...]
 * 
 * // Pythagorean theorem
 * const hypotenuse = (a: number, b: number) => 
 *   sqrt(a * a + b * b)
 * hypotenuse(3, 4)
 * // 5
 * 
 * hypotenuse(5, 12)
 * // 13
 * 
 * hypotenuse(8, 15)
 * // 17
 * 
 * // Distance formula
 * const distance = (x1: number, y1: number, x2: number, y2: number) => {
 *   const dx = x2 - x1
 *   const dy = y2 - y1
 *   return sqrt(dx * dx + dy * dy)
 * }
 * distance(0, 0, 3, 4)
 * // 5
 * 
 * // Circle calculations
 * const radiusFromArea = (area: number) => sqrt(area / Math.PI)
 * radiusFromArea(Math.PI * 25)
 * // 5
 * 
 * // Standard deviation helper
 * const variance = 16
 * const stdDev = sqrt(variance)
 * // 4
 * 
 * // Quadratic formula helper
 * const discriminant = 25
 * const sqrtDiscriminant = sqrt(discriminant)
 * // 5
 * 
 * // Root mean square
 * const rms = (values: Array<number>) => {
 *   const sumSquares = values.reduce((sum, v) => sum + v * v, 0)
 *   return sqrt(sumSquares / values.length)
 * }
 * rms([3, 4, 5])
 * // 4.08...
 * 
 * // Magnitude of vector
 * const magnitude = (vector: Array<number>) => 
 *   sqrt(vector.reduce((sum, v) => sum + v * v, 0))
 * magnitude([3, 4])
 * // 5
 * magnitude([1, 1, 1])
 * // 1.732...
 * 
 * // Geometric mean of two numbers
 * const geometricMean = (a: number, b: number) => sqrt(a * b)
 * geometricMean(4, 9)
 * // 6
 * geometricMean(2, 8)
 * // 4
 * 
 * // Physics: free fall
 * const fallDistance = (time: number) => {
 *   const g = 9.8 // gravity m/s²
 *   return 0.5 * g * time * time
 * }
 * const fallTime = (distance: number) => {
 *   const g = 9.8
 *   return sqrt(2 * distance / g)
 * }
 * fallTime(100)
 * // 4.517... seconds
 * 
 * // Finance: volatility
 * const annualVolatility = 0.04 // 4% squared
 * const dailyVolatility = sqrt(annualVolatility / 252)
 * // 0.0126... (1.26% daily)
 * 
 * // Signal processing: amplitude
 * const realPart = 3
 * const imagPart = 4
 * const amplitude = sqrt(realPart * realPart + imagPart * imagPart)
 * // 5
 * 
 * // Normalization
 * const normalize = (x: number, y: number) => {
 *   const length = sqrt(x * x + y * y)
 *   return { x: x / length, y: y / length }
 * }
 * normalize(3, 4)
 * // { x: 0.6, y: 0.8 }
 * 
 * // Golden ratio approximation
 * const phi = (1 + sqrt(5)) / 2
 * // 1.618...
 * 
 * // Checking perfect squares
 * const isPerfectSquare = (n: number) => {
 *   const root = sqrt(n)
 *   return Number.isInteger(root)
 * }
 * isPerfectSquare(16)
 * // true
 * isPerfectSquare(17)
 * // false
 * 
 * // Newton's method comparison
 * const newtonSqrt = (n: number, iterations: number = 10) => {
 *   const guess = n / 2
 *   const improve = (g: number) => (g + n / g) / 2
 *   const iterate = (g: number, i: number): number =>
 *     i === 0 ? g : iterate(improve(g), i - 1)
 *   return iterate(guess, iterations)
 * }
 * // Compare with built-in
 * sqrt(2)
 * // 1.4142135623730951
 * newtonSqrt(2)
 * // 1.4142135623730951 (same precision)
 * 
 * // Safe sqrt with validation
 * const safeSqrt = (value: unknown): number | null => {
 *   const num = typeof value === 'number' ? value : NaN
 *   const result = sqrt(num)
 *   return isNaN(result) ? null : result
 * }
 * safeSqrt(9)
 * // 3
 * safeSqrt("9")
 * // null
 * safeSqrt(-9)
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid or negative inputs
 * @property Mathematical - Computes principal (non-negative) square root
 * @property Inverse - sqrt(n * n) === Math.abs(n) for real n
 */
const sqrt = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return Math.sqrt(n)
}

export default sqrt