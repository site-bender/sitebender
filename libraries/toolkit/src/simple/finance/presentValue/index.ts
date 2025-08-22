/**
 * Calculates the present value of future cash flows
 * 
 * Computes the current worth of a future sum or series of cash flows given
 * a discount rate. Uses the formula: PV = FV / (1 + r)^n, where FV is future
 * value, r is discount rate per period, and n is number of periods. Discount
 * rate must be greater than -1. Returns NaN for invalid inputs.
 * 
 * @curried (futureValue) => (rate) => (periods) => number
 * @param futureValue - Future amount to be received
 * @param rate - Discount rate per period as decimal (0.05 for 5%)
 * @param periods - Number of periods until payment
 * @returns Present value, or NaN if invalid
 * @example
 * ```typescript
 * // Basic present value
 * presentValue(1000)(0.05)(1)
 * // 952.38 (1000 in 1 year at 5% discount)
 * 
 * presentValue(1000)(0.05)(2)
 * // 907.03 (1000 in 2 years at 5% discount)
 * 
 * presentValue(1000)(0.10)(5)
 * // 620.92 (1000 in 5 years at 10% discount)
 * 
 * // Zero discount rate (no time value)
 * presentValue(1000)(0)(10)
 * // 1000 (no discounting)
 * 
 * // High discount rates
 * presentValue(10000)(0.20)(10)
 * // 1615.06 (heavy discounting)
 * 
 * presentValue(10000)(0.50)(5)
 * // 1316.87 (very high discount)
 * 
 * // Fractional periods
 * presentValue(1000)(0.08)(2.5)
 * // 835.26
 * 
 * presentValue(5000)(0.06)(0.5)
 * // 4854.37 (half year)
 * 
 * // Monthly compounding (convert annual rate)
 * presentValue(1000)(0.12/12)(12)
 * // 887.45 (12% annual, monthly compounding, 1 year)
 * 
 * // Negative future value (payment owed)
 * presentValue(-5000)(0.07)(3)
 * // -4081.49 (debt in today's dollars)
 * 
 * // Zero periods (immediate payment)
 * presentValue(1000)(0.10)(0)
 * // 1000 (no discounting needed)
 * 
 * // Invalid inputs return NaN
 * presentValue(1000)(-1.5)(5)
 * // NaN (rate below -100%)
 * 
 * presentValue(null)(0.05)(2)
 * // NaN
 * 
 * presentValue(1000)("0.05")(2)
 * // NaN
 * 
 * // Practical examples
 * 
 * // Bond valuation (single payment)
 * const bondPV = presentValue(1000)  // $1000 face value
 * bondPV(0.04)(5)   // 821.93 (5 years at 4%)
 * bondPV(0.06)(10)  // 558.39 (10 years at 6%)
 * 
 * // Investment evaluation
 * const futureReturn = 50000
 * const requiredReturn = 0.12
 * presentValue(futureReturn)(requiredReturn)(5)
 * // 28371.34 (maximum to pay today for 12% return)
 * 
 * // Lottery winnings
 * const lotteryPV = (payout: number, years: number) =>
 *   presentValue(payout)(0.03)(years)
 * lotteryPV(1000000, 20)  // 553675.75 (lump sum equivalent)
 * 
 * // Real estate valuation
 * const propertyValue = (salePrice: number, years: number, appreciation: number) =>
 *   presentValue(salePrice)(appreciation)(years)
 * propertyValue(500000, 10, 0.07)  // 254174.65
 * 
 * // Inflation adjustment
 * const realValue = (nominal: number, inflation: number, years: number) =>
 *   presentValue(nominal)(inflation)(years)
 * realValue(100, 0.03, 10)  // 74.41 (purchasing power)
 * 
 * // Series of payments (annuity approximation)
 * const annuityPV = (payment: number, rate: number, periods: number) => {
 *   let total = 0
 *   for (let i = 1; i <= periods; i++) {
 *     total += presentValue(payment)(rate)(i)
 *   }
 *   return total
 * }
 * annuityPV(1000, 0.05, 5)  // 4329.48
 * 
 * // Partial application for scenario analysis
 * const evaluate = presentValue(100000)
 * const conservative = evaluate(0.05)  // Low discount
 * const aggressive = evaluate(0.15)    // High discount
 * 
 * conservative(10)  // 61391.33
 * aggressive(10)    // 24718.47
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Time-value - Accounts for time value of money
 */
const presentValue = (
	futureValue: number | null | undefined
) => (
	rate: number | null | undefined
) => (
	periods: number | null | undefined
): number => {
	if (futureValue == null || typeof futureValue !== 'number') {
		return NaN
	}
	
	if (rate == null || typeof rate !== 'number') {
		return NaN
	}
	
	// Rate must be greater than -1 (can't lose more than 100%)
	if (rate <= -1) {
		return NaN
	}
	
	if (periods == null || typeof periods !== 'number') {
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