import isFinite from "../../validation/isFinite/index.ts"

export function divide(
	divisor: number,
): (dividend: number) => number | undefined

//++ Divides numbers: number→(number→quotient); undefined on non-finite or zero divisor
export default function divide(
	divisor: number,
) {
	return function divideDividend(
		dividend: number,
	): number | undefined {
		if (isFinite(divisor) && isFinite(dividend) && divisor !== 0) {
			return dividend / divisor
		}

		return undefined
	}
}
