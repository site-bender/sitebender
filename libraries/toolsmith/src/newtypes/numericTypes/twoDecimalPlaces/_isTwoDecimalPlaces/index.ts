import type { TwoDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import { TWO_DECIMAL_PLACES_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number has at most 2 decimal places
export default function _isTwoDecimalPlaces(n: number): n is TwoDecimalPlaces {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= TWO_DECIMAL_PLACES_SCALE
}
