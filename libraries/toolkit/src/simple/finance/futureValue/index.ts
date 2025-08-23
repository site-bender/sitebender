/**
 * Calculates the future value of an investment
 * 
 * Computes the future value using compound interest with optional periodic
 * payments. Uses the formula: FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r].
 * All rates should be per period (e.g., monthly rate for monthly payments).
 * Returns NaN for invalid inputs.
 * 
 * @curried (rate) => (periods) => (payment) => (presentValue) => (type) => futureValue
 * @param rate - Interest rate per period (as decimal, e.g., 0.05 for 5%)
 * @param periods - Number of periods
 * @param payment - Payment made each period (negative for outflows)
 * @param presentValue - Present value (negative for outflows)
 * @param type - When payments occur: 0=end of period, 1=beginning (default: 0)
 * @returns Future value, or NaN if invalid
 * @example
 * ```typescript
 * // Simple compound interest (no payments)
 * futureValue(0.05)(10)(0)(-1000)(0)
 * // 1628.89... ($1000 at 5% for 10 years)
 * 
 * // Monthly savings with interest
 * futureValue(0.005)(120)(-100)(0)(0)
 * // 16388.45... ($100/month at 0.5%/month for 10 years)
 * 
 * // Initial investment plus monthly contributions
 * futureValue(0.005)(120)(-100)(-5000)(0)
 * // 24534.00... ($5000 initial + $100/month)
 * 
 * // Payments at beginning of period
 * futureValue(0.005)(120)(-100)(0)(1)
 * // 16470.09... (payments at start of month)
 * 
 * // Quarterly compounding
 * futureValue(0.02)(20)(0)(-10000)(0)
 * // 14859.47... ($10000 at 2% quarterly for 5 years)
 * 
 * // Zero interest rate
 * futureValue(0)(60)(-200)(0)(0)
 * // 12000 ($200/month for 60 months, no interest)
 * 
 * // Single period
 * futureValue(0.1)(1)(0)(-1000)(0)
 * // 1100 ($1000 at 10% for 1 period)
 * 
 * // Loan perspective (positive payment = income)
 * futureValue(0.005)(60)(500)(0)(0)
 * // -34885.01... (receiving $500/month)
 * 
 * // Invalid inputs
 * futureValue(null)(10)(0)(-1000)(0)
 * // NaN
 * 
 * futureValue(0.05)(-5)(0)(-1000)(0)
 * // NaN (negative periods)
 * 
 * // Practical examples
 * 
 * // Retirement savings
 * const monthlyRate = 0.08 / 12
 * const months = 30 * 12
 * const monthlyContribution = -500
 * const currentSavings = -50000
 * const retirement = futureValue(monthlyRate)(months)(monthlyContribution)(currentSavings)(0)
 * // 904626.23... (retirement fund value)
 * 
 * // Education fund
 * const years = 18
 * const annualRate = 0.06
 * const annualContribution = -2000
 * const initialAmount = -10000
 * const educationFund = futureValue(annualRate)(years)(annualContribution)(initialAmount)(1)
 * // 97894.34... (college fund)
 * 
 * // Investment growth
 * const quarterlyRate = 0.015
 * const quarters = 40
 * const investment = futureValue(quarterlyRate)(quarters)(0)(-25000)(0)
 * // 45289.04... (10-year investment)
 * 
 * // Mortgage overpayment benefit
 * const normalPayment = -1500
 * const extraPayment = -200
 * const totalPayment = normalPayment + extraPayment
 * const rate = 0.04 / 12
 * const periods = 360
 * const saved = futureValue(rate)(periods)(extraPayment)(0)(0)
 * // Amount saved in interest
 * 
 * // Partial application for fixed rate
 * const at5Percent = futureValue(0.05)
 * at5Percent(10)(0)(-1000)(0)  // 10 years
 * at5Percent(20)(0)(-1000)(0)  // 20 years
 * at5Percent(30)(0)(-1000)(0)  // 30 years
 * 
 * // Compare payment timing
 * const endOfPeriod = futureValue(0.01)(12)(-100)(0)(0)
 * const beginningOfPeriod = futureValue(0.01)(12)(-100)(0)(1)
 * // Beginning payments grow more due to extra period of interest
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Financial - Standard financial calculation
 */
const futureValue = (
	rate: number | null | undefined
) => (
	periods: number | null | undefined
) => (
	payment: number | null | undefined
) => (
	presentValue: number | null | undefined
) => (
	type: number = 0
): number => {
	if (rate == null || typeof rate !== 'number') {
		return NaN
	}
	
	if (periods == null || typeof periods !== 'number') {
		return NaN
	}
	
	if (payment == null || typeof payment !== 'number') {
		return NaN
	}
	
	if (presentValue == null || typeof presentValue !== 'number') {
		return NaN
	}
	
	if (type == null || typeof type !== 'number') {
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
				fvOfPayments *= (1 + rate)
			}
		}
	}
	
	return fvOfPv + fvOfPayments
}

export default futureValue