/**
 * Creates a Promise that resolves after a specified number of milliseconds
 *
 * Returns a Promise that will resolve with the provided value (or undefined)
 * after the specified delay. Useful for adding delays in async workflows,
 * implementing timeouts, throttling operations, or simulating asynchronous
 * behavior in tests.
 * @param milliseconds - The delay duration in milliseconds
 * @param value - Optional value to resolve with after the delay
 * @returns A Promise that resolves with the value after the specified delay
 * @curried
 * @impure
 * @example
 * ```typescript
 * // Basic delay
 * await delay(1000)()
 * console.log("1 second has passed")
 *
 * // Delay with value
 * const result = await delay(500)("Hello")
 * console.log(result) // "Hello" (after 500ms)
 *
 * // Partial application for reusable delays
 * const wait1Second = delay(1000)
 * const wait500ms = delay(500)
 * await wait1Second()
 * await wait500ms("with value")
 *
 * // Parallel delays
 * const results = await Promise.all([
 *   delay(100)("first"),
 *   delay(200)("second"),
 *   delay(300)("third")
 * ])
 * // ["first", "second", "third"] (after 300ms total)
 *
 * // Timeout pattern with Promise.race
 * const timeout = delay(5000)(new Error("Timeout"))
 * const apiCall = fetch("/api/data").then(r => r.json())
 * const result = await Promise.race([apiCall, timeout])
 *
 * // Sequential processing with reduce
 * const items = ["a", "b", "c"]
 * await items.reduce(
 *   async (prev, item) => {
 *     await prev
 *     console.log(item)
 *     await delay(1000)()
 *   },
 *   Promise.resolve()
 * )
 *
 * // Type preservation
 * const stringResult = await delay(1000)("hello")  // type: string
 * const numberResult = await delay(1000)(42)       // type: number
 * const voidResult = await delay(1000)()           // type: void
 * ```
 */
const delay = (milliseconds: number) =>
<T = void>(
	value?: T,
): Promise<T> => {
	// Validate input
	if (milliseconds < 0 || !Number.isFinite(milliseconds)) {
		return Promise.reject(
			new Error(
				`Invalid delay: ${milliseconds}ms. Must be a non-negative finite number.`,
			),
		)
	}

	// Return a Promise that resolves after the specified delay
	return new Promise<T>((resolve) => {
		setTimeout(() => {
			resolve(value as T)
		}, milliseconds)
	})
}

export default delay
