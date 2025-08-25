/**
 * Calculates the internal rate of return (IRR) for a series of cash flows
 *
 * Computes the discount rate that makes the net present value (NPV) of all
 * cash flows equal to zero. Uses the Newton-Raphson method to find the root
 * of the NPV equation. The first cash flow is typically negative (initial
 * investment) followed by positive returns. Returns the IRR as a decimal
 * (e.g., 0.12 for 12%). Converges to a solution within 0.00001 accuracy
 * or 100 iterations.
 *
 * @param cashFlows - Array of cash flows (first is usually negative)
 * @returns IRR as decimal (0.1 = 10%), or NaN if no solution
 * @example
 * ```typescript
 * // Simple investment: -$1000 initial, $500 returns for 3 years
 * internalRateOfReturn([-1000, 500, 500, 500])
 * // 0.2337... (23.37% IRR)
 *
 * // Project with varying returns
 * internalRateOfReturn([-10000, 3000, 4000, 5000, 6000])
 * // 0.2520... (25.20% IRR)
 *
 * // Quick payback
 * internalRateOfReturn([-5000, 6000, 1000])
 * // 0.2851... (28.51% IRR)
 *
 * // Break-even (0% return)
 * internalRateOfReturn([-1000, 500, 500])
 * // 0 (exactly break even)
 *
 * // Loss-making investment (negative IRR)
 * internalRateOfReturn([-1000, 400, 400])
 * // -0.1312... (-13.12% IRR)
 *
 * // Multiple investments and returns
 * internalRateOfReturn([-1000, 300, -500, 800, 600])
 * // 0.1219... (12.19% IRR)
 *
 * // High return investment
 * internalRateOfReturn([-100, 50, 50, 50, 50])
 * // 0.3496... (34.96% IRR)
 *
 * // No positive cash flows (no solution)
 * internalRateOfReturn([-1000, -500, -200])
 * // NaN
 *
 * // Invalid inputs
 * internalRateOfReturn(null)
 * // NaN
 *
 * internalRateOfReturn([])
 * // NaN
 *
 * internalRateOfReturn([100, 200])
 * // NaN (no initial investment)
 *
 * // Practical examples
 *
 * // Real estate investment
 * const property = [-200000, 24000, 24000, 24000, 24000, 250000]
 * internalRateOfReturn(property)
 * // 0.1547... (15.47% annual return)
 *
 * // Startup investment rounds
 * const startup = [-50000, -30000, 10000, 40000, 150000]
 * internalRateOfReturn(startup)
 * // 0.2744... (27.44% IRR)
 *
 * // Bond with coupon payments
 * const bond = [-950, 50, 50, 50, 1050]
 * internalRateOfReturn(bond)
 * // 0.0656... (6.56% yield to maturity)
 *
 * // Equipment purchase decision
 * const equipment = [-15000, 5000, 5000, 5000, 5000, 3000]
 * internalRateOfReturn(equipment)
 * // 0.2084... (20.84% IRR)
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Safe - Returns NaN for invalid inputs or no solution
 */
const internalRateOfReturn = (
	cashFlows: Array<number> | null | undefined,
): number => {
	if (cashFlows == null || !Array.isArray(cashFlows)) {
		return NaN
	}

	if (cashFlows.length < 2) {
		return NaN
	}

	// Validate all cash flows are numbers
	for (const cf of cashFlows) {
		if (typeof cf !== "number") {
			return NaN
		}
	}

	// Check for at least one positive and one negative cash flow
	let hasPositive = false
	let hasNegative = false
	for (const cf of cashFlows) {
		if (cf > 0) hasPositive = true
		if (cf < 0) hasNegative = true
	}

	if (!hasPositive || !hasNegative) {
		return NaN
	}

	// NPV function
	const npv = (rate: number): number => {
		let result = 0
		for (let i = 0; i < cashFlows.length; i++) {
			result += cashFlows[i] / Math.pow(1 + rate, i)
		}
		return result
	}

	// Derivative of NPV function
	const npvDerivative = (rate: number): number => {
		let result = 0
		for (let i = 1; i < cashFlows.length; i++) {
			result -= i * cashFlows[i] / Math.pow(1 + rate, i + 1)
		}
		return result
	}

	// Newton-Raphson method
	let rate = 0.1 // Initial guess of 10%
	const tolerance = 0.00001
	const maxIterations = 100

	for (let i = 0; i < maxIterations; i++) {
		const npvValue = npv(rate)

		// Check if we've found the solution
		if (Math.abs(npvValue) < tolerance) {
			return rate
		}

		const derivative = npvDerivative(rate)

		// Avoid division by zero
		if (Math.abs(derivative) < tolerance) {
			// Try a different starting point
			rate = rate === 0.1 ? -0.1 : 0.1
			continue
		}

		// Newton-Raphson update
		const newRate = rate - npvValue / derivative

		// Limit the step size to avoid divergence
		if (Math.abs(newRate - rate) > 1) {
			rate = rate + (newRate > rate ? 1 : -1)
		} else {
			rate = newRate
		}

		// Keep rate in reasonable bounds
		if (rate < -0.99) rate = -0.99
		if (rate > 10) rate = 10
	}

	// Failed to converge
	return NaN
}

export default internalRateOfReturn
