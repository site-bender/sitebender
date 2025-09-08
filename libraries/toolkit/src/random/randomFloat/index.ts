import isNullish from "../../simple/validation/isNullish/index.ts"

//++ Generates a random floating-point number between min and max
export default function randomFloat(
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

		const actualMin = Math.min(min, max)
		const actualMax = Math.max(min, max)

		return Math.random() * (actualMax - actualMin) + actualMin
	}
}

//?? [EXAMPLE] randomFloat(0)(1) // 0.7263849502...
//?? [EXAMPLE] randomFloat(0)(100) // 42.8391047...
//?? [EXAMPLE] randomFloat(-1)(1) // -0.2847395...
//?? [EXAMPLE] randomFloat(10)(5) // 7.239... (between 5 and 10)
/*??
 * [EXAMPLE]
 * const randomPercent = randomFloat(0)
 * randomPercent(100) // 0-100
 * randomPercent(1) // 0-1
 *
 * [GOTCHA] Returns NaN for invalid inputs like randomFloat(null)(10)
 */
