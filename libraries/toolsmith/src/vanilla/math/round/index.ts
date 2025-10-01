import isNullish from "../../validation/isNullish/index.ts"

//++ Rounds to nearest integer; away-from-zero at .5; returns NaN on invalid input
//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const round = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return Math.round(n)
}

export default round

//?? [EXAMPLE] round(3.5) // 4
//?? [EXAMPLE] round(-3.5) // -3
