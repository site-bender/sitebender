/**
 * Returns the sign of a number (-1, 0, or 1)
 * 
 * Determines whether a number is positive, negative, or zero.
 * Returns 1 for positive numbers, -1 for negative numbers, and
 * 0 for zero (including both +0 and -0). Returns NaN for NaN
 * or invalid inputs.
 * 
 * @param n - The number to get the sign of
 * @returns -1, 0, or 1 based on sign, or NaN if invalid
 * @example
 * ```typescript
 * // Positive numbers
 * sign(5)
 * // 1
 * 
 * sign(42)
 * // 1
 * 
 * sign(0.001)
 * // 1
 * 
 * sign(Number.MAX_VALUE)
 * // 1
 * 
 * // Negative numbers
 * sign(-5)
 * // -1
 * 
 * sign(-42)
 * // -1
 * 
 * sign(-0.001)
 * // -1
 * 
 * sign(Number.MIN_SAFE_INTEGER)
 * // -1
 * 
 * // Zero
 * sign(0)
 * // 0
 * 
 * sign(-0)
 * // 0 (negative zero is treated as zero)
 * 
 * sign(+0)
 * // 0
 * 
 * // Decimal numbers
 * sign(3.14)
 * // 1
 * 
 * sign(-2.71)
 * // -1
 * 
 * sign(0.5)
 * // 1
 * 
 * sign(-0.5)
 * // -1
 * 
 * // Very small numbers
 * sign(0.0000001)
 * // 1
 * 
 * sign(-0.0000001)
 * // -1
 * 
 * sign(Number.EPSILON)
 * // 1
 * 
 * sign(-Number.EPSILON)
 * // -1
 * 
 * // Special values
 * sign(Infinity)
 * // 1
 * 
 * sign(-Infinity)
 * // -1
 * 
 * sign(NaN)
 * // NaN
 * 
 * // Invalid inputs
 * sign(null)
 * // NaN
 * 
 * sign(undefined)
 * // NaN
 * 
 * sign("5")
 * // NaN
 * 
 * sign({})
 * // NaN
 * 
 * sign([])
 * // NaN
 * 
 * // Array operations
 * const numbers = [-3, -1, 0, 1, 3]
 * numbers.map(sign)
 * // [-1, -1, 0, 1, 1]
 * 
 * const mixed = [5, -2.5, 0, 8, -10]
 * mixed.map(sign)
 * // [1, -1, 0, 1, -1]
 * 
 * // Direction determination
 * const velocity = -15
 * const direction = sign(velocity)
 * // -1 (moving backward)
 * 
 * const velocity2 = 20
 * const direction2 = sign(velocity2)
 * // 1 (moving forward)
 * 
 * // Comparison helper
 * const compare = (a: number, b: number) => sign(a - b)
 * compare(5, 3)
 * // 1 (a > b)
 * compare(3, 5)
 * // -1 (a < b)
 * compare(5, 5)
 * // 0 (a === b)
 * 
 * // Trend analysis
 * const change = 2.5
 * const trend = sign(change)
 * // 1 (increasing)
 * 
 * const change2 = -1.8
 * const trend2 = sign(change2)
 * // -1 (decreasing)
 * 
 * const change3 = 0
 * const trend3 = sign(change3)
 * // 0 (no change)
 * 
 * // Profit/loss indicator
 * const profit = 1000
 * sign(profit)
 * // 1 (profit)
 * 
 * const loss = -500
 * sign(loss)
 * // -1 (loss)
 * 
 * const breakeven = 0
 * sign(breakeven)
 * // 0 (break even)
 * 
 * // Temperature change
 * const tempChange = 3.5
 * sign(tempChange)
 * // 1 (warming)
 * 
 * const tempChange2 = -2.1
 * sign(tempChange2)
 * // -1 (cooling)
 * 
 * // Stock price movement
 * const priceChange = 0.75
 * sign(priceChange)
 * // 1 (up)
 * 
 * const priceChange2 = -1.25
 * sign(priceChange2)
 * // -1 (down)
 * 
 * // Normalization helper
 * const normalize = (n: number) => n * sign(n)
 * normalize(-5)
 * // 5
 * normalize(5)
 * // 5
 * normalize(0)
 * // 0
 * 
 * // Absolute value implementation
 * const abs = (n: number) => n * sign(n)
 * abs(-10)
 * // 10
 * abs(10)
 * // 10
 * 
 * // Sign preservation in operations
 * const preserveSign = (value: number, magnitude: number) => 
 *   sign(value) * Math.abs(magnitude)
 * preserveSign(-5, 10)
 * // -10
 * preserveSign(5, 10)
 * // 10
 * 
 * // Three-way comparison
 * const threeWayCompare = (a: number, b: number) => {
 *   const s = sign(a - b)
 *   if (s === -1) return 'less'
 *   if (s === 1) return 'greater'
 *   return 'equal'
 * }
 * threeWayCompare(3, 5)
 * // 'less'
 * 
 * // Quadrant determination (2D)
 * const getQuadrant = (x: number, y: number) => {
 *   const sx = sign(x)
 *   const sy = sign(y)
 *   if (sx === 1 && sy === 1) return 1
 *   if (sx === -1 && sy === 1) return 2
 *   if (sx === -1 && sy === -1) return 3
 *   if (sx === 1 && sy === -1) return 4
 *   return 0 // on axis
 * }
 * getQuadrant(5, 3)
 * // 1
 * getQuadrant(-5, 3)
 * // 2
 * 
 * // Clamping to unit range
 * const clampToUnit = (n: number) => sign(n)
 * clampToUnit(100)
 * // 1
 * clampToUnit(-50)
 * // -1
 * clampToUnit(0)
 * // 0
 * 
 * // Step function
 * const step = (n: number) => (sign(n) + 1) / 2
 * step(-5)
 * // 0
 * step(0)
 * // 0.5
 * step(5)
 * // 1
 * 
 * // Sign-based switching
 * const switchOnSign = (n: number) => {
 *   switch(sign(n)) {
 *     case -1: return 'negative'
 *     case 0: return 'zero'
 *     case 1: return 'positive'
 *     default: return 'invalid'
 *   }
 * }
 * switchOnSign(42)
 * // 'positive'
 * 
 * // Delta encoding
 * const deltas = [2, -3, 0, 5, -1]
 * const signs = deltas.map(sign)
 * // [1, -1, 0, 1, -1]
 * 
 * // Physics: force direction
 * const force = -9.8
 * const forceDirection = sign(force)
 * // -1 (downward)
 * 
 * // Game: movement direction
 * const horizontalInput = 0
 * const verticalInput = -1
 * const moveX = sign(horizontalInput)
 * const moveY = sign(verticalInput)
 * // moveX: 0 (no horizontal movement)
 * // moveY: -1 (move up/back)
 * 
 * // Safe sign with validation
 * const safeSign = (value: unknown): number | null => {
 *   const num = typeof value === 'number' ? value : NaN
 *   const result = sign(num)
 *   return isNaN(result) ? null : result
 * }
 * safeSign(5)
 * // 1
 * safeSign("5")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Ternary - Returns only -1, 0, or 1 (or NaN)
 * @property Standard - Matches Math.sign behavior
 */
const sign = (
	n: number | null | undefined
): number => {
	if (n == null || typeof n !== 'number') {
		return NaN
	}
	
	return Math.sign(n)
}

export default sign