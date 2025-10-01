import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Indexes elements by a key function
export default function indexBy<T, K extends string | number | symbol>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) {
	return function indexArrayByKey(
		array: ReadonlyArray<T> | null | undefined,
	): Record<K, T> {
		if (isNullish(array)) {
			return {} as Record<K, T>
		}

		return array.reduce(function buildIndex(result, element, index) {
			const key = keyFn(element, index, array)
			if (isNotNullish(key)) {
				result[key] = element
			}
			return result
		}, {} as Record<K, T>)
	}
}
