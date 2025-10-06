import { CURRENCY_SCALE } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Private predicate that checks if a number is a valid currency value (finite and at most 2 decimal places)
export default function _isCurrency(n: number): boolean {
	if (!Number.isFinite(n)) {
		return false
	}

	const decimalPart = String(n).split(".")[1]
	const decimalPlaces = decimalPart ? decimalPart.length : 0

	return decimalPlaces <= CURRENCY_SCALE
}
