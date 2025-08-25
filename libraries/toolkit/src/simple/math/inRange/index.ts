/**
 * Checks if a number is within a specified range
 *
 * Determines whether a value falls within the given bounds. By default,
 * the range is inclusive of the start and exclusive of the end [start, end).
 * If start is greater than end, the parameters are swapped. Returns false
 * for invalid inputs to support safe error handling.
 *
 * @curried (start) => (end) => (value) => boolean
 * @param start - Start of range (inclusive)
 * @param end - End of range (exclusive)
 * @param value - Number to check
 * @returns True if value is in range [start, end), false otherwise
 * @example
 * ```typescript
 * // Basic range checks
 * inRange(0)(10)(5)
 * // true (5 is in [0, 10))
 *
 * inRange(0)(10)(0)
 * // true (inclusive start)
 *
 * inRange(0)(10)(10)
 * // false (exclusive end)
 *
 * inRange(0)(10)(-1)
 * // false (below range)
 *
 * inRange(0)(10)(11)
 * // false (above range)
 *
 * // Decimal ranges
 * inRange(1.5)(2.5)(2.0)
 * // true
 *
 * inRange(1.5)(2.5)(1.5)
 * // true
 *
 * inRange(1.5)(2.5)(2.5)
 * // false
 *
 * inRange(0.0)(1.0)(0.5)
 * // true
 *
 * // Negative ranges
 * inRange(-10)(-5)(-7)
 * // true
 *
 * inRange(-10)(-5)(-10)
 * // true
 *
 * inRange(-10)(-5)(-5)
 * // false
 *
 * inRange(-10)(-5)(-3)
 * // false
 *
 * // Mixed positive/negative
 * inRange(-5)(5)(0)
 * // true
 *
 * inRange(-5)(5)(-5)
 * // true
 *
 * inRange(-5)(5)(5)
 * // false
 *
 * inRange(-5)(5)(-6)
 * // false
 *
 * // Swapped bounds (automatically corrected)
 * inRange(10)(0)(5)
 * // true (treated as [0, 10))
 *
 * inRange(5)(-5)(0)
 * // true (treated as [-5, 5))
 *
 * // Same start and end
 * inRange(5)(5)(5)
 * // false (empty range)
 *
 * inRange(5)(5)(4)
 * // false
 *
 * inRange(5)(5)(6)
 * // false
 *
 * // Large numbers
 * inRange(0)(1000000)(500000)
 * // true
 *
 * inRange(Number.MIN_SAFE_INTEGER)(Number.MAX_SAFE_INTEGER)(0)
 * // true
 *
 * // Special values
 * inRange(0)(10)(Infinity)
 * // false
 *
 * inRange(0)(10)(-Infinity)
 * // false
 *
 * inRange(-Infinity)(Infinity)(42)
 * // true
 *
 * inRange(0)(10)(NaN)
 * // false
 *
 * // Invalid inputs return false
 * inRange(null)(10)(5)
 * // false
 *
 * inRange(0)(undefined)(5)
 * // false
 *
 * inRange(0)(10)(null)
 * // false
 *
 * inRange("0")(10)(5)
 * // false
 *
 * inRange(0)(10)("5")
 * // false
 *
 * // Partial application for specific ranges
 * const inRange0To10 = inRange(0)(10)
 * inRange0To10(5)
 * // true
 * inRange0To10(15)
 * // false
 *
 * // Percentage validation
 * const isValidPercent = inRange(0)(101)
 * isValidPercent(50)
 * // true
 * isValidPercent(100)
 * // true
 * isValidPercent(101)
 * // false
 *
 * // RGB color validation
 * const isValidRGB = inRange(0)(256)
 * isValidRGB(128)
 * // true
 * isValidRGB(255)
 * // true
 * isValidRGB(256)
 * // false
 *
 * // Temperature ranges
 * const isLiquidWater = inRange(0)(100) // Celsius
 * isLiquidWater(25)
 * // true (room temperature)
 * isLiquidWater(-5)
 * // false (ice)
 * isLiquidWater(105)
 * // false (steam)
 *
 * // Array bounds checking
 * function isValidIndex(arr: Array<unknown>, index: number): boolean {
 *   return inRange(0)(arr.length)(index)
 * }
 * isValidIndex([1, 2, 3, 4, 5], 3)
 * // true
 * isValidIndex([1, 2, 3], 3)
 * // false
 *
 * // Age groups
 * const isChild = inRange(0)(13)
 * const isTeen = inRange(13)(20)
 * const isAdult = inRange(18)(65)
 * const isSenior = inRange(65)(150)
 *
 * const age = 25
 * isAdult(age)
 * // true
 *
 * // Grade ranges
 * const isA = inRange(90)(101)
 * const isB = inRange(80)(90)
 * const isC = inRange(70)(80)
 * const isD = inRange(60)(70)
 * const isF = inRange(0)(60)
 *
 * const grade = 85
 * isB(grade)
 * // true
 *
 * // Time validation (24-hour)
 * const isValidHour = inRange(0)(24)
 * const isValidMinute = inRange(0)(60)
 * const isValidSecond = inRange(0)(60)
 *
 * isValidHour(14)
 * // true
 * isValidMinute(75)
 * // false
 *
 * // Game boundaries
 * const isInBoundsX = inRange(0)(800)
 * const isInBoundsY = inRange(0)(600)
 *
 * function isInGameArea(x: number, y: number): boolean {
 *   return isInBoundsX(x) && isInBoundsY(y)
 * }
 * isInGameArea(400, 300)
 * // true
 * isInGameArea(900, 300)
 * // false
 *
 * // HTTP status codes
 * const isSuccess = inRange(200)(300)
 * const isRedirect = inRange(300)(400)
 * const isClientError = inRange(400)(500)
 * const isServerError = inRange(500)(600)
 *
 * const statusCode = 404
 * isClientError(statusCode)
 * // true
 *
 * // Port number validation
 * const isValidPort = inRange(1)(65536)
 * isValidPort(8080)
 * // true
 * isValidPort(0)
 * // false
 * isValidPort(70000)
 * // false
 *
 * // Filtering arrays
 * const numbers = [-5, 0, 5, 10, 15, 20, 25]
 * const inRange10To20 = inRange(10)(20)
 * numbers.filter(inRange10To20)
 * // [10, 15]
 *
 * // Date range (simplified day of year)
 * const isSummer = inRange(172)(266) // ~Jun 21 to ~Sep 22
 * const dayOfYear = 200
 * isSummer(dayOfYear)
 * // true
 *
 * // Difficulty settings
 * const difficultyRanges = {
 *   easy: inRange(1)(4),
 *   medium: inRange(4)(7),
 *   hard: inRange(7)(10),
 *   extreme: inRange(10)(11)
 * }
 * const level = 5
 * difficultyRanges.medium(level)
 * // true
 *
 * // Safe range check with validation
 * function safeInRange(start: unknown, end: unknown, value: unknown): boolean {
 *   const s = typeof start === 'number' ? start : NaN
 *   const e = typeof end === 'number' ? end : NaN
 *   const v = typeof value === 'number' ? value : NaN
 *   if (isNaN(s) || isNaN(e) || isNaN(v)) return false
 *   return inRange(s)(e)(v)
 * }
 * safeInRange(0, 10, 5)
 * // true
 * safeInRange("0", 10, 5)
 * // false
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns false for invalid inputs
 * @property Auto-swap - Automatically handles start > end
 * @property Half-open - Range is [start, end) by default
 */
const inRange = (
	start: number | null | undefined,
) =>
(
	end: number | null | undefined,
) =>
(
	value: number | null | undefined,
): boolean => {
	if (start == null || typeof start !== "number") {
		return false
	}

	if (end == null || typeof end !== "number") {
		return false
	}

	if (value == null || typeof value !== "number") {
		return false
	}

	// Handle NaN
	if (isNaN(start) || isNaN(end) || isNaN(value)) {
		return false
	}

	// Auto-swap if start > end
	const min = Math.min(start, end)
	const max = Math.max(start, end)

	// Check range [min, max)
	return value >= min && value < max
}

export default inRange
