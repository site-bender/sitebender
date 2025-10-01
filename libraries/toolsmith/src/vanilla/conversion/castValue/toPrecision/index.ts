import floor from "../../../math/floor/index.ts"
import max from "../../../math/max/index.ts"
import power from "../../../math/power/index.ts"
import round from "../../../math/round/index.ts"
import isInfinite from "../../../validation/isInfinite/index.ts"
import toFloat from "../toFloat/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function toPrecision(
	places: number,
): (value: unknown) => number {
	return function toPrecisionWithPlaces(value: unknown): number {
		// Parse the value as a float first
		const num = toFloat(value)

		// If parsing failed, return NaN
		if (isNaN(num)) {
			return NaN
		}

		// Handle infinity
		if (isInfinite(num)) {
			return num
		}

		// Ensure places is a non-negative integer
		const decimalPlaces = max(0)(floor(places))

		// Round to the specified number of decimal places
		// Multiply, round, then divide to avoid floating point errors
		const multiplier = power(decimalPlaces)(10)
		return round(num * multiplier) / multiplier
	}
}
