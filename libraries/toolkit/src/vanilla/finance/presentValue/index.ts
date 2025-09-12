import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the present value of future cash flows
 *
 * Computes the current worth of a future sum or series of cash flows given
 * a discount rate. Uses the formula: PV = FV / (1 + r)^n, where FV is future
 * value, r is discount rate per period, and n is number of periods. Discount
 * rate must be greater than -1. Returns NaN for invalid inputs.
 *
 * @param futureValue - Future amount to be received
 * @param rate - Discount rate per period as decimal (0.05 for 5%)
 * @param periods - Number of periods until payment
 * @returns Present value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic present value
 * presentValue(1000)(0.05)(1) // 952.38 (1000 in 1 year at 5% discount)
 * presentValue(1000)(0.10)(5) // 620.92 (1000 in 5 years at 10% discount)
 *
 * // Zero discount rate (no time value)
 * presentValue(1000)(0)(10) // 1000 (no discounting)
 *
 * // Monthly compounding (convert annual rate)
 * presentValue(1000)(0.12/12)(12) // 887.45 (12% annual, monthly)
 *
 * // Bond valuation (single payment)
 * const bondPV = presentValue(1000)  // $1000 face value
 * bondPV(0.04)(5)   // 821.93 (5 years at 4%)
 * bondPV(0.06)(10)  // 558.39 (10 years at 6%)
 *
 * // Series of payments using reduce
 * const annuityPV = (payment: number, rate: number, periods: number) =>
 *   Array.from({length: periods}, (_, i) => i + 1)
 *     .reduce((sum, period) => sum + presentValue(payment)(rate)(period), 0)
 * annuityPV(1000, 0.05, 5)  // 4329.48
 *
 * // Edge cases
 * presentValue(1000)(0.10)(0) // 1000 (no periods)
 * presentValue(1000)(-1.5)(5) // NaN (rate below -100%)
 * presentValue(null)(0.05)(2) // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const presentValue = (
	futureValue: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	periods: number | null | undefined,
): number => {
	if (isNullish(futureValue) || typeof futureValue !== "number") {
		return NaN
	}

	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	// Rate must be greater than -1 (can't lose more than 100%)
	if (rate <= -1) {
		return NaN
	}

	if (isNullish(periods) || typeof periods !== "number") {
		return NaN
	}

	if (periods < 0) {
		return NaN
	}

	// Special case: zero periods means no discounting
	if (periods === 0) {
		return futureValue
	}

	// Special case: zero rate means no discounting
	if (rate === 0) {
		return futureValue
	}

	// PV = FV / (1 + r)^n
	return futureValue / Math.pow(1 + rate, periods)
}

export default presentValue
