import isFinite from "../../validation/isFinite/index.ts"

export function subtract(
	subtrahend: number,
): (minuend: number) => number | undefined

//++ Subtracts numbers: subtrahend→(minuend→minuend−subtrahend); undefined on non-finite
export default function subtract(
	subtrahend: number,
) {
	return function subtractFromMinuend(
		minuend: number,
	): number | undefined {
		if (isFinite(subtrahend) && isFinite(minuend)) {
			return minuend - subtrahend
		}

		return undefined
	}
}
