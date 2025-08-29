/**
 * Adds a timeout to a Promise, rejecting if it doesn't resolve in time
 *
 * Wraps a Promise with a timeout, creating a race condition between the original
 * Promise and a timeout. If the Promise doesn't resolve or reject within the
 * specified time limit, the result will reject with a timeout error. Useful for
 * preventing operations from hanging indefinitely and implementing SLA requirements.
 *
 * @param milliseconds - Maximum time to wait before timing out
 * @param error - Optional custom error to reject with on timeout
 * @param promise - The Promise to add timeout to
 * @returns Promise that resolves with original value or rejects on timeout
 * @curried
 * @impure
 * @example
 * ```typescript
 * // Basic timeout with default error
 * const slowOperation = delay(5000)("slow result")
 * try {
 *   const result = await timeout(3000)()(slowOperation)
 * } catch (err) {
 *   console.error(err.message) // "Operation timed out after 3000ms"
 * }
 *
 * // Timeout with custom error
 * const withCustomError = timeout(2000)(
 *   new Error("API request took too long")
 * )
 * const response = await withCustomError(fetch("/api/slow"))
 *
 * // Successful completion within timeout
 * const fastOperation = delay(1000)("fast")
 * const result = await timeout(2000)()(fastOperation)
 * console.log(result) // "fast" (after 1 second)
 *
 * // Partial application for reusable timeouts
 * const timeout5s = timeout(5000)()
 * const timeout10s = timeout(10000)()
 * const data = await timeout5s(fetchUserData())
 *
 * // Database operations with timeout
 * const queryWithTimeout = timeout(5000)(
 *   new Error("Database query timeout")
 * )
 * const result = await queryWithTimeout(db.query(sql))
 *
 * // API client with timeout
 * const apiGet = (url: string) => 
 *   timeout(3000)()(fetch(url).then(r => r.json()))
 *
 * // Edge cases
 * timeout(0)()(Promise.resolve("instant")) // Resolves immediately
 * timeout(1000)()(new Promise(() => {})) // Times out (never resolves)
 * ```
 */
const timeout = (milliseconds: number) =>
<E = Error>(
	error?: E,
) =>
<T>(
	promise: Promise<T>,
): Promise<T> => {
	// Validate input
	if (milliseconds < 0 || !Number.isFinite(milliseconds)) {
		return Promise.reject(
			new Error(
				`Invalid timeout: ${milliseconds}ms. Must be a non-negative finite number.`,
			),
		)
	}

	// Create timeout promise
	const timeoutPromise = new Promise<never>((_, reject) => {
		setTimeout(() => {
			const timeoutError = error ??
				new Error(`Operation timed out after ${milliseconds}ms`)
			reject(timeoutError)
		}, milliseconds)
	})

	// Race the original promise against the timeout
	return Promise.race([promise, timeoutPromise])
}

export default timeout
