import type { Pair } from "../../../types/tuple/index.ts"

import pair from "../../tuple/pair/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const polarToCartesian = (
	r: number | null | undefined,
) =>
(
	theta: number | null | undefined,
): Pair<number, number> => {
	if (isNullish(r) || typeof r !== "number") {
		return pair(NaN)(NaN)
	}

	if (isNullish(theta) || typeof theta !== "number") {
		return pair(NaN)(NaN)
	}

	// Check for non-finite values
	if (!isFinite(r) || !isFinite(theta)) {
		return pair(NaN)(NaN)
	}

	// Calculate Cartesian coordinates
	const x = r * Math.cos(theta)
	const y = r * Math.sin(theta)

	return pair(x)(y)
}

export default polarToCartesian
