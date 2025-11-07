import { FOUR_DECIMAL_PLACES_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Type predicate that checks if a number is a valid FourDecimalPlaces value (finite number with at most 4 decimal places)
export default function isFourDecimalPlaces(n: number): boolean {
	//++ [EXCEPTION] Number.isFinite, String(), .split(), [], .length, and <= permitted in Toolsmith for performance - provides decimal precision validation
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= FOUR_DECIMAL_PLACES_SCALE
}
