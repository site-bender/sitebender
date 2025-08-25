/**
 * Calculates the sum of digits in a number
 *
 * Computes the sum of all individual digits in the absolute value of a
 * number. For negative numbers, the sign is ignored and digits are summed.
 * For decimal numbers, only the integer part is considered. Returns NaN
 * for non-numeric inputs to support safe error handling.
 *
 * @param n - Number to sum digits of
 * @returns Sum of all digits, or NaN if invalid
 * @example
 * ```typescript
 * // Single digit
 * digitSum(5)
 * // 5
 *
 * digitSum(9)
 * // 9
 *
 * digitSum(0)
 * // 0
 *
 * // Multiple digits
 * digitSum(123)
 * // 6 (1 + 2 + 3)
 *
 * digitSum(456)
 * // 15 (4 + 5 + 6)
 *
 * digitSum(999)
 * // 27 (9 + 9 + 9)
 *
 * digitSum(1000)
 * // 1 (1 + 0 + 0 + 0)
 *
 * // Negative numbers (sign ignored)
 * digitSum(-123)
 * // 6 (uses absolute value)
 *
 * digitSum(-456)
 * // 15
 *
 * digitSum(-9)
 * // 9
 *
 * // Decimal numbers (fractional part ignored)
 * digitSum(123.456)
 * // 6 (only 123 is considered)
 *
 * digitSum(99.99)
 * // 18 (only 99 is considered)
 *
 * digitSum(0.5)
 * // 0 (truncates to 0)
 *
 * digitSum(-12.34)
 * // 3 (1 + 2, ignores sign and decimal)
 *
 * // Large numbers
 * digitSum(123456789)
 * // 45 (1+2+3+4+5+6+7+8+9)
 *
 * digitSum(9876543210)
 * // 45
 *
 * digitSum(1111111111)
 * // 10
 *
 * // Powers of 10
 * digitSum(10)
 * // 1
 *
 * digitSum(100)
 * // 1
 *
 * digitSum(1000)
 * // 1
 *
 * digitSum(10000)
 * // 1
 *
 * // Special patterns
 * digitSum(1234567890)
 * // 45
 *
 * digitSum(123321)
 * // 12 (1+2+3+3+2+1)
 *
 * digitSum(11111)
 * // 5
 *
 * digitSum(12345)
 * // 15
 *
 * // Edge cases
 * digitSum(Number.MAX_SAFE_INTEGER)
 * // 76 (9007199254740991)
 *
 * digitSum(0)
 * // 0
 *
 * digitSum(-0)
 * // 0
 *
 * // Special values
 * digitSum(Infinity)
 * // NaN
 *
 * digitSum(-Infinity)
 * // NaN
 *
 * digitSum(NaN)
 * // NaN
 *
 * // Invalid inputs return NaN
 * digitSum(null)
 * // NaN
 *
 * digitSum(undefined)
 * // NaN
 *
 * digitSum("123")
 * // NaN
 *
 * digitSum("abc")
 * // NaN
 *
 * digitSum({})
 * // NaN
 *
 * digitSum([])
 * // NaN
 *
 * // Digital root calculation (iterative digit sum)
 * function digitalRoot(n: number): number {
 *   let sum = digitSum(n)
 *   while (sum >= 10 && !isNaN(sum)) {
 *     sum = digitSum(sum)
 *   }
 *   return sum
 * }
 * digitalRoot(123)
 * // 6 (123 -> 6)
 * digitalRoot(456)
 * // 6 (456 -> 15 -> 6)
 * digitalRoot(9999)
 * // 9 (9999 -> 36 -> 9)
 *
 * // Check divisibility by 3 (sum divisible by 3)
 * function isDivisibleBy3(n: number): boolean {
 *   return digitSum(n) % 3 === 0
 * }
 * isDivisibleBy3(123)
 * // true (sum = 6, divisible by 3)
 * isDivisibleBy3(124)
 * // false (sum = 7, not divisible by 3)
 *
 * // Check divisibility by 9 (sum divisible by 9)
 * function isDivisibleBy9(n: number): boolean {
 *   return digitSum(n) % 9 === 0
 * }
 * isDivisibleBy9(999)
 * // true (sum = 27, divisible by 9)
 * isDivisibleBy9(998)
 * // false (sum = 26, not divisible by 9)
 *
 * // Checksum validation
 * function validateChecksum(number: number, expected: number): boolean {
 *   return digitSum(number) === expected
 * }
 * validateChecksum(12345, 15)
 * // true
 *
 * // Lucky number check (reduces to single digit 7)
 * function isLucky(n: number): boolean {
 *   const root = digitalRoot(n)
 *   return root === 7
 * }
 * isLucky(1234)
 * // false (root = 1)
 * isLucky(16)
 * // true (1 + 6 = 7)
 *
 * // Credit card validation helper (simplified)
 * function luhnCheckDigit(cardNumber: number): number {
 *   // Simplified version using digit sum
 *   return digitSum(cardNumber) % 10
 * }
 *
 * // Narcissistic number check helper
 * function sumOfPowers(n: number, power: number): number {
 *   const digits = Math.abs(Math.trunc(n)).toString()
 *   return digits.split('').reduce((sum, d) =>
 *     sum + Math.pow(parseInt(d), power), 0
 *   )
 * }
 *
 * // Happy number check helper
 * function isHappy(n: number): boolean {
 *   const seen = new Set<number>()
 *   let current = n
 *
 *   while (current !== 1 && !seen.has(current)) {
 *     seen.add(current)
 *     const digits = Math.abs(Math.trunc(current)).toString()
 *     current = digits.split('').reduce((sum, d) =>
 *       sum + Math.pow(parseInt(d), 2), 0
 *     )
 *   }
 *
 *   return current === 1
 * }
 *
 * // Array of numbers digit sum
 * const numbers = [123, 456, 789]
 * const sums = numbers.map(digitSum)
 * // [6, 15, 24]
 *
 * // Finding numbers with specific digit sum
 * const range = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
 * const withSum10 = range.filter(n => digitSum(n) === 10)
 * // [19]
 *
 * // Sorting by digit sum
 * const values = [321, 123, 213, 111, 222]
 * values.sort((a, b) => digitSum(a) - digitSum(b))
 * // [111, 321, 123, 213, 222] (sums: 3, 6, 6, 6, 6)
 *
 * // Safe calculation with validation
 * function safeDigitSum(value: unknown): number | null {
 *   const num = typeof value === 'number' ? digitSum(value) : NaN
 *   return isNaN(num) ? null : num
 * }
 * safeDigitSum(123)
 * // 6
 * safeDigitSum("invalid")
 * // null
 * ```
 * @property Pure - Always returns same result for same input
 * @property Safe - Returns NaN for invalid inputs
 * @property Absolute - Uses absolute value (ignores sign)
 * @property Integer - Only considers integer part of decimals
 */
const digitSum = (
	n: number | null | undefined,
): number => {
	if (n == null || typeof n !== "number") {
		return NaN
	}

	if (!isFinite(n)) {
		return NaN
	}

	// Get absolute value and truncate to integer
	const absInt = Math.abs(Math.trunc(n))

	// Convert to string and sum digits
	const digits = absInt.toString()
	let sum = 0

	for (const digit of digits) {
		sum += parseInt(digit, 10)
	}

	return sum
}

export default digitSum
