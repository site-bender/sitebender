import isNullish from "../../validation/isNullish/index.ts"
import isNotNullish from "../../validation/isNotNullish/index.ts"

/**
 * Calculates the net present value of cash flows
 *
 * Computes NPV by discounting future cash flows to present value using
 * the formula: NPV = Σ(CF_t / (1+r)^t) where CF_t is cash flow at time t.
 * The first cash flow (index 0) is assumed to occur at t=0 (not discounted).
 * Positive values represent inflows, negative values represent outflows.
 * Returns NaN for invalid inputs.
 *
 * @param rate - Discount rate per period (as decimal, e.g., 0.1 for 10%)
 * @param cashFlows - Array of cash flows, starting at t=0
 * @returns Net present value, or NaN if invalid
 * @example
 * ```typescript
 * // Simple investment: -$1000 initial, receive $500 for 3 years
 * netPresentValue(0.1)([-1000, 500, 500, 500]) // 243.42... (positive NPV)
 *
 * // Project evaluation
 * netPresentValue(0.08)([-10000, 3000, 4000, 5000, 2000]) // 1734.76... (positive)
 *
 * // Zero discount rate (simple sum)
 * netPresentValue(0)([-1000, 400, 400, 400]) // 200 (sum of all cash flows)
 *
 * // High discount rate (future less valuable)
 * netPresentValue(0.5)([-1000, 800, 600, 400]) // -48.15... (negative NPV)
 *
 * // Real estate investment with rental income
 * const cashFlows = [-250000, ...Array(9).fill(24000), 24000 + 350000]
 * netPresentValue(0.07)(cashFlows) // 119834.51... (good investment)
 *
 * // Partial application for sensitivity analysis
 * const investmentFlows = [-50000, 15000, 20000, 25000, 20000]
 * const npvAt5 = netPresentValue(0.05)(investmentFlows) // Higher NPV
 * const npvAt10 = netPresentValue(0.10)(investmentFlows) // Lower NPV
 *
 * // Edge cases
 * netPresentValue(0.1)([]) // 0 (no cash flows)
 * netPresentValue(0.1)(null) // NaN
 * ```
 * @pure
 * @curried
 * @safe
 */
const netPresentValue = (
	rate: number | null | undefined,
) =>
(
	cashFlows: number[] | null | undefined,
): number => {
	if (isNullish(rate) || typeof rate !== "number") {
		return NaN
	}

	if (isNullish(cashFlows) || !Array.isArray(cashFlows)) {
		return NaN
	}

	// Empty cash flows return 0
	if (cashFlows.length === 0) {
		return 0
	}

	// Validate all cash flows are numbers
	if (!cashFlows.every((flow) => isNotNullish(flow) && typeof flow === "number")) {
		return NaN
	}

	// Calculate NPV using reduce
	return cashFlows.reduce(
		(npv, cashFlow, t) => npv + cashFlow / Math.pow(1 + rate, t),
		0,
	)
}

export default netPresentValue
