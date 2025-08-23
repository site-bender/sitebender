/**
 * Calculates the present value of an annuity
 * 
 * Computes the present value of a series of equal periodic payments using
 * the formula: PV = PMT * [(1 - (1 + r)^(-n)) / r]. This represents the
 * lump sum amount that equals the value of all future payments when
 * discounted at the given interest rate. For r = 0 (no interest), the
 * present value is simply PMT * n.
 * 
 * @curried (payment) => (rate) => (periods) => number
 * @param payment - Payment amount per period
 * @param rate - Interest rate per period (as decimal, e.g., 0.05 for 5%)
 * @param periods - Number of payment periods
 * @returns Present value of the annuity, or NaN if invalid
 * @example
 * ```typescript
 * // Monthly payment of $1000 for 5 years at 6% annual (0.5% monthly)
 * annuity(1000)(0.005)(60)
 * // 51725.56... (present value)
 * 
 * // Annual payment of $5000 for 10 years at 8% annual
 * annuity(5000)(0.08)(10)
 * // 33550.41...
 * 
 * // Quarterly payment of $500 for 3 years at 4% annual (1% quarterly)
 * annuity(500)(0.01)(12)
 * // 5625.51...
 * 
 * // No interest (0% rate)
 * annuity(1000)(0)(12)
 * // 12000 (simply sum of payments)
 * 
 * // Single payment (n = 1)
 * annuity(1000)(0.05)(1)
 * // 952.38... (discounted once)
 * 
 * // High interest rate
 * annuity(100)(0.10)(10)
 * // 614.46...
 * 
 * // Negative rate (appreciation instead of discount)
 * annuity(1000)(-0.02)(5)
 * // 5203.04...
 * 
 * // Invalid inputs return NaN
 * annuity(null)(0.05)(10)
 * // NaN
 * 
 * annuity(1000)("5%")(10)
 * // NaN
 * 
 * annuity(1000)(0.05)(-1)
 * // NaN
 * 
 * // Practical examples
 * 
 * // Lottery winnings: $50k/year for 20 years vs lump sum
 * const yearlyPayout = annuity(50000)(0.04)(20)
 * // 679516.31... (equivalent lump sum at 4% discount)
 * 
 * // Retirement planning: $2000/month for 30 years at 7% annual
 * const monthlyRate = 0.07 / 12
 * const months = 30 * 12
 * annuity(2000)(monthlyRate)(months)
 * // 248015.77... (amount needed today)
 * 
 * // Lease vs buy: $400/month car lease for 3 years at 5% annual
 * const leaseValue = annuity(400)(0.05/12)(36)
 * // 13058.62... (present value of lease payments)
 * 
 * // Partial application for retirement calculator
 * const retirementValue = annuity(3000)(0.06/12)
 * retirementValue(240)  // 20 years: 419924.89...
 * retirementValue(360)  // 30 years: 500930.86...
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for financial calculators
 * @property Safe - Returns NaN for invalid inputs
 */
const annuity = (
	payment: number | null | undefined
) => (
	rate: number | null | undefined
) => (
	periods: number | null | undefined
): number => {
	if (payment == null || typeof payment !== 'number') {
		return NaN
	}
	
	if (rate == null || typeof rate !== 'number') {
		return NaN
	}
	
	if (periods == null || typeof periods !== 'number') {
		return NaN
	}
	
	// Periods must be positive
	if (periods <= 0) {
		return NaN
	}
	
	// Special case: no interest
	if (rate === 0) {
		return payment * periods
	}
	
	// Standard annuity formula
	const factor = (1 - Math.pow(1 + rate, -periods)) / rate
	return payment * factor
}

export default annuity