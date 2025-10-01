import isNaN from "../../validation/isNaN/index.ts"
import isNegativeInfinity from "../../validation/isNegativeInfinity/index.ts"
import isPositiveInfinity from "../../validation/isPositiveInfinity/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toPercent(
	options: {
		decimals?: number
		includeSign?: boolean
	} = {},
): (value: number) => string {
	return function toPercentInner(value: number): string {
		const { decimals = 2, includeSign = true } = options

		// Handle special cases
		if (isNaN(value)) {
			return includeSign ? "NaN%" : "NaN"
		}

		if (isPositiveInfinity(value)) {
			return includeSign ? "Infinity%" : "Infinity"
		}

		if (isNegativeInfinity(value)) {
			return includeSign ? "-Infinity%" : "-Infinity"
		}

		// Convert to percentage (multiply by 100)
		const percentage = value * 100

		// Format with specified decimal places
		const formatted = percentage.toFixed(Math.max(0, decimals))

		// Add percent sign if requested
		return includeSign ? `${formatted}%` : formatted
	}
}
