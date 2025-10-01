import isNotNullish from "../../validation/isNotNullish/index.ts"
import isArray from "../../validation/isArray/index.ts"
import reduce from "../reduce/index.ts"

//++ Counts elements by grouping criteria
export default function countBy<T, K extends string | number | symbol>(
	fn: (element: T) => K,
) {
	return function countByWithFn(
		array: ReadonlyArray<T> | null | undefined,
	): Record<K, number> {
		if (isArray(array)) {
			return reduce(function count(
				acc: Record<K, number>,
				element: T,
			): Record<K, number> {
				const key = fn(element)
				if (isNotNullish(key)) {
					return {
						...acc,
						[key]: (acc[key] || 0) + 1,
					}
				}
				return acc
			})(Object.create(null) as Record<K, number>)(array)
		}

		return Object.create(null) as Record<K, number>
	}
}
