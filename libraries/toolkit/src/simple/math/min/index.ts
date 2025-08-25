/**
 * Finds the minimum of two values
 *
 * Returns the smaller of two numbers using mathematical comparison.
 * Handles special values according to JavaScript's Math.min behavior.
 * Returns NaN if either input is NaN or not a valid number.
 *
 * @curried (a) => (b) => minimum
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns The smaller value, or NaN if invalid input
 * @example
 * ```typescript
 * // Basic comparisons
 * min(5)(3)
 * // 3
 *
 * min(10)(20)
 * // 10
 *
 * min(7)(7)
 * // 7
 *
 * // Negative numbers
 * min(-5)(3)
 * // -5
 *
 * min(-10)(-20)
 * // -20
 *
 * min(0)(-1)
 * // -1
 *
 * // Decimal numbers
 * min(1.5)(2.3)
 * // 1.5
 *
 * min(0.1)(0.2)
 * // 0.1
 *
 * min(99.99)(99.98)
 * // 99.98
 *
 * // Zero comparisons
 * min(0)(5)
 * // 0
 *
 * min(0)(-5)
 * // -5
 *
 * min(0)(0)
 * // 0
 *
 * // Large numbers
 * min(1000000)(2000000)
 * // 1000000
 *
 * min(Number.MAX_SAFE_INTEGER)(0)
 * // 0
 *
 * min(Number.MIN_SAFE_INTEGER)(0)
 * // Number.MIN_SAFE_INTEGER
 *
 * // Special values
 * min(Infinity)(100)
 * // 100
 *
 * min(-Infinity)(100)
 * // -Infinity
 *
 * min(-Infinity)(Infinity)
 * // -Infinity
 *
 * min(5)(NaN)
 * // NaN
 *
 * min(NaN)(5)
 * // NaN
 *
 * min(NaN)(NaN)
 * // NaN
 *
 * // Invalid inputs return NaN
 * min(null)(5)
 * // NaN
 *
 * min(5)(undefined)
 * // NaN
 *
 * min("5")(3)
 * // NaN
 *
 * min(5)("3")
 * // NaN
 *
 * min({})(5)
 * // NaN
 *
 * // Partial application
 * const atMost10 = min(10)
 * atMost10(5)
 * // 5
 * atMost10(15)
 * // 10
 * atMost10(10)
 * // 10
 *
 * const atMostZero = min(0)
 * atMostZero(5)
 * // 0
 * atMostZero(-5)
 * // -5
 *
 * const chooseSmaller = min
 * chooseSmaller(100)(200)
 * // 100
 *
 * // Array operations
 * const numbers = [5, 10, 3, 8, 2]
 * const cappedAt7 = numbers.map(min(7))
 * // [5, 7, 3, 7, 2]
 *
 * // Finding minimum in array (reduce)
 * const values = [10, 5, 8, 3, 12]
 * values.reduce((acc, val) => min(acc)(val), Infinity)
 * // 3
 *
 * // Clamping values (upper bound)
 * const maxTemperature = min(100)
 * maxTemperature(95)
 * // 95
 * maxTemperature(105)
 * // 100
 *
 * // Score limiting
 * const maxScore = min(100)
 * const scores = [85, 92, 105, 98, 110]
 * scores.map(maxScore)
 * // [85, 92, 100, 98, 100]
 *
 * // Price comparisons
 * const competitorPrice = 49.99
 * const ourMaxPrice = min(competitorPrice)
 * ourMaxPrice(59.99)
 * // 49.99
 * ourMaxPrice(39.99)
 * // 39.99
 *
 * // Time limits
 * const maxDuration = min(60) // 60 seconds max
 * maxDuration(45)
 * // 45
 * maxDuration(75)
 * // 60
 *
 * // Damage calculation (cap damage)
 * const maxDamage = min(1000)
 * const calculateDamage = (base: number, multiplier: number) =>
 *   maxDamage(base * multiplier)
 * calculateDamage(300, 5)
 * // 1000 (capped from 1500)
 *
 * // Resource allocation
 * const availableResources = 500
 * const limitToAvailable = min(availableResources)
 * limitToAvailable(300)
 * // 300
 * limitToAvailable(600)
 * // 500
 *
 * // Finding best deal
 * const price1 = 29.99
 * const price2 = 24.99
 * const bestPrice = min(price1)(price2)
 * // 24.99
 *
 * // Speed limiting
 * const speedLimit = 65
 * const enforceLimit = min(speedLimit)
 * const currentSpeed = 72
 * enforceLimit(currentSpeed)
 * // 65
 *
 * // Threshold enforcement
 * const threshold = min(0.5)
 * threshold(0.3)
 * // 0.3
 * threshold(0.8)
 * // 0.5
 *
 * // Combining with other operations
 * const processValue = (x: number) => {
 *   const capped = min(100)(x)
 *   const scaled = capped * 0.9
 *   return Math.round(scaled)
 * }
 * processValue(120)
 * // 90
 *
 * // Nested minimum operations
 * const findSmallest = (a: number) => (b: number) => (c: number) =>
 *   min(min(a)(b))(c)
 * findSmallest(10)(5)(8)
 * // 5
 *
 * // Financial calculations
 * const creditLimit = 5000
 * const requestedAmount = 6000
 * const approvedAmount = min(creditLimit)(requestedAmount)
 * // 5000
 *
 * // Buffer size limiting
 * const maxBufferSize = 1024
 * const limitBuffer = min(maxBufferSize)
 * limitBuffer(512)
 * // 512
 * limitBuffer(2048)
 * // 1024
 *
 * // Safe minimum with validation
 * const safeMin = (a: unknown) => (b: unknown): number | null => {
 *   const aNum = typeof a === 'number' ? a : NaN
 *   const bNum = typeof b === 'number' ? b : NaN
 *   const result = min(aNum)(bNum)
 *   return isNaN(result) ? null : result
 * }
 * safeMin(5)(3)
 * // 3
 * safeMin("5")(3)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs
 * @property Commutative - min(a)(b) === min(b)(a)
 * @property Associative - min(min(a)(b))(c) === min(a)(min(b)(c))
 * @property Idempotent - min(a)(a) === a
 */
const min = (
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

	// Handle NaN cases explicitly
	if (isNaN(a) || isNaN(b)) {
		return NaN
	}

	return Math.min(a, b)
}

export default min
