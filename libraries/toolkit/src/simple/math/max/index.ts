/**
 * Finds the maximum of two values
 *
 * Returns the larger of two numbers. If either value is NaN, returns NaN.
 * Handles special values like Infinity correctly. Uses curried application
 * for functional composition. Returns NaN for non-numeric inputs to support
 * safe error handling in functional pipelines.
 *
 * @curried (a) => (b) => maximum
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns The larger value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic comparisons
 * max(5)(3)
 * // 5
 *
 * max(3)(5)
 * // 5
 *
 * max(10)(10)
 * // 10
 *
 * max(0)(0)
 * // 0
 *
 * // Negative numbers
 * max(-5)(3)
 * // 3
 *
 * max(-5)(-3)
 * // -3
 *
 * max(-10)(-20)
 * // -10
 *
 * // Mixed positive and negative
 * max(-10)(10)
 * // 10
 *
 * max(5)(-5)
 * // 5
 *
 * max(-1)(0)
 * // 0
 *
 * // Decimal numbers
 * max(3.14)(2.71)
 * // 3.14
 *
 * max(0.1)(0.2)
 * // 0.2
 *
 * max(-0.5)(0.5)
 * // 0.5
 *
 * max(1.999)(2.001)
 * // 2.001
 *
 * // Very small differences
 * max(1.0000001)(1.0000002)
 * // 1.0000002
 *
 * max(Number.MIN_VALUE)(0)
 * // 5e-324 (MIN_VALUE)
 *
 * // Large numbers
 * max(1000000)(999999)
 * // 1000000
 *
 * max(Number.MAX_VALUE)(Number.MAX_VALUE - 1)
 * // Number.MAX_VALUE
 *
 * max(Number.MAX_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER - 1)
 * // 9007199254740991
 *
 * // Special values
 * max(Infinity)(100)
 * // Infinity
 *
 * max(-Infinity)(100)
 * // 100
 *
 * max(Infinity)(-Infinity)
 * // Infinity
 *
 * max(-0)(0)
 * // 0 (positive zero is greater)
 *
 * // NaN propagation
 * max(NaN)(5)
 * // NaN
 *
 * max(5)(NaN)
 * // NaN
 *
 * max(NaN)(NaN)
 * // NaN
 *
 * // Invalid inputs return NaN
 * max(null)(5)
 * // NaN
 *
 * max(5)(undefined)
 * // NaN
 *
 * max("5")(3)
 * // NaN
 *
 * max(5)("3")
 * // NaN
 *
 * max({})(5)
 * // NaN
 *
 * // Partial application
 * const atLeast0 = max(0)
 * atLeast0(5)
 * // 5
 * atLeast0(-5)
 * // 0
 * atLeast0(0)
 * // 0
 *
 * const atLeast10 = max(10)
 * atLeast10(5)
 * // 10
 * atLeast10(15)
 * // 15
 *
 * const capAt100 = (n: number) => max(n)(100) === 100 ? 100 : n
 * capAt100(50)
 * // 50
 * capAt100(150)
 * // 100
 *
 * // Array operations
 * const numbers = [1, 5, 3, 9, 2]
 * const maxValue = numbers.reduce((acc, n) => max(acc)(n))
 * // 9
 *
 * const values = [-5, -2, -8, -1, -3]
 * const largest = values.reduce((acc, n) => max(acc)(n))
 * // -1
 *
 * // Finding maximum in pairs
 * const pairs: Array<[number, number]> = [[1, 2], [5, 3], [4, 6]]
 * const maxOfPairs = pairs.map(([a, b]) => max(a)(b))
 * // [2, 5, 6]
 *
 * // Clamping to minimum value
 * function ensureMinimum(min: number): (n: number) => number {
 *   return max(min)
 * }
 * const ensurePositive = ensureMinimum(0)
 * ensurePositive(-5)
 * // 0
 * ensurePositive(5)
 * // 5
 *
 * // Score tracking
 * let highScore = 0
 * function updateHighScore(newScore: number): number {
 *   highScore = max(highScore)(newScore)
 *   return highScore
 * }
 * updateHighScore(100)
 * // 100
 * updateHighScore(50)
 * // 100
 * updateHighScore(150)
 * // 150
 *
 * // Temperature records
 * const dailyHighs = [72, 75, 71, 78, 76]
 * const weeklyHigh = dailyHighs.reduce((acc, temp) => max(acc)(temp))
 * // 78
 *
 * // Financial calculations
 * function calculateProfit(revenue: number, costs: number): number {
 *   return max(0)(revenue - costs) // Can't have negative profit in this model
 * }
 * calculateProfit(1000, 800)
 * // 200
 * calculateProfit(500, 600)
 * // 0
 *
 * // Priority selection
 * function higherPriority(p1: number, p2: number): number {
 *   return max(p1)(p2)
 * }
 * higherPriority(1, 5)
 * // 5
 *
 * // Bid amounts
 * const currentBid = 100
 * const newBid = 120
 * const winningBid = max(currentBid)(newBid)
 * // 120
 *
 * // Version comparison (simplified)
 * function newerVersion(v1: number, v2: number): number {
 *   return max(v1)(v2)
 * }
 * newerVersion(1.2, 1.5)
 * // 1.5
 *
 * // Buffer size selection
 * const requiredSize = 1024
 * const availableSize = 2048
 * const bufferSize = max(requiredSize)(availableSize)
 * // 2048
 *
 * // Z-index layering
 * function bringToFront(currentZ: number, minZ: number = 1000): number {
 *   return max(currentZ)(minZ)
 * }
 * bringToFront(500)
 * // 1000
 * bringToFront(1500)
 * // 1500
 *
 * // Age verification
 * const minimumAge = 18
 * const verifyAge = max(minimumAge)
 * const canAccess = (age: number) => verifyAge(age) === age
 * canAccess(21)
 * // true
 * canAccess(16)
 * // false
 *
 * // Finding peaks
 * function isPeak(prev: number, current: number, next: number): boolean {
 *   return max(prev)(current) === current && max(current)(next) === current
 * }
 * isPeak(3, 5, 2)
 * // true
 * isPeak(3, 2, 5)
 * // false
 *
 * // Threshold enforcement
 * const threshold = 0.5
 * const enforceThreshold = max(threshold)
 * const signal = 0.3
 * enforceThreshold(signal)
 * // 0.5
 *
 * // Competition scoring
 * function bestAttempt(attempts: Array<number>): number {
 *   return attempts.reduce((best, attempt) => max(best)(attempt), -Infinity)
 * }
 * bestAttempt([8.5, 9.2, 8.9, 9.0])
 * // 9.2
 *
 * // Safe max with validation
 * function safeMax(a: unknown, b: unknown): number | null {
 *   const aNum = typeof a === 'number' ? a : NaN
 *   const bNum = typeof b === 'number' ? b : NaN
 *   const result = max(aNum)(bNum)
 *   return isNaN(result) ? null : result
 * }
 * safeMax(5, 3)
 * // 5
 * safeMax("5", 3)
 * // null
 * safeMax(5, null)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Commutative - max(a)(b) === max(b)(a)
 * @property Associative - max(max(a)(b))(c) === max(a)(max(b)(c))
 * @property Idempotent - max(a)(a) === a
 */
const max = (
	a: number | null | undefined,
) =>
(
	b: number | null | undefined,
): number => {
	if (a == null || typeof a !== "number") {
		return NaN
	}

	if (b == null || typeof b !== "number") {
		return NaN
	}

	// Math.max handles NaN, Infinity, and -0 vs 0 correctly
	return Math.max(a, b)
}

export default max
