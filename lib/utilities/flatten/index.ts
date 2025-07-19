/**
 * Pure, curried flatten function
 * @param depth - The depth to flatten (Infinity for complete flattening)
 * @param array - The array to flatten (last parameter for proper currying)
 * @returns A new flattened array
 */
export default function flatten<T>(depth: number = Infinity) {
	return function (array: readonly T[]): T[] {
		if (depth === 0) return [...array]

		return array.reduce<T[]>((acc, item) => {
			if (Array.isArray(item) && depth > 0) {
				return acc.concat(flatten(depth - 1)(item))
			}
			return acc.concat(item)
		}, [])
	}
}
