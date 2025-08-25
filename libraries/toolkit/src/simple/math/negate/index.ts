/**
 * Negates a number (changes its sign)
 *
 * Returns the additive inverse of a number by multiplying it by -1.
 * Positive numbers become negative, negative numbers become positive,
 * and zero remains zero. Returns NaN for invalid inputs.
 *
 * @param n - The number to negate
 * @returns The negated value, or NaN if invalid input
 * @example
 * ```typescript
 * // Positive to negative
 * negate(5)
 * // -5
 *
 * negate(42)
 * // -42
 *
 * negate(100)
 * // -100
 *
 * // Negative to positive
 * negate(-5)
 * // 5
 *
 * negate(-42)
 * // 42
 *
 * negate(-100)
 * // 100
 *
 * // Zero is unchanged
 * negate(0)
 * // -0 (which equals 0 in JavaScript)
 *
 * negate(-0)
 * // 0
 *
 * // Decimal numbers
 * negate(3.14)
 * // -3.14
 *
 * negate(-2.5)
 * // 2.5
 *
 * negate(0.001)
 * // -0.001
 *
 * // Large numbers
 * negate(1000000)
 * // -1000000
 *
 * negate(Number.MAX_SAFE_INTEGER)
 * // -9007199254740991
 *
 * negate(Number.MIN_SAFE_INTEGER)
 * // 9007199254740991
 *
 * // Special values
 * negate(Infinity)
 * // -Infinity
 *
 * negate(-Infinity)
 * // Infinity
 *
 * negate(NaN)
 * // NaN
 *
 * // Invalid inputs return NaN
 * negate(null)
 * // NaN
 *
 * negate(undefined)
 * // NaN
 *
 * negate("5")
 * // NaN
 *
 * negate({})
 * // NaN
 *
 * negate([])
 * // NaN
 *
 * // Double negation (identity)
 * negate(negate(5))
 * // 5
 *
 * negate(negate(-7))
 * // -7
 *
 * // Array operations
 * const numbers = [1, -2, 3, -4, 5]
 * numbers.map(negate)
 * // [-1, 2, -3, 4, -5]
 *
 * const positives = [1, 2, 3, 4, 5]
 * positives.map(negate)
 * // [-1, -2, -3, -4, -5]
 *
 * const negatives = [-1, -2, -3, -4, -5]
 * negatives.map(negate)
 * // [1, 2, 3, 4, 5]
 *
 * // Absolute value implementation
 * const abs = (n: number): number => n < 0 ? negate(n) : n
 * abs(-5)
 * // 5
 * abs(5)
 * // 5
 *
 * // Sign flipping in calculations
 * const flipSign = negate
 * const profit = 100
 * const loss = flipSign(profit)
 * // -100
 *
 * // Temperature conversion
 * const celsius = 25
 * const belowZero = negate(celsius)
 * // -25
 *
 * // Direction reversal
 * const velocity = 50
 * const reverse = negate(velocity)
 * // -50
 *
 * // Debt calculation
 * const asset = 1000
 * const debt = negate(asset)
 * // -1000
 *
 * // Coordinate reflection
 * const reflectX = (point: { x: number; y: number }) => ({
 *   x: negate(point.x),
 *   y: point.y
 * })
 * reflectX({ x: 5, y: 3 })
 * // { x: -5, y: 3 }
 *
 * const reflectY = (point: { x: number; y: number }) => ({
 *   x: point.x,
 *   y: negate(point.y)
 * })
 * reflectY({ x: 5, y: 3 })
 * // { x: 5, y: -3 }
 *
 * // Physics: force direction
 * const forceRight = 10
 * const forceLeft = negate(forceRight)
 * // -10
 *
 * // Account balance adjustments
 * const deposit = 500
 * const withdrawal = negate(deposit)
 * // -500
 *
 * // Vector negation
 * const vector = [3, -4, 5]
 * const negatedVector = vector.map(negate)
 * // [-3, 4, -5]
 *
 * // Complex number conjugate (imaginary part)
 * const complex = { real: 3, imaginary: 4 }
 * const conjugate = {
 *   real: complex.real,
 *   imaginary: negate(complex.imaginary)
 * }
 * // { real: 3, imaginary: -4 }
 *
 * // Score inversion
 * const scores = [10, -5, 8, -3, 0]
 * const invertedScores = scores.map(negate)
 * // [-10, 5, -8, 3, 0]
 *
 * // Alternating series
 * const alternating = (n: number): number =>
 *   n % 2 === 0 ? n : negate(n)
 * [1, 2, 3, 4, 5].map(alternating)
 * // [-1, 2, -3, 4, -5]
 *
 * // Profit/loss toggle
 * const toggleProfitLoss = (values: Array<number>) =>
 *   values.map(negate)
 * toggleProfitLoss([100, 200, -50, 300])
 * // [-100, -200, 50, -300]
 *
 * // Wave function
 * const sineWave = (x: number) => Math.sin(x)
 * const invertedWave = (x: number) => negate(sineWave(x))
 * invertedWave(Math.PI / 2)
 * // -1
 *
 * // Subtraction via addition
 * const subtract = (a: number) => (b: number) => a + negate(b)
 * subtract(10)(3)
 * // 7
 *
 * // Pipeline processing
 * const process = (n: number) =>
 *   [Math.abs, negate, (x: number) => x - 5]
 *     .reduce((acc, fn) => fn(acc), n)
 * process(-10)
 * // -15 (abs(-10) = 10, negate(10) = -10, -10 - 5 = -15)
 *
 * // Conditional negation
 * const negateIf = (condition: boolean) => (n: number) =>
 *   condition ? negate(n) : n
 * negateIf(true)(5)
 * // -5
 * negateIf(false)(5)
 * // 5
 *
 * // Safe negate with validation
 * const safeNegate = (value: unknown): number | null => {
 *   const num = typeof value === 'number' ? value : NaN
 *   const result = negate(num)
 *   return isNaN(result) ? null : result
 * }
 * safeNegate(5)
 * // -5
 * safeNegate("5")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Involutive - negate(negate(n)) === n
 * @property Self-inverse - Function is its own inverse
 */
const negate = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	return -n
}

export default negate
