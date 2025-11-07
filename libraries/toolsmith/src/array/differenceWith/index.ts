import not from "../../logic/not/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isEmpty from "../isEmpty/index.ts"

//++ Set difference with custom equality
//++ NOTE: This is a plain function (single return path). Will be migrated to three-path pattern in Batch 22.
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
					//++ [EXCEPTION] Using native .filter() and .some() is explicitly allowed for performance in Toolsmith implementations
					return minuend.filter(function notInSubtrahend(element: T) {
						return not(
							subtrahend.some(function matches(excludeElement: U) {
								return comparator(element, excludeElement)
							}),
						)
					})
				}

				return [...minuend]
			}

			return []
		}
	}
}
