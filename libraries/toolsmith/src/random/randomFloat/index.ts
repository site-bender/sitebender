import isNullish from "../../validation/isNullish/index.ts"

//++ Generates a random floating-point number between min and max
export default function randomFloat(
	min: number | null | undefined,
) {
	return function (
		max: number | null | undefined,
	): number {
		if (isNullish(min) || typeof min !== "number" || !isFinite(min)) {
			return NaN
		}

		if (isNullish(max) || typeof max !== "number" || !isFinite(max)) {
			return NaN
		}

		const actualMin = Math.min(min, max)
		const actualMax = Math.max(min, max)

		return Math.random() * (actualMax - actualMin) + actualMin
	}
}
