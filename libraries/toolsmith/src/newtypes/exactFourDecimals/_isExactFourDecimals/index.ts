import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

import { EXACT_FOUR_DECIMALS_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number has at most 4 decimal places
export default function _isExactFourDecimals(n: number): n is ExactFourDecimals {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= EXACT_FOUR_DECIMALS_SCALE
}
