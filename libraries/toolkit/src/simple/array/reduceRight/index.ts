import isNullish from "../../validation/isNullish/index.ts"

/**
 * Reduces an array from right to left to a single value
 *
 * Like reduce but processes the array from right to left. Applies a function
 * against an accumulator and each element in the array (from right to left)
 * to reduce it to a single value. This is useful for right-associative
 * operations, building values from the end, or when the order of processing
 * matters.
 *
 * @param fn - Reducer function (accumulator, element, index, array) => newAccumulator
 * @param initial - Initial accumulator value
 * @param array - Array to reduce
 * @returns Final accumulated value
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // String concatenation (order matters)
 * const concat = (acc: string, x: string) => acc + x
 * reduceRight(concat)("")(["a", "b", "c", "d"]) // "dcba"
 *
 * // Build nested structure from right
 * type Node = { value: string; next: Node | null }
 * const buildList = (next: Node | null, value: string): Node => ({ value, next })
 * reduceRight(buildList)(null as Node | null)(["a", "b", "c"])
 * // { value: "a", next: { value: "b", next: { value: "c", next: null } } }
 *
 * // Right-associative operations
 * const power = (acc: number, x: number) => Math.pow(x, acc)
 * reduceRight(power)(1)([2, 3, 2]) // 512 (2^(3^2))
 *
 * // Edge cases
 * reduceRight((acc: number, x: number) => acc + x)(10)([]) // 10
 * reduceRight((acc: number, x: number) => acc + x)(0)(null) // 0
 * ```
 */
const reduceRight = <T, U>(
	fn: (accumulator: U, element: T, index: number, array: ReadonlyArray<T>) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): U => {
	if (isNullish(array)) {
		return initial
	}

	return array.reduceRight(fn, initial)
}

export default reduceRight
