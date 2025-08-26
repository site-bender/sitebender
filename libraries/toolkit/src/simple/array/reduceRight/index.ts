/**
 * Reduces an array from right to left to a single value
 *
 * Like reduce but processes the array from right to left. Applies a function
 * against an accumulator and each element in the array (from right to left)
 * to reduce it to a single value. This is useful for right-associative
 * operations, building values from the end, or when the order of processing
 * matters.
 *
 * @curried (fn) => (initial) => (array) => result
 * @param fn - Reducer function (accumulator, element, index, array) => newAccumulator
 * @param initial - Initial accumulator value
 * @param array - Array to reduce
 * @returns Final accumulated value
 * @example
 * ```typescript
 * // String concatenation (order matters)
 * const concat = (acc: string, x: string) => acc + x
 * reduceRight(concat)("")(["a", "b", "c", "d"])
 * // "dcba" (right-to-left)
 * // Compare with reduce: "abcd" (left-to-right)
 *
 * // Build nested structure from right
 * type Node = { value: string; next: Node | null }
 * const buildList = (next: Node | null, value: string): Node => ({ value, next })
 * reduceRight(buildList)(null as Node | null)(["a", "b", "c"])
 * // { value: "a", next: { value: "b", next: { value: "c", next: null } } }
 *
 * // Right-associative operations
 * const power = (acc: number, x: number) => Math.pow(x, acc)
 * reduceRight(power)(1)([2, 3, 2])
 * // 2^(3^(2^1)) = 2^9 = 512
 * // Compare with reduce: ((2^3)^2)^1 = 64
 *
 * // Compose functions right-to-left
 * const double = (x: number) => x * 2
 * const addOne = (x: number) => x + 1
 * const square = (x: number) => x * x
 * const functions = [double, addOne, square]
 * const compose = reduceRight(
 *   (acc: (x: number) => number, fn: (x: number) => number) =>
 *     (x: number) => fn(acc(x))
 * )((x: number) => x)
 * const composed = compose(functions)
 * composed(3)
 * // double(addOne(square(3))) = double(addOne(9)) = double(10) = 20
 *
 * // Build HTML from inside out
 * const wrapTag = (inner: string, tag: string) => `<${tag}>${inner}</${tag}>`
 * reduceRight(wrapTag)("content")(["div", "section", "main"])
 * // "<div><section><main>content</main></section></div>"
 *
 * // Reverse without reverse
 * const reverseArray = <T>(xs: Array<T>): Array<T> =>
 *   reduceRight((acc: Array<T>, x: T) => [...acc, x])([] as Array<T>)(xs)
 * reverseArray([1, 2, 3, 4])
 * // [4, 3, 2, 1]
 *
 * // Empty array returns initial
 * reduceRight((acc, x) => acc + x)(10)([])
 * // 10
 *
 * // Handle null/undefined gracefully
 * reduceRight((acc, x) => acc + x)(0)(null)       // 0
 * reduceRight((acc, x) => acc + x)(0)(undefined)  // 0
 * ```
 * @curried Returns function for reusable right-to-left reduction
 * @pure Function has no side effects (assuming pure reducer)
 * @immutable Does not modify input array
 * @safe Handles null/undefined inputs gracefully
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
	if (array == null || !Array.isArray(array)) {
		return initial
	}

	return array.reduceRight(fn, initial)
}

export default reduceRight
