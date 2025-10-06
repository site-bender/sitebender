import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import { ONE_DECIMAL_PLACE_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number has at most 1 decimal place
export default function _isOneDecimalPlace(n: number): n is OneDecimalPlace {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= ONE_DECIMAL_PLACE_SCALE
}
