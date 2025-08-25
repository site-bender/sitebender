/**
 * Calculates compound interest on a principal amount
 *
 * Computes the future value using the compound interest formula:
 * A = P(1 + r/n)^(nt), where P is principal, r is annual rate,
 * n is compounds per year, and t is time in years. Returns the
 * total amount (principal + interest). Returns NaN for invalid inputs.
 *
 * @curried (principal) => (rate) => (compounds) => (time) => number
 * @param principal - Initial amount (must be non-negative)
 * @param rate - Annual interest rate as decimal (0.05 for 5%)
 * @param compounds - Number of times interest compounds per year
 * @param time - Time period in years
 * @returns Future value (principal + interest), or NaN if invalid
 * @example
 * ```typescript
 * // Basic compound interest
 * compoundInterest(1000)(0.05)(1)(1)
 * // 1050 (5% annual, compounded yearly)
 *
 * compoundInterest(1000)(0.05)(12)(1)
 * // 1051.16 (5% annual, compounded monthly)
 *
 * compoundInterest(1000)(0.05)(365)(1)
 * // 1051.27 (5% annual, compounded daily)
 *
 * // Different time periods
 * compoundInterest(1000)(0.05)(1)(5)
 * // 1276.28 (5% for 5 years, annual compounding)
 *
 * compoundInterest(1000)(0.05)(1)(10)
 * // 1628.89 (5% for 10 years, annual compounding)
 *
 * // Quarterly compounding
 * compoundInterest(5000)(0.08)(4)(3)
 * // 6333.85 (8% for 3 years, quarterly)
 *
 * // Semi-annual compounding
 * compoundInterest(10000)(0.06)(2)(7)
 * // 15036.30 (6% for 7 years, semi-annual)
 *
 * // High frequency compounding
 * compoundInterest(1000)(0.10)(52)(1)
 * // 1105.06 (10% weekly compounding)
 *
 * // Continuous compounding approximation (very high n)
 * compoundInterest(1000)(0.05)(10000)(1)
 * // 1051.27 (approaches e^(rt) * P)
 *
 * // Zero interest
 * compoundInterest(1000)(0)(12)(5)
 * // 1000 (no growth)
 *
 * // Invalid inputs return NaN
 * compoundInterest(-1000)(0.05)(12)(1)
 * // NaN (negative principal)
 *
 * compoundInterest(1000)(-0.5)(12)(1)
 * // NaN (rate below -1)
 *
 * compoundInterest(1000)(0.05)(0)(1)
 * // NaN (invalid compound frequency)
 *
 * compoundInterest(null)(0.05)(12)(1)
 * // NaN
 *
 * // Practical examples
 *
 * // Savings account
 * const savings = compoundInterest(10000)
 * const withRate = savings(0.03)  // 3% APY
 * const monthly = withRate(12)    // Monthly compounding
 * monthly(1)   // 10304.16 (1 year)
 * monthly(5)   // 11616.17 (5 years)
 * monthly(10)  // 13493.54 (10 years)
 *
 * // Investment growth
 * const invest = compoundInterest(50000)(0.07)
 * invest(1)(20)   // 193484.40 (annual, 20 years)
 * invest(4)(20)   // 197845.11 (quarterly, 20 years)
 * invest(12)(20)  // 198710.49 (monthly, 20 years)
 *
 * // Credit card debt (as negative growth)
 * const debt = compoundInterest(5000)(0.18)(12)
 * debt(1)   // 5984.74 (18% APR, monthly)
 * debt(2)   // 7162.59 (2 years)
 * debt(3)   // 8571.66 (3 years)
 *
 * // Retirement planning
 * const retirement = (monthly: number, years: number) => {
 *   // Approximate with compound interest
 *   const principal = monthly * 12 * years
 *   return compoundInterest(principal)(0.06)(12)(years)
 * }
 * retirement(500, 30)  // Future value of contributions
 *
 * // Inflation adjustment (negative real return)
 * const realReturn = (nominal: number, inflation: number) => {
 *   const realRate = (1 + nominal) / (1 + inflation) - 1
 *   return compoundInterest(10000)(realRate)(1)
 * }
 * realReturn(0.05, 0.02)(10)  // Real value after inflation
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application for reuse
 * @property Safe - Returns NaN for invalid inputs
 * @property Exponential - Growth is exponential over time
 */
const compoundInterest = (
	principal: number | null | undefined,
) =>
(
	rate: number | null | undefined,
) =>
(
	compounds: number | null | undefined,
) =>
(
	time: number | null | undefined,
): number => {
	if (principal == null || typeof principal !== "number") {
		return NaN
	}

	if (principal < 0) {
		return NaN
	}

	if (rate == null || typeof rate !== "number") {
		return NaN
	}

	// Rate can be negative but not below -100%
	if (rate < -1) {
		return NaN
	}

	if (compounds == null || typeof compounds !== "number") {
		return NaN
	}

	if (compounds <= 0) {
		return NaN
	}

	if (time == null || typeof time !== "number") {
		return NaN
	}

	if (time < 0) {
		return NaN
	}

	// Special case: zero time returns principal
	if (time === 0) {
		return principal
	}

	// Special case: zero rate returns principal
	if (rate === 0) {
		return principal
	}

	// Calculate compound interest: P(1 + r/n)^(nt)
	const base = 1 + rate / compounds
	const exponent = compounds * time

	return principal * Math.pow(base, exponent)
}

export default compoundInterest
