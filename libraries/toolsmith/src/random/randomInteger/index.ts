import isNullish from "../../predicates/isNullish/index.ts"

//++ Generates a random integer between min and max (inclusive)
export default function randomInteger(
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

		//++ [EXCEPTION] Math.floor permitted in Toolsmith for performance - provides integer conversion wrapper
		const minInt = Math.floor(min)
		const maxInt = Math.floor(max)

		//++ [EXCEPTION] Math.min, Math.max permitted in Toolsmith for performance - provides range clamping wrapper
		const actualMin = Math.min(minInt, maxInt)
		const actualMax = Math.max(minInt, maxInt)

		//++ [EXCEPTION] Math.floor, Math.random(), *, -, + operators permitted in Toolsmith for performance - provides random integer wrapper
		return Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin
	}
}
