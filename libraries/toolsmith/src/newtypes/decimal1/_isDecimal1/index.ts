import { DECIMAL1_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number is a valid Decimal1 value (finite number with at most 1 decimal place)
export default function _isDecimal1(n: number): boolean {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= DECIMAL1_SCALE
}
