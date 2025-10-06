import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

import { EXACT_ONE_DECIMAL_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number has at most 1 decimal place
export default function _isExactOneDecimal(n: number): n is ExactOneDecimal {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= EXACT_ONE_DECIMAL_SCALE
}
