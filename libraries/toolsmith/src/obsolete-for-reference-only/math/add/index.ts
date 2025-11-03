import all from "../../array/all/index.ts"
import reduce from "../../array/reduce/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isFinite from "../../validation/isFinite/index.ts"
import { ADDITIVE_IDENTITY } from "../constants/index.ts"
import sumAddends from "./sumAddends/index.ts"

export function add(addend: number): (augend: number) => number | null
export function add(addendOrAddends: Array<number>): number | null

//++ Adds numbers: number→(number→sum) or Array<number>→sum; null on non-finite
export default function add(
	addendOrAddends: number | Array<number>,
) {
	if (isArray(addendOrAddends)) {
		const addends = addendOrAddends

		if (all(isFinite)(addends)) {
			return reduce(sumAddends)(ADDITIVE_IDENTITY)(addends as Array<number>)
		}

		return null
	}

	if (isFinite(addendOrAddends)) {
		const addend = addendOrAddends

		return function addToAugend(
			augend: number,
		): number | null {
			if (isFinite(augend)) {
				return augend + addend
			}

			return null
		}
	}

	return null
}
