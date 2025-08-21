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
 * absoluteValue(5)
 * // 5
 * 
 * absoluteValue(42.7)
 * // 42.7
 * 
 * // Negative numbers become positive
 * absoluteValue(-5)
 * // 5
 * 
 * absoluteValue(-42.7)
 * // 42.7
 * 
 * // Zero remains zero
 * absoluteValue(0)
 * // 0
 * 
 * absoluteValue(-0)
 * // 0
 * 
 * // Special numeric values
 * absoluteValue(Infinity)
 * // Infinity
 * 
 * absoluteValue(-Infinity)
 * // Infinity
 * 
 * absoluteValue(NaN)
 * // NaN
 * 
 * // Very small numbers
 * absoluteValue(-0.0000001)
 * // 0.0000001
 * 
 * absoluteValue(-1e-10)
 * // 1e-10
 * 
 * // Very large numbers
 * absoluteValue(-9999999999999)
 * // 9999999999999
 * 
 * absoluteValue(-Number.MAX_VALUE)
 * // Number.MAX_VALUE
 * 
 * // Edge cases near zero
 * absoluteValue(-Number.MIN_VALUE)
 * // Number.MIN_VALUE
 * 
 * absoluteValue(Number.EPSILON)
 * // Number.EPSILON
 * 
 * // Invalid inputs return NaN
 * absoluteValue(null)
 * // NaN
 * 
 * absoluteValue(undefined)
 * // NaN
 * 
 * absoluteValue("5")
 * // NaN
 * 
 * absoluteValue("abc")
 * // NaN
 * 
 * absoluteValue({})
 * // NaN
 * 
 * absoluteValue([])
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
 * @property Idempotent - absoluteValue(absoluteValue(x)) === absoluteValue(x)
 */
const absoluteValue = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return Math.abs(n)
}

export default absoluteValue