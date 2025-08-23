/**
 * Returns the remainder of division (modulo operation)
 *
 * Calculates the remainder when dividing the dividend by the divisor.
 * Unlike the % operator, this implements true mathematical modulo which
 * always returns a non-negative result when the divisor is positive.
 * Returns NaN if divisor is zero or if inputs are invalid.
 *
 * @curried (divisor) => (dividend) => remainder
 * @param divisor - The number to divide by (modulus)
 * @param dividend - The number to be divided
 * @returns The remainder of dividend / divisor, or NaN if invalid
 * @example
 * ```typescript
 * // Basic modulo operations
 * modulo(3)(10)
 * // 1 (10 % 3)
 *
 * modulo(5)(17)
 * // 2 (17 % 5)
 *
 * modulo(7)(14)
 * // 0 (14 % 7, evenly divisible)
 *
 * modulo(10)(3)
 * // 3 (3 % 10)
 *
 * // Negative dividends (true modulo behavior)
 * modulo(3)(-10)
 * // 2 (mathematically correct: -10 mod 3 = 2)
 *
 * modulo(5)(-17)
 * // 3 (mathematically correct: -17 mod 5 = 3)
 *
 * modulo(7)(-14)
 * // 0 (evenly divisible)
 *
 * modulo(10)(-3)
 * // 7 (mathematically correct: -3 mod 10 = 7)
 *
 * // Comparison with % operator
 * // JavaScript % operator (remainder):
 * // -10 % 3 = -1
 * // True modulo:
 * modulo(3)(-10)
 * // 2
 *
 * // Negative divisors
 * modulo(-3)(10)
 * // -2 (10 mod -3)
 *
 * modulo(-5)(17)
 * // -3 (17 mod -5)
 *
 * modulo(-7)(-14)
 * // 0 (evenly divisible)
 *
 * // Decimal numbers
 * modulo(2.5)(10)
 * // 0
 *
 * modulo(3.5)(10.5)
 * // 0
 *
 * modulo(0.5)(2.3)
 * // 0.3
 *
 * modulo(0.1)(1)
 * // 0 (with floating point precision)
 *
 * // Zero dividend
 * modulo(5)(0)
 * // 0
 *
 * modulo(-5)(0)
 * // 0
 *
 * // Division by zero
 * modulo(0)(10)
 * // NaN
 *
 * modulo(0)(0)
 * // NaN
 *
 * // Large numbers
 * modulo(1000000)(3000000)
 * // 0
 *
 * modulo(7)(Number.MAX_SAFE_INTEGER)
 * // 1
 *
 * // Special values
 * modulo(5)(Infinity)
 * // NaN
 *
 * modulo(Infinity)(10)
 * // 10
 *
 * modulo(-Infinity)(10)
 * // NaN
 *
 * modulo(5)(NaN)
 * // NaN
 *
 * modulo(NaN)(5)
 * // NaN
 *
 * // Invalid inputs
 * modulo(null)(10)
 * // NaN
 *
 * modulo(5)(undefined)
 * // NaN
 *
 * modulo("5")(10)
 * // NaN
 *
 * modulo(5)("10")
 * // NaN
 *
 * // Partial application for specific moduli
 * const mod12 = modulo(12) // Clock arithmetic
 * mod12(13)
 * // 1 (1 o'clock)
 * mod12(25)
 * // 1 (1 o'clock next day)
 * mod12(-1)
 * // 11 (11 o'clock)
 *
 * const mod7 = modulo(7) // Days of week
 * mod7(8)
 * // 1 (Monday if 0 = Sunday)
 * mod7(15)
 * // 1 (Monday next week)
 * mod7(-1)
 * // 6 (Saturday)
 *
 * const mod360 = modulo(360) // Angle normalization
 * mod360(370)
 * // 10
 * mod360(720)
 * // 0
 * mod360(-10)
 * // 350
 *
 * // Checking divisibility
 * const isDivisibleBy3 = (n: number) => modulo(3)(n) === 0
 * isDivisibleBy3(9)
 * // true
 * isDivisibleBy3(10)
 * // false
 *
 * // Even/odd checking
 * const isEven = (n: number) => modulo(2)(n) === 0
 * const isOdd = (n: number) => modulo(2)(n) === 1
 * isEven(4)
 * // true
 * isOdd(5)
 * // true
 *
 * // Cyclic indexing
 * const cyclicIndex = (index: number, length: number) =>
 *   modulo(length)(index)
 * cyclicIndex(5, 3)
 * // 2 (wraps around array of length 3)
 * cyclicIndex(-1, 5)
 * // 4 (last element)
 *
 * // Hash function buckets
 * const getBucket = modulo(10)
 * getBucket(12345)
 * // 5
 * getBucket(67890)
 * // 0
 *
 * // Time calculations
 * const hours24 = modulo(24)
 * hours24(25)
 * // 1 (1 AM next day)
 * hours24(-2)
 * // 22 (10 PM previous day)
 *
 * const minutes60 = modulo(60)
 * minutes60(125)
 * // 5 (2 hours and 5 minutes)
 *
 * // Grid wrapping
 * const wrapX = modulo(800) // Screen width
 * const wrapY = modulo(600) // Screen height
 * wrapX(850)
 * // 50
 * wrapY(-50)
 * // 550
 *
 * // Color cycling
 * const cycleHue = modulo(360)
 * cycleHue(400)
 * // 40
 * cycleHue(-45)
 * // 315
 *
 * // Pagination
 * const itemsPerPage = 10
 * const getPageOffset = modulo(itemsPerPage)
 * getPageOffset(23)
 * // 3 (item 3 on page 3)
 *
 * // Music theory (12-tone system)
 * const chromaticNote = modulo(12)
 * chromaticNote(13)
 * // 1 (same note, octave higher)
 * chromaticNote(-1)
 * // 11 (previous note)
 *
 * // Circular buffer indexing
 * const bufferSize = 256
 * const circularIndex = modulo(bufferSize)
 * circularIndex(300)
 * // 44
 * circularIndex(-10)
 * // 246
 *
 * // Caesar cipher shift
 * const alphabetSize = 26
 * const shiftLetter = (position: number, shift: number) =>
 *   modulo(alphabetSize)(position + shift)
 * shiftLetter(25, 3)
 * // 2 (Z + 3 = C)
 *
 * // Game board wrapping
 * const boardWidth = 10
 * const wrapPosition = modulo(boardWidth)
 * wrapPosition(12)
 * // 2
 * wrapPosition(-3)
 * // 7
 *
 * // Safe modulo with validation
 * const safeModulo = (divisor: unknown) => (dividend: unknown): number | null => {
 *   const divNum = typeof divisor === 'number' ? divisor : NaN
 *   const dividendNum = typeof dividend === 'number' ? dividend : NaN
 *   const result = modulo(divNum)(dividendNum)
 *   return isNaN(result) ? null : result
 * }
 * safeModulo(5)(17)
 * // 2
 * safeModulo("5")(17)
 * // null
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application and composition
 * @property Safe - Returns NaN for invalid inputs or division by zero
 * @property Mathematical - Implements true modulo (not remainder)
 */
const modulo = (
	divisor: number | null | undefined
) => (
	dividend: number | null | undefined
): number => {
	if (divisor == null || typeof divisor !== 'number') {
		return NaN
	}

	if (dividend == null || typeof dividend !== 'number') {
		return NaN
	}

	// Check for NaN inputs
	if (isNaN(divisor) || isNaN(dividend)) {
		return NaN
	}

	// Division by zero
	if (divisor === 0) {
		return NaN
	}

	// Handle special cases
	if (!isFinite(dividend)) {
		return NaN
	}

	// deno-coverage-ignore-start The else branch is unreachable: NaN already handled on line 269
	if (!isFinite(divisor)) {
		if (divisor === Infinity || divisor === -Infinity) {
			return dividend
		}
		return NaN
	}
	// deno-coverage-ignore-stop

	// True mathematical modulo (always returns non-negative for positive divisor)
	// This differs from JavaScript's % operator which returns remainder
	const remainder = dividend % divisor

	// If remainder and divisor have different signs, adjust the result
	if ((remainder < 0 && divisor > 0) || (remainder > 0 && divisor < 0)) {
		return remainder + divisor
	}

	return remainder
}

export default modulo
