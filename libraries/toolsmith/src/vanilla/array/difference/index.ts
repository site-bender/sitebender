import not from "../../logic/not/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEmpty from "../isEmpty/index.ts"
import filter from "../filter/index.ts"
import toSet from "../toSet/index.ts"

//++ Set difference between arrays
export default function difference<T>(
	subtrahend: ReadonlyArray<T> | null | undefined,
) {
	return function differenceWithSubtrahend(
		minuend: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isArray(minuend)) {
			if (isArray(subtrahend) && not(isEmpty(subtrahend))) {
				const set2 = toSet(subtrahend)

				// Use filter for O(n) time with O(1) lookups
				// This preserves duplicates in the minuend
				return filter(function notInSet(element: T) {
					return not(set2.has(element))
				})(minuend as Array<T>)
			}

			return [...minuend]
		}

		return []
	}
}
