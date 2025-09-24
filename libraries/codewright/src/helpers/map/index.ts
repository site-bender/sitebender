/**
 * Pure, curried map function
 * @param fn - The mapping function
 * @param array - The array to map over (last parameter for proper currying)
 * @returns A new mapped array
 */
export default function map<T, U>(fn: (item: T, index: number) => U) {
	return function (array: readonly T[]): U[] {
		return array.map(fn)
	}
}
