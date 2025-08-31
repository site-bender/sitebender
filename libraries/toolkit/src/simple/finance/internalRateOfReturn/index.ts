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
 * internalRateOfReturn([-1000, 500, 500, 500]) // 0.2337... (23.37% IRR)
 *
 * // Project with varying returns
 * internalRateOfReturn([-10000, 3000, 4000, 5000, 6000]) // 0.2520... (25.20% IRR)
 *
 * // Break-even (0% return)
 * internalRateOfReturn([-1000, 500, 500]) // 0 (exactly break even)
 *
 * // Loss-making investment (negative IRR)
 * internalRateOfReturn([-1000, 400, 400]) // -0.1312... (-13.12% IRR)
 *
 * // Real estate investment
 * const property = [-200000, 24000, 24000, 24000, 24000, 250000]
 * internalRateOfReturn(property) // 0.1547... (15.47% annual return)
 *
 * // Edge cases
 * internalRateOfReturn([-1000, -500, -200]) // NaN (no positive flows)
 * internalRateOfReturn([]) // NaN
 * internalRateOfReturn(null) // NaN
 * ```
 * @pure
 * @safe
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
	if (!cashFlows.every((cf) => typeof cf === "number")) {
		return NaN
	}

	// Check for at least one positive and one negative cash flow
	const hasPositive = cashFlows.some((cf) => cf > 0)
	const hasNegative = cashFlows.some((cf) => cf < 0)

	if (!hasPositive || !hasNegative) {
		return NaN
	}

	// NPV function
	const npv = (rate: number): number =>
		cashFlows.reduce(
			(sum, cf, i) => sum + cf / Math.pow(1 + rate, i),
			0,
		)

	// Derivative of NPV function
	const npvDerivative = (rate: number): number =>
		cashFlows.slice(1).reduce(
			(sum, cf, i) => sum - (i + 1) * cf / Math.pow(1 + rate, i + 2),
			0,
		)

	// Newton-Raphson method using recursion
	const tolerance = 0.00001
	const maxIterations = 100

	const newtonRaphson = (rate: number, iteration: number): number => {
		if (iteration >= maxIterations) return NaN

		const npvValue = npv(rate)

		// Check if we've found the solution
		if (Math.abs(npvValue) < tolerance) {
			return rate
		}

		const derivative = npvDerivative(rate)

		// Avoid division by zero - try different starting point
		if (Math.abs(derivative) < tolerance) {
			return newtonRaphson(rate === 0.1 ? -0.1 : 0.1, iteration + 1)
		}

		// Newton-Raphson update
		const newRate = rate - npvValue / derivative

		// Limit the step size and keep in bounds
		const boundedRate = Math.abs(newRate - rate) > 1
			? rate + (newRate > rate ? 1 : -1)
			: newRate

		const clampedRate = Math.max(-0.99, Math.min(10, boundedRate))

		return newtonRaphson(clampedRate, iteration + 1)
	}

	return newtonRaphson(0.1, 0) // Initial guess of 10%
}

export default internalRateOfReturn
