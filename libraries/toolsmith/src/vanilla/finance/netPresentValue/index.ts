import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
	if (
		!cashFlows.every((flow) => isNotNullish(flow) && typeof flow === "number")
	) {
		return NaN
	}

	// Calculate NPV using reduce
	return cashFlows.reduce(
		(npv, cashFlow, t) => npv + cashFlow / Math.pow(1 + rate, t),
		0,
	)
}

export default netPresentValue
