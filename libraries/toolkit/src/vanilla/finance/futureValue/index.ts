import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the future value of an investment
 *
 * Computes the future value using compound interest with optional periodic
 * payments. Uses the formula: FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r].
 * All rates should be per period (e.g., monthly rate for monthly payments).
 * Returns NaN for invalid inputs.
 *
 * @param rate - Interest rate per period (as decimal, e.g., 0.05 for 5%)
 * @param periods - Number of periods
 * @param payment - Payment made each period (negative for outflows)
 * @param presentValue - Present value (negative for outflows)
 * @param type - When payments occur: 0=end of period, 1=beginning (default: 0)
 * @returns Future value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * futureValue(0.05)(10)(0)(-1000)(0)
 * // 1628.89 ($1000 at 5% for 10 years)
 *
 * futureValue(0.005)(120)(-100)(0)(0)
 * // 16388.45 ($100/month for 10 years)
 *
 * futureValue(0.005)(120)(-100)(-5000)(0)
 * // 24534.00 ($5000 initial + $100/month)
 *
 * // Edge cases
 * futureValue(0)(60)(-200)(0)(0)
 * // 12000 (no interest)
 *
 * futureValue(0.005)(120)(-100)(0)(1)
 * // 16470.09 (payments at beginning)
 *
 * // Partial application
 * const at5Percent = futureValue(0.05)
 * at5Percent(10)(0)(-1000)(0)  // 10 years: 1628.89
 * at5Percent(20)(0)(-1000)(0)  // 20 years: 2653.30
 *
 * // Invalid inputs
 * futureValue(null)(10)(0)(-1000)(0)  // NaN
 * futureValue(0.05)(-5)(0)(-1000)(0)  // NaN
 * ```
 * @pure
 * @curried
 * @safe - Returns NaN for invalid inputs
 */
const futureValue = (
	rate: number | null | undefined,
) =>
(
	periods: number | null | undefined,
) =>
(
	payment: number | null | undefined,
) =>
(
	presentValue: number | null | undefined,
) =>
(
	type: number = 0,
): number => {
	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	if (isNullish(periods) || typeof periods !== "number") {
		return NaN
	}

	if (isNullish(payment) || typeof payment !== "number") {
		return NaN
	}

	if (isNullish(presentValue) || typeof presentValue !== "number") {
		return NaN
	}

	if (isNullish(type) || typeof type !== "number") {
		return NaN
	}

	// Validate inputs
	if (periods < 0 || !Number.isFinite(periods)) {
		return NaN
	}

	if (type !== 0 && type !== 1) {
		return NaN
	}

	// Handle zero periods
	if (periods === 0) {
		return -presentValue
	}

	// Calculate compound factor
	const compoundFactor = Math.pow(1 + rate, periods)

	// Calculate future value of present value
	const fvOfPv = -presentValue * compoundFactor

	// Calculate future value of payments
	let fvOfPayments = 0
	if (payment !== 0) {
		if (rate === 0) {
			// Simple case: no interest
			fvOfPayments = -payment * periods
		} else {
			// Annuity formula
			fvOfPayments = -payment * ((compoundFactor - 1) / rate)

			// Adjust for payment timing
			if (type === 1) {
				// Payments at beginning of period
				fvOfPayments *= 1 + rate
			}
		}
	}

	return fvOfPv + fvOfPayments
}

export default futureValue
