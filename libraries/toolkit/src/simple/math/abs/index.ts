/**
 * Returns the absolute value of a number
 * 
 * Computes the absolute value of a number, which is its distance from
 * zero on the number line regardless of direction. Positive numbers
 * remain unchanged, negative numbers become positive. Returns NaN for
 * non-numeric inputs to support safe error handling and monadic wrapping.
 * 
 * @param n - Number to get absolute value of
 * @returns Absolute value of the number, or NaN if invalid
 * @example
 * ```typescript
 * // Positive numbers unchanged
 * abs(5)
 * // 5
 * 
 * abs(42.7)
 * // 42.7
 * 
 * // Negative numbers become positive
 * abs(-5)
 * // 5
 * 
 * abs(-42.7)
 * // 42.7
 * 
 * // Zero remains zero
 * abs(0)
 * // 0
 * 
 * abs(-0)
 * // 0
 * 
 * // Special numeric values
 * abs(Infinity)
 * // Infinity
 * 
 * abs(-Infinity)
 * // Infinity
 * 
 * abs(NaN)
 * // NaN
 * 
 * // Very small numbers
 * abs(-0.0000001)
 * // 0.0000001
 * 
 * abs(-1e-10)
 * // 1e-10
 * 
 * // Very large numbers
 * abs(-9999999999999)
 * // 9999999999999
 * 
 * abs(-Number.MAX_VALUE)
 * // Number.MAX_VALUE
 * 
 * // Edge cases near zero
 * abs(-Number.MIN_VALUE)
 * // Number.MIN_VALUE
 * 
 * abs(Number.EPSILON)
 * // Number.EPSILON
 * 
 * // Invalid inputs return NaN
 * abs(null)
 * // NaN
 * 
 * abs(undefined)
 * // NaN
 * 
 * abs("5")
 * // NaN
 * 
 * abs("abc")
 * // NaN
 * 
 * abs({})
 * // NaN
 * 
 * abs([])
 * // NaN
 * 
 * // Use in calculations
 * const distance = abs(point1 - point2)
 * 
 * const magnitude = abs(complexNumber.real)
 * 
 * // Error margins
 * const withinTolerance = abs(actual - expected) < 0.001
 * 
 * // Finding maximum deviation
 * const deviations = [-3, 2, -5, 1, -2]
 * const maxDeviation = deviations.map(abs).reduce((a, b) => Math.max(a, b))
 * // 5
 * 
 * // Distance calculations
 * function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
 *   return abs(x2 - x1) + abs(y2 - y1)
 * }
 * manhattanDistance(0, 0, 3, 4)
 * // 7
 * 
 * // Temperature differences
 * const tempDiff = abs(-5 - 20)
 * // 25
 * 
 * // Financial calculations
 * const loss = -150.50
 * const absoluteLoss = abs(loss)
 * // 150.50
 * 
 * // Physics calculations
 * const velocity = -9.8  // m/s downward
 * const speed = abs(velocity)
 * // 9.8
 * 
 * // Array processing
 * const numbers = [-5, 3, -2, 8, -1]
 * const absolute = numbers.map(abs)
 * // [5, 3, 2, 8, 1]
 * 
 * // Sorting by absolute value
 * const mixed = [-5, 3, -2, 8, -1]
 * mixed.sort((a, b) => abs(a) - abs(b))
 * // [-1, -2, 3, -5, 8]
 * 
 * // Finding closest to zero
 * const values = [-5, 3, -2, 8, -1]
 * const closest = values.reduce((min, val) => 
 *   abs(val) < abs(min) ? val : min
 * )
 * // -1
 * 
 * // Signal processing
 * const signal = [-0.5, 0.3, -0.8, 0.2, -0.1]
 * const amplitude = signal.map(abs)
 * // [0.5, 0.3, 0.8, 0.2, 0.1]
 * 
 * // Error handling with NaN propagation
 * const safeCalc = (x: unknown): number => {
 *   const val = typeof x === 'number' ? x : NaN
 *   return abs(val) * 2  // NaN propagates through
 * }
 * safeCalc("invalid")
 * // NaN
 * 
 * // Complex number magnitude (simplified)
 * function magnitude(real: number, imaginary: number): number {
 *   return Math.sqrt(abs(real) ** 2 + abs(imaginary) ** 2)
 * }
 * magnitude(-3, 4)
 * // 5
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Idempotent - abs(abs(x)) === abs(x)
 */
const abs = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return Math.abs(n)
}

export default abs