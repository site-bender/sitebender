import type { Pair, Singleton, Triple } from "../../../types/tuple/index.ts"

/**
 * Maps a function over all elements of a tuple, preserving its structure
 *
 * Applies a transformation function to each element of a tuple (Singleton,
 * Pair, or Triple) and returns a new tuple of the same size with transformed
 * elements. Unlike regular array map, this preserves the tuple type and size.
 *
 * The function is curried to allow partial application and composition.
 *
 * @param fn - The function to apply to each element
 * @param tuple - The tuple to map over
 * @returns A new tuple with transformed elements
 * @example
 * ```typescript
 * // With different tuple sizes
 * mapTuple((x: number) => x * 2)([5]) // [10]
 * mapTuple((x: number) => x * 2)([3, 4]) // [6, 8]
 * mapTuple((x: number) => x * 2)([1, 2, 3]) // [2, 4, 6]
 *
 * // Type transformation
 * mapTuple((x: number) => x.toString())([1, 2, 3]) // ["1", "2", "3"]
 * mapTuple((s: string) => s.length)(["hello", "world"]) // [5, 5]
 *
 * // Partial application
 * const double = mapTuple((x: number) => x * 2)
 * double([3, 4]) // [6, 8]
 * double([5, 6, 7]) // [10, 12, 14]
 *
 * // RGB color manipulation
 * type RGB = Triple<number, number, number>
 * const brighten = mapTuple((c: number) => Math.min(255, c * 1.5))
 * brighten([128, 64, 32] as RGB) // [192, 96, 48]
 *
 * // Invalid input handling
 * mapTuple((x: number) => x * 2)(null) // []
 * mapTuple((x: number) => x * 2)([]) // []
 * ```
 * @pure
 * @curried
 */
function mapTuple<T, U>(
	fn: (value: T) => U,
): {
	(tuple: Singleton<T>): Singleton<U>
	(tuple: Pair<T, T>): Pair<U, U>
	(tuple: Triple<T, T, T>): Triple<U, U, U>
	(tuple: ReadonlyArray<T>): Array<U>
	(tuple: null | undefined): []
}

function mapTuple<T, U>(
	fn: (value: T) => U,
) {
	return (tuple: ReadonlyArray<T> | null | undefined): Array<U> => {
		if (tuple == null || !Array.isArray(tuple)) {
			return []
		}

		return tuple.map(fn)
	}
}

export default mapTuple
