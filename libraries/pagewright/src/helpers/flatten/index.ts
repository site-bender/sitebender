//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function flatten<T>(depth: number = Infinity) {
	return function (array: readonly T[]): T[] {
		if (depth === 0) return [...array]

		return array.reduce<T[]>((acc, item) => {
			if (Array.isArray(item) && depth > 0) {
				// Cast is safe: when item is an array, recursive flatten returns T[]
				return acc.concat(flatten<T>(depth - 1)(item as unknown as T[]))
			}
			return acc.concat(item as T)
		}, [])
	}
}
