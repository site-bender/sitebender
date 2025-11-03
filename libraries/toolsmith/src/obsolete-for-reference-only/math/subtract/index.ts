import isFinite from "../../validation/isFinite/index.ts"

export function subtract(
	subtrahend: number,
): (minuend: number) => number | null

//++ Subtracts numbers: subtrahend→(minuend→minuend−subtrahend); null on non-finite
export default function subtract(
	subtrahend: number,
) {
	return function subtractFromMinuend(
		minuend: number,
	): number | null {
		if (isFinite(subtrahend) && isFinite(minuend)) {
			return minuend - subtrahend
		}

		return null
	}
}
