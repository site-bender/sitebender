/**
 * Pure, curried sort function
 * @param compareFn - The comparison function
 * @param array - The array to sort (last parameter for proper currying)
 * @returns A new sorted array
 */
export default function sort<T>(compareFn?: (a: T, b: T) => number) {
	return function (array: readonly T[]): T[] {
		return [...array].sort(compareFn)
	}
}
