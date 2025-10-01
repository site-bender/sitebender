import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const internalRateOfReturn = (
	cashFlows: Array<number> | null | undefined,
): number => {
	if (isNullish(cashFlows) || !Array.isArray(cashFlows)) {
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
