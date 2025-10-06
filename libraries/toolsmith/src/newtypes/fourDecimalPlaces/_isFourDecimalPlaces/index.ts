import type { FourDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import { FOUR_DECIMAL_PLACES_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number has at most 4 decimal places
export default function _isFourDecimalPlaces(n: number): n is FourDecimalPlaces {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= FOUR_DECIMAL_PLACES_SCALE
}
