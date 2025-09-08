import isNullish from "../../simple/validation/isNullish/index.ts"

//++ Generates a random integer between min and max (inclusive)
export default function randomInteger(
	min: number | null | undefined,
) {
	return function (
		max: number | null | undefined,
	): number {
		if (isNullish(min) || typeof min !== "number" || !isFinite(min)) {
			return NaN
		}

		if (isNullish(max) || typeof max !== "number" || !isFinite(max)) {
			return NaN
		}

		const minInt = Math.floor(min)
		const maxInt = Math.floor(max)

		const actualMin = Math.min(minInt, maxInt)
		const actualMax = Math.max(minInt, maxInt)

		return Math.floor(Math.random() * (actualMax - actualMin + 1)) + actualMin
	}
}

//?? [EXAMPLE] randomInteger(1)(6) // Random die roll: 1-6
//?? [EXAMPLE] randomInteger(0)(arr.length - 1) // Random array index
//?? [EXAMPLE] randomInteger(-10)(10) // Random from -10 to 10
//?? [EXAMPLE] randomInteger(100)(1) // Works with swapped bounds
/*??
 * [EXAMPLE]
 * const d6 = randomInteger(1)
 * d6(6) // 1-6
 * const d20 = randomInteger(1)
 * d20(20) // 1-20
 *
 * [GOTCHA] Returns NaN for invalid inputs like randomInteger(null)(10)
 */
