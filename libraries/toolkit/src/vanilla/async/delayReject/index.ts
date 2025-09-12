/**
 * Creates a Promise that rejects after a specified number of milliseconds
 *
 * Returns a Promise that will reject with the provided error (or a default
 * timeout error) after the specified delay. Useful for implementing timeouts,
 * testing error handling paths, simulating failures, or creating race
 * conditions with time limits.
 * @param milliseconds - The delay duration in milliseconds before rejection
 * @param error - Optional error to reject with (defaults to timeout error)
 * @returns A Promise that rejects with the error after the specified delay
 * @curried
 * @impure
 * @example
 * ```typescript
 * // Basic rejection with default error
 * try {
 *   await delayReject(1000)()
 * } catch (err) {
 *   console.error(err) // Error: Timeout after 1000ms
 * }
 *
 * // Rejection with custom error
 * try {
 *   await delayReject(500)(new Error("Custom timeout"))
 * } catch (err) {
 *   console.error(err.message) // "Custom timeout"
 * }
 *
 * // Timeout pattern with Promise.race
 * const fetchWithTimeout = async (url: string, timeoutMs = 5000) => {
 *   const timeout = delayReject(timeoutMs)(
 *     new Error(`Request timeout after ${timeoutMs}ms`)
 *   )
 *   return Promise.race([fetch(url), timeout])
 * }
 *
 * // Partial application for reusable timeouts
 * const timeout5s = delayReject(5000)
 * const timeout10s = delayReject(10000)
 * const quickTimeout = timeout5s(new Error("Operation too slow"))
 *
 * // Testing error handling
 * const simulateFailure = delayReject(100)(
 *   new Error("Simulated network error")
 * )
 * try {
 *   await simulateFailure
 * } catch (err) {
 *   console.log("Error handled correctly")
 * }
 *
 * // Staggered timeout rejections
 * const timeouts = [100, 200, 300].map(
 *   ms => delayReject(ms)(new Error(`Timeout at ${ms}ms`))
 * )
 * try {
 *   await Promise.race(timeouts)
 * } catch (err) {
 *   console.log(err.message) // "Timeout at 100ms"
 * }
 *
 * // Type preservation
 * const typedReject = delayReject(1000)
 * await typedReject(new TypeError("Type error"))
 * await typedReject({ code: 404, message: "Not found" })
 * ```
 */
const delayReject = (milliseconds: number) =>
<E = Error>(
	error?: E,
): Promise<never> => {
	// Validate input
	if (milliseconds < 0 || !Number.isFinite(milliseconds)) {
		return Promise.reject(
			new Error(
				`Invalid delay: ${milliseconds}ms. Must be a non-negative finite number.`,
			),
		)
	}

	// Return a Promise that rejects after the specified delay
	return new Promise<never>((_, reject) => {
		setTimeout(() => {
			// Use provided error or create default timeout error
			const rejectionError = error ??
				new Error(`Timeout after ${milliseconds}ms`)
			reject(rejectionError)
		}, milliseconds)
	})
}

export default delayReject
