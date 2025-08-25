/**
 * Creates a Promise that resolves after a specified number of milliseconds
 *
 * Returns a Promise that will resolve with the provided value (or undefined)
 * after the specified delay. Useful for adding delays in async workflows,
 * implementing timeouts, throttling operations, or simulating asynchronous
 * behavior in tests.
 *
 * @curried (milliseconds) => (value?) => Promise<T>
 * @param milliseconds - The delay duration in milliseconds
 * @param value - Optional value to resolve with after the delay
 * @returns A Promise that resolves with the value after the specified delay
 * @example
 * ```typescript
 * // Basic delay without value
 * await delay(1000)()
 * console.log("1 second has passed")
 *
 * // Delay with value
 * const result = await delay(500)("Hello")
 * console.log(result) // "Hello" (after 500ms)
 *
 * // Using in async function chains
 * const fetchWithDelay = async (url: string) => {
 *   await delay(1000)()  // Wait 1 second
 *   return fetch(url)
 * }
 *
 * // Partial application for reusable delays
 * const wait1Second = delay(1000)
 * const wait500ms = delay(500)
 *
 * await wait1Second()
 * console.log("First delay done")
 * await wait500ms("with value")
 * console.log("Second delay done")
 *
 * // Use with Promise.all for parallel delays
 * const results = await Promise.all([
 *   delay(100)("first"),
 *   delay(200)("second"),
 *   delay(300)("third")
 * ])
 * console.log(results) // ["first", "second", "third"] (after 300ms total)
 *
 * // Use with Promise.race for timeout patterns
 * const timeout = delay(5000)(new Error("Timeout"))
 * const apiCall = fetch("/api/data").then(r => r.json())
 *
 * try {
 *   const result = await Promise.race([apiCall, timeout])
 *   if (result instanceof Error) throw result
 *   console.log("Got data:", result)
 * } catch (err) {
 *   console.error("Request timed out")
 * }
 *
 * // Sequential delays in loops
 * const items = ["a", "b", "c"]
 * for (const item of items) {
 *   console.log(item)
 *   await delay(1000)()  // 1 second between each
 * }
 *
 * // Exponential backoff pattern
 * const retryWithBackoff = async <T>(
 *   fn: () => Promise<T>,
 *   maxRetries = 3
 * ): Promise<T> => {
 *   for (let i = 0; i < maxRetries; i++) {
 *     try {
 *       return await fn()
 *     } catch (err) {
 *       if (i === maxRetries - 1) throw err
 *       await delay(Math.pow(2, i) * 1000)()
 *     }
 *   }
 *   throw new Error("Should not reach here")
 * }
 *
 * // Throttling rapid calls
 * const throttledLog = async (message: string) => {
 *   console.log(message)
 *   await delay(100)()  // Minimum 100ms between logs
 * }
 *
 * // Animation timing
 * const animate = async () => {
 *   element.classList.add("fade-out")
 *   await delay(300)()  // Wait for CSS transition
 *   element.style.display = "none"
 * }
 *
 * // Simulating async operations in tests
 * const mockApi = {
 *   getData: async (id: number) => {
 *     await delay(100)()  // Simulate network delay
 *     return { id, data: `Data for ${id}` }
 *   }
 * }
 *
 * // Debouncing with cancellation
 * let delayPromise: Promise<void> | null = null
 * const debounced = async (fn: () => void) => {
 *   delayPromise = delay(500)()
 *   await delayPromise
 *   fn()
 * }
 *
 * // Staggered processing
 * const processItems = async (items: Array<string>) => {
 *   for (const [index, item] of items.entries()) {
 *     await delay(index * 100)()  // Stagger by 100ms
 *     console.log(`Processing ${item}`)
 *   }
 * }
 *
 * // Rate limiting
 * const rateLimited = async <T>(
 *   tasks: Array<() => Promise<T>>,
 *   delayMs: number
 * ): Promise<Array<T>> => {
 *   const results: Array<T> = []
 *   for (const task of tasks) {
 *     results.push(await task())
 *     await delay(delayMs)()
 *   }
 *   return results
 * }
 *
 * // Zero delay for next tick
 * await delay(0)()  // Yields to event loop
 * console.log("Next tick")
 *
 * // Type preservation
 * const typedDelay = delay(1000)
 * const stringResult = await typedDelay("hello")  // type: string
 * const numberResult = await typedDelay(42)       // type: number
 * const voidResult = await typedDelay()           // type: void
 * ```
 * @property Non-blocking - Uses setTimeout internally, doesn't block the event loop
 * @property Type-safe - Preserves the type of the resolved value
 * @property Curried - Can be partially applied for reusable delays
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
