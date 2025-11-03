import type { Pair } from "../../../types/tuple/index.ts"

import pair from "../../tuple/pair/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const cartesianToPolar = (
	x: number | null | undefined,
) =>
(
	y: number | null | undefined,
): Pair<number, number> => {
	if (isNullish(x) || typeof x !== "number") {
		return pair(NaN)(NaN)
	}

	if (isNullish(y) || typeof y !== "number") {
		return pair(NaN)(NaN)
	}

	// Check for non-finite values
	if (!isFinite(x) || !isFinite(y)) {
		return pair(NaN)(NaN)
	}

	// Calculate polar coordinates
	const r = Math.sqrt(x * x + y * y)
	const theta = Math.atan2(y, x) // atan2 handles quadrant correctly

	return pair(r)(theta)
}

export default cartesianToPolar
