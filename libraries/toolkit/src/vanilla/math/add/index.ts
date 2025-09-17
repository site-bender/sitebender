import isFinite from "../../validation/isFinite/index.ts"
import isArray from "../../validation/isArray/index.ts"
import all from "../../array/all/index.ts"
import reduce from "../../array/reduce/index.ts"
import sumAddends from "./sumAddends/index.ts"
import { ADDITIVE_IDENTITY } from "../constants/index.ts"

export function add(addend: number): (augend: number) => number | undefined
export function add(addendOrAddends: Array<number>): number | undefined

//++ Adds numbers: number→(number→sum) or Array<number>→sum; undefined on non-finite
export default function add(
	addendOrAddends: number | Array<number>,
) {
	if (isArray(addendOrAddends)) {
		const addends = addendOrAddends



		if (all(isFinite)(addends)) {
			return reduce(sumAddends)(ADDITIVE_IDENTITY)(addends as Array<number>)
		}

		return undefined
	}


	if (isFinite(addendOrAddends)) {
		const addend = addendOrAddends

		return function addToAugend(
			augend: number,
		): number | undefined {
			if (isFinite(augend)) {
				return augend + addend
			}

			return undefined
		}
	}

	return undefined
}

//?? [EXAMPLE] add(2)(3) // 5
//?? [EXAMPLE] add([1, 2, 3]) // 6
//?? [EXAMPLE] add(NaN) // undefined
//?? [EXAMPLE] add(2)(Infinity) // undefined
//?? [EXAMPLE] add([1, Infinity, 2]) // undefined
