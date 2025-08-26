/**
 * Calls a function n times and collects the results in an array
 *
 * Executes a function n times, passing the current index to each call,
 * and returns an array of the results. The function receives the current
 * iteration index (0-based) as its argument. Useful for generating arrays
 * of a specific length, creating test data, repeating operations, or
 * building sequences based on index.
 *
 * @param n - Number of times to call the function
 * @param fn - Function to call, receives index as argument
 * @returns Array containing the results of each function call
 * @example
 * ```typescript
 * // Basic usage - generate array of numbers
 * times(5)((i: number) => i)       // [0, 1, 2, 3, 4]
 * times(5)((i: number) => i * i)   // [0, 1, 4, 9, 16]
 *
 * // Create constants
 * times(3)(() => "hello")  // ["hello", "hello", "hello"]
 *
 * // Generate IDs
 * times(4)((i: number) => `id-${i + 1}`)
 * // ["id-1", "id-2", "id-3", "id-4"]
 *
 * // Create objects
 * times(3)((i: number) => ({ id: i, value: i * 10 }))
 * // [{ id: 0, value: 0 }, { id: 1, value: 10 }, { id: 2, value: 20 }]
 *
 * // Powers of 2
 * times(8)((i: number) => Math.pow(2, i))
 * // [1, 2, 4, 8, 16, 32, 64, 128]
 *
 * // Edge cases
 * times(0)((i: number) => i)   // []
 * times(-5)((i: number) => i)  // []
 * times(NaN)((i: number) => i) // []
 * times(3.7)((i: number) => i) // [0, 1, 2] (truncated)
 * ```
 * @pure
 * @curried
 * @safe
 */
const times = <T>(
	n: number,
) =>
(
	fn: (index: number) => T,
): Array<T> => {
	// Handle invalid n values
	if (n == null || n <= 0 || !Number.isFinite(n)) {
		return []
	}

	// Truncate to integer
	const count = Math.floor(n)

	// Use Array.from to generate the array functionally
	return Array.from({ length: count }, (_, i) => fn(i))
}

export default times
