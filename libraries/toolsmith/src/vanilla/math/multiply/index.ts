import all from "../../array/all/index.ts"
import reduce from "../../array/reduce/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isFinite from "../../validation/isFinite/index.ts"
import { MULTIPLICATIVE_IDENTITY } from "../constants/index.ts"
import multiplyFactors from "./multiplyFactors/index.ts"

export function multiply(
	multiplier: number,
): (multiplicand: number) => number | null
export function multiply(multiplierOrFactors: Array<number>): number | null

//++ Multiplies numbers: number→(number→product) or Array<number>→product; null on non-finite
export default function multiply(
	multiplierOrFactors: number | Array<number>,
) {
	if (isArray(multiplierOrFactors)) {
		const factors = multiplierOrFactors

		if (all(isFinite)(factors)) {
			return reduce(multiplyFactors)(MULTIPLICATIVE_IDENTITY)(
				factors as Array<number>,
			)
		}

		return null
	}

	if (isFinite(multiplierOrFactors)) {
		const multiplier = multiplierOrFactors

		return function multiplyByMultiplier(
			multiplicand: number,
		): number | null {
			if (isFinite(multiplicand)) {
				return multiplicand * multiplier
			}

			return null
		}
	}

	return null
}
