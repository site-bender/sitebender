import isNullish from "../../validation/isNullish/index.ts"

//++ Adds 1 to a number
function increment(
	n: number | null | undefined,
): number {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	return n + 1
}

//?? [EXAMPLE]
/* Increments a number by one. This is equivalent to n + 1 but provides
| a semantic function for incrementing operations. Useful in functional
| pipelines and iterative operations. Returns NaN for non-numeric inputs
| to support safe error handling.
|
| increment(5) → 6
| increment(0) → 1
| increment(-1) → 0
| increment(5.5) → 6.5
| increment(Infinity) → Infinity
| increment(NaN) → NaN
| increment(null) → NaN
*/

export default increment
