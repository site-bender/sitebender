/**
 * Generates an array by repeatedly applying a function to a seed value
 *
 * The dual of reduce/fold - while reduce consumes an array to produce a value,
 * unfold generates an array from a seed value. The generator function returns
 * either null to stop, or a tuple of [value, nextSeed] to continue.
 *
 * @curried (fn) => (seed) => result
 * @param fn - Generator function (seed: T) => [value: U, nextSeed: T] | null
 * @param seed - Initial seed value
 * @returns Generated array of values
 * @example
 * ```typescript
 * // Generate range of numbers
 * unfold((n: number) => n < 10 ? [n, n + 1] : null)(0)
 * // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 *
 * // Generate powers of 2
 * unfold((n: number) => n <= 256 ? [n, n * 2] : null)(1)
 * // [1, 2, 4, 8, 16, 32, 64, 128, 256]
 *
 * // Generate Fibonacci sequence
 * unfold(([a, b]: [number, number]) =>
 *   a <= 100 ? [a, [b, a + b]] : null
 * )([0, 1])
 * // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
 *
 * // Generate countdown
 * unfold((n: number) => n >= 0 ? [n, n - 1] : null)(5)
 * // [5, 4, 3, 2, 1, 0]
 *
 * // Generate alphabet
 * unfold((code: number) =>
 *   code <= 122 ? [String.fromCharCode(code), code + 1] : null
 * )(97)
 * // ["a", "b", "c", ..., "z"]
 *
 * // Generate array of repeated values
 * unfold((n: number) => n > 0 ? ["hello", n - 1] : null)(3)
 * // ["hello", "hello", "hello"]
 *
 * // Generate coordinates
 * unfold(({ x, y }: { x: number; y: number }) =>
 *   x < 3 ? [{ x, y }, y < 2 ? { x, y: y + 1 } : { x: x + 1, y: 0 }] : null
 * )({ x: 0, y: 0 })
 * // [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 },
 * //  { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
 * //  { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }]
 *
 * // Parse string character by character
 * unfold((s: string) =>
 *   s.length > 0 ? [s[0], s.slice(1)] : null
 * )("hello")
 * // ["h", "e", "l", "l", "o"]
 *
 * // Generate date sequence
 * unfold((date: Date) => {
 *   const nextDate = new Date(date)
 *   nextDate.setDate(date.getDate() + 1)
 *   return date.getDate() <= 5 ? [date.toISOString().split('T')[0], nextDate] : null
 * })(new Date("2024-01-01"))
 * // ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05"]
 *
 * // Build tree path
 * unfold((path: string) => {
 *   const lastSlash = path.lastIndexOf("/")
 *   return lastSlash > 0 ? [path, path.substring(0, lastSlash)] : null
 * })("/usr/local/bin")
 * // ["/usr/local/bin", "/usr/local", "/usr"]
 *
 * // Partial application for reusable generators
 * const range = (max: number) => unfold((n: number) => n < max ? [n, n + 1] : null)
 * range(5)(0)  // [0, 1, 2, 3, 4]
 * range(13)(10) // [10, 11, 12]
 *
 * // For generating a specific count of numbers starting from a value
 * const take = (count: number) => (start: number) =>
 *   unfold(([n, remaining]: [number, number]) =>
 *     remaining > 0 ? [n, [n + 1, remaining - 1]] : null
 *   )([start, count])
 * take(3)(10) // [10, 11, 12]
 *
 * const take = (n: number) => <T>(value: T) =>
 *   unfold((count: number) => count > 0 ? [value, count - 1] : null)(n)
 * take(3)("x") // ["x", "x", "x"]
 *
 * // Handle null/undefined seed gracefully
 * unfold((n: number) => n < 5 ? [n, n + 1] : null)(null) // []
 * unfold((n: number) => n < 5 ? [n, n + 1] : null)(undefined) // []
 * ```
 * @property Generator - builds array from seed value
 * @property Immutable - creates new array
 * @property Lazy - stops when generator returns null
 */
const unfold = <T, U>(
	fn: (seed: T) => readonly [U, T] | null,
) =>
(
	seed: T | null | undefined,
): Array<U> => {
	if (seed == null) {
		return []
	}

	// Build array using recursion
	const unfoldRecursive = (currentSeed: T): Array<U> => {
		const result = fn(currentSeed)

		if (result === null) {
			return []
		}

		const [value, nextSeed] = result
		return [value, ...unfoldRecursive(nextSeed)]
	}

	return unfoldRecursive(seed)
}

export default unfold
