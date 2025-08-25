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
 * // Basic usage
 * digitSum(123)
 * // 6 (1 + 2 + 3)
 *
 * digitSum(999)
 * // 27 (9 + 9 + 9)
 *
 * // Negative numbers (sign ignored)
 * digitSum(-123)
 * // 6 (uses absolute value)
 *
 * // Decimal numbers (fractional part ignored)
 * digitSum(123.456)
 * // 6 (only 123 is considered)
 *
 * // Special values
 * digitSum(Infinity)
 * // NaN
 *
 * digitSum(0)
 * // 0
 *
 * // Array operations
 * const numbers = [123, 456, 789]
 * const sums = numbers.map(digitSum)
 * // [6, 15, 24]
 *
 * // Check divisibility by 9 (sum divisible by 9)
 * const isDivisibleBy9 = (n: number) => digitSum(n) % 9 === 0
 * isDivisibleBy9(999)
 * // true (sum = 27, divisible by 9)
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 * @absolute Uses absolute value (ignores sign)
 * @integer Only considers integer part of decimals
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
