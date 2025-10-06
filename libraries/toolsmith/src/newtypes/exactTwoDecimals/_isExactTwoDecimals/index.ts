import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import { EXACT_TWO_DECIMALS_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number has at most 2 decimal places
export default function _isExactTwoDecimals(n: number): n is ExactTwoDecimals {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= EXACT_TWO_DECIMALS_SCALE
}
