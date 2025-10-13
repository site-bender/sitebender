import isNullish from "../../validation/isNullish/index.ts"

//++ Generates a random integer between min and max (inclusive)
export default function randomInteger(
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

		const minInt = Math.floor(min)
		const maxInt = Math.floor(max)

		const actualMin = Math.min(minInt, maxInt)
		const actualMax = Math.max(minInt, maxInt)

		return Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin
	}
}
