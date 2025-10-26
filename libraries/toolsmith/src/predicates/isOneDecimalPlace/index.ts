import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

import { ONE_DECIMAL_PLACE_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"
import isFinite from "../isFinite/index.ts"

//++ Type predicate that checks if a number has at most 1 decimal place
export default function isOneDecimalPlace(
	value: unknown,
): value is OneDecimalPlace {
	if (isFinite(value)) {
		/*++
		 + [EXCEPTION] String(), .split(), .at(), .length, and <= are permitted here because:
		 + - String() converts number to string for decimal place counting
		 + - .split() would return Result monad in functional version, unusable in simple predicate
		 + - .at() is preferred over [index] for optional access
		 + - .length would return Result monad in functional version, unusable in simple predicate
		 + - <= (lte) would return Result/Validation monad in functional version
		 + This is a type predicate that must remain simple and performant
		 */
		const decimalPart = String(value).split(".").at(1)
		const decimalPlaces = decimalPart ? decimalPart.length : 0

		return decimalPlaces <= ONE_DECIMAL_PLACE_SCALE
	}

	return false
}
