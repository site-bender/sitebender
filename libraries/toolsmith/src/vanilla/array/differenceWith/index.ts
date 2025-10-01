import not from "../../logic/not/index.ts"
import isArray from "../../validation/isArray/index.ts"
import isEmpty from "../isEmpty/index.ts"
import filter from "../filter/index.ts"
import some from "../some/index.ts"

//++ Set difference with custom equality
export default function differenceWith<T, U>(
	comparator: (a: T, b: U) => boolean,
) {
	return function differenceWithComparator(
		subtrahend: ReadonlyArray<U> | null | undefined,
	) {
		return function differenceWithSubtrahend(
			minuend: ReadonlyArray<T> | null | undefined,
		): Array<T> {
			if (isArray(minuend)) {
				if (isArray(subtrahend) && not(isEmpty(subtrahend))) {
					return filter(function notInSubtrahend(element: T) {
						return not(
							some(function matches(excludeElement: U) {
								return comparator(element, excludeElement)
							})(subtrahend as Array<U>),
						)
					})(minuend as Array<T>)
				}

				return [...minuend]
			}

			return []
		}
	}
}
