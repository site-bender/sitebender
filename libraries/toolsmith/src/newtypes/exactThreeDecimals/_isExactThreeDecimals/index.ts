import { EXACT_THREE_DECIMALS_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number is a valid Decimal3 value (finite number with at most 3 decimal places)
export default function _isDecimal3(n: number): boolean {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= EXACT_THREE_DECIMALS_SCALE
}
