import isNullish from "../../predicates/isNullish/index.ts"

//++ Generates a random floating-point number between min and max
export default function randomFloat(
	min: number | null | undefined,
) {
	return function (
		max: number | null | undefined,
	): number {
		//++ [EXCEPTION] typeof, isFinite operators permitted in Toolsmith for performance - provides type checking wrapper
		if (isNullish(min) || typeof min !== "number" || !isFinite(min)) {
			return NaN
		}

		//++ [EXCEPTION] typeof, isFinite operators permitted in Toolsmith for performance - provides type checking wrapper
		if (isNullish(max) || typeof max !== "number" || !isFinite(max)) {
			return NaN
		}

		//++ [EXCEPTION] Math.min, Math.max permitted in Toolsmith for performance - provides range clamping wrapper
		const actualMin = Math.min(min, max)
		const actualMax = Math.max(min, max)

		//++ [EXCEPTION] Math.random(), *, -, + operators permitted in Toolsmith for performance - provides random float wrapper
		return Math.random() * (actualMax - actualMin) + actualMin
	}
}
