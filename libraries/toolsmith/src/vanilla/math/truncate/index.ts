import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function truncate(
	n: number | null | undefined,
): number {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return Math.trunc(n)
}
