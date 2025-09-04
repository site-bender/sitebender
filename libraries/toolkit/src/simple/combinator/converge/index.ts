/**
 * Applies multiple functions to the same arguments and combines results
 * The converging function receives the results of all branch functions
 *
 * @param converger - Function to combine results
 * @param branches - Array of functions to apply to arguments
 * @returns Function that converges results
 * @pure
 * @example
 * ```typescript
 * // Calculate average using converge
 * const sum = (nums: Array<number>) => nums.reduce((a, b) => a + b, 0)
 * const length = (nums: Array<number>) => nums.length
 * const divide = (a: number, b: number) => a / b
 *
 * const average = converge(divide, [sum, length])
 * average([1, 2, 3, 4, 5]) // 3
 *
 * // Build objects from multiple computations
 * const stats = converge(
 *   (min: number, max: number, avg: number) => ({ min, max, avg }),
 *   [
 *     (nums: Array<number>) => Math.min(...nums),
 *     (nums: Array<number>) => Math.max(...nums),
 *     average
 *   ]
 * )
 *
 * stats([5, 2, 8, 1, 9]) // { min: 1, max: 9, avg: 5 }
 *
 * // Mathematical operations
 * const pythagoras = converge(
 *   Math.sqrt,
 *   [(a: number, b: number) => a * a + b * b]
 * )
 *
 * pythagoras(3, 4) // 5
 *
 * // Validation with multiple checks
 * const isValid = converge(
 *   (a: boolean, b: boolean, c: boolean) => a && b && c,
 *   [
 *     (x: number) => x > 0,
 *     (x: number) => x < 100,
 *     (x: number) => x % 2 === 0
 *   ]
 * )
 *
 * isValid(50) // true
 * isValid(101) // false
 * ```
 */
const converge = <T extends ReadonlyArray<unknown>, R>(
	converger: (...results: ReadonlyArray<unknown>) => R,
	branches: ReadonlyArray<(...args: T) => unknown>,
) =>
(...args: T): R => {
	const results = branches.map((branch) => branch(...args))
	return converger(...results)
}

export default converge
