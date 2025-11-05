import isNotNullish from "../../../predicates/isNotNullish/index.ts"

//++ [PRIVATE] Extracts property values from objects in array
export default function _pluckArray<T, K extends keyof T>(
	key: K,
) {
	return function _pluckArrayWithKey(
		array: ReadonlyArray<T>,
	): Array<T[K] | null> {
		//++ [EXCEPTION] Using native .map() for performance
		return array.map(
			function extractProperty(
				item: T,
			): T[K] | null {
				if (isNotNullish(item) && typeof item === "object") {
					return (item as Record<string | number | symbol, unknown>)[
						key as unknown as string
					] as T[K] | null
				}
				return null
			},
		)
	}
}
