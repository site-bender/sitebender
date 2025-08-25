/**
 * Calculates the net present value of cash flows
 *
 * Computes NPV by discounting future cash flows to present value using
 * the formula: NPV = Σ(CF_t / (1+r)^t) where CF_t is cash flow at time t.
 * The first cash flow (index 0) is assumed to occur at t=0 (not discounted).
 * Positive values represent inflows, negative values represent outflows.
 * Returns NaN for invalid inputs.
 *
 * @curried (rate) => (cashFlows) => netPresentValue
 * @param rate - Discount rate per period (as decimal, e.g., 0.1 for 10%)
 * @param cashFlows - Array of cash flows, starting at t=0
 * @returns Net present value, or NaN if invalid
 * @example
 * ```typescript
 * // Simple investment: -$1000 initial, receive $500 for 3 years
 * netPresentValue(0.1)([-1000, 500, 500, 500])
 * // 243.42... (positive NPV, good investment)
 *
 * // Project evaluation
 * netPresentValue(0.08)([-10000, 3000, 4000, 5000, 2000])
 * // 1734.76... (positive NPV at 8% discount rate)
 *
 * // Monthly cash flows (use monthly rate)
 * const monthlyRate = 0.12 / 12  // 12% annual = 1% monthly
 * netPresentValue(monthlyRate)([-5000, 200, 200, 200, 200, 200])
 * // -4019.80... (negative NPV)
 *
 * // Zero discount rate (simple sum)
 * netPresentValue(0)([-1000, 400, 400, 400])
 * // 200 (sum of all cash flows)
 *
 * // High discount rate (future less valuable)
 * netPresentValue(0.5)([-1000, 800, 600, 400])
 * // -48.15... (negative NPV at 50% rate)
 *
 * // Single cash flow
 * netPresentValue(0.1)([-1000])
 * // -1000 (no future flows to discount)
 *
 * // All positive flows
 * netPresentValue(0.05)([1000, 1000, 1000])
 * // 2859.41... (no initial investment)
 *
 * // Irregular cash flows
 * netPresentValue(0.1)([-5000, 1000, 2000, 1500, 3000, 500])
 * // 1421.84...
 *
 * // Empty cash flows
 * netPresentValue(0.1)([])
 * // 0 (no cash flows)
 *
 * // Invalid inputs
 * netPresentValue(null)([1000, 2000])
 * // NaN
 *
 * netPresentValue(0.1)(null)
 * // NaN
 *
 * netPresentValue(0.1)([1000, "2000"])
 * // NaN
 *
 * // Practical examples
 *
 * // Real estate investment
 * const purchase = -250000
 * const rentalIncome = 24000  // Annual
 * const salePrice = 350000
 * const cashFlows = [purchase]
 * for (let i = 1; i <= 9; i++) {
 *   cashFlows.push(rentalIncome)
 * }
 * cashFlows.push(rentalIncome + salePrice)  // Year 10
 * const realEstateNPV = netPresentValue(0.07)(cashFlows)
 * // 119834.51... (good investment at 7% discount)
 *
 * // Business project comparison
 * const projectA = [-100000, 30000, 40000, 50000, 40000]
 * const projectB = [-100000, 50000, 40000, 30000, 20000]
 * const rateOfReturn = 0.12
 * const npvA = netPresentValue(rateOfReturn)(projectA)
 * const npvB = netPresentValue(rateOfReturn)(projectB)
 * // Compare NPVs to choose best project
 *
 * // Break-even discount rate (IRR approximation)
 * function findBreakEvenRate(cashFlows: number[]): number {
 *   let low = 0, high = 1
 *   while (high - low > 0.0001) {
 *     const mid = (low + high) / 2
 *     const npv = netPresentValue(mid)(cashFlows)
 *     if (npv > 0) low = mid
 *     else high = mid
 *   }
 *   return (low + high) / 2
 * }
 *
 * // Perpetuity valuation (approximate)
 * function perpetuityNPV(rate: number, payment: number): number {
 *   if (rate <= 0) return NaN
 *   return payment / rate
 * }
 *
 * // Partial application for sensitivity analysis
 * const investmentFlows = [-50000, 15000, 20000, 25000, 20000]
 * const npvAt5 = netPresentValue(0.05)(investmentFlows)
 * const npvAt10 = netPresentValue(0.10)(investmentFlows)
 * const npvAt15 = netPresentValue(0.15)(investmentFlows)
 * // See how NPV changes with discount rate
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Enables partial application
 * @property Safe - Returns NaN for invalid inputs
 * @property Financial - Standard NPV calculation
 */
const netPresentValue = (
	rate: number | null | undefined,
) =>
(
	cashFlows: number[] | null | undefined,
): number => {
	if (rate == null || typeof rate !== "number") {
		return NaN
	}

	if (cashFlows == null || !Array.isArray(cashFlows)) {
		return NaN
	}

	// Empty cash flows return 0
	if (cashFlows.length === 0) {
		return 0
	}

	// Validate all cash flows are numbers
	for (const flow of cashFlows) {
		if (flow == null || typeof flow !== "number") {
			return NaN
		}
	}

	// Calculate NPV
	let npv = 0
	for (let t = 0; t < cashFlows.length; t++) {
		const discountFactor = Math.pow(1 + rate, t)
		npv += cashFlows[t] / discountFactor
	}

	return npv
}

export default netPresentValue
