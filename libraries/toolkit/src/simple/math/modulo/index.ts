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
 * modulo(3)(10)
 * // 1
 *
 * modulo(3)(-10)
 * // 2 (true modulo, not remainder)
 *
 * modulo(0.5)(2.3)
 * // 0.3
 *
 * modulo(0)(10)
 * // NaN (division by zero)
 *
 * // Partial application
 * const mod12 = modulo(12)
 * mod12(25)
 * // 1 (clock arithmetic)
 *
 * // Cyclic indexing
 * const cyclicIndex = (index: number, length: number) =>
 *   modulo(length)(index)
 * cyclicIndex(-1, 5)
 * // 4 (last element)
 *
 * // Even/odd checking
 * const isEven = (n: number) => modulo(2)(n) === 0
 * isEven(4)
 * // true
 * ```
 * @pure Always returns same result for same inputs
 * @curried Enables partial application and composition
 * @safe Returns NaN for invalid inputs or division by zero
 * @mathematical Implements true modulo (not remainder)
 */
const modulo = (
	divisor: number | null | undefined,
) =>
(
	dividend: number | null | undefined,
): number => {
	if (divisor == null || typeof divisor !== "number") {
		return NaN
	}

	if (dividend == null || typeof dividend !== "number") {
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
