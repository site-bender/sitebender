/**
 * Creates a Promise that rejects after a specified number of milliseconds
 * 
 * Returns a Promise that will reject with the provided error (or a default
 * timeout error) after the specified delay. Useful for implementing timeouts,
 * testing error handling paths, simulating failures, or creating race
 * conditions with time limits.
 * 
 * @curried (milliseconds) => (error?) => Promise<never>
 * @param milliseconds - The delay duration in milliseconds before rejection
 * @param error - Optional error to reject with (defaults to timeout error)
 * @returns A Promise that rejects with the error after the specified delay
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
 *   console.error(err.message) // "Custom timeout" (after 500ms)
 * }
 * 
 * // Using with Promise.race for timeout pattern
 * const fetchWithTimeout = async (url: string, timeoutMs = 5000) => {
 *   const timeout = delayReject(timeoutMs)(
 *     new Error(`Request timeout after ${timeoutMs}ms`)
 *   )
 *   const response = fetch(url)
 *   
 *   return Promise.race([response, timeout])
 * }
 * 
 * try {
 *   const data = await fetchWithTimeout("/api/slow-endpoint", 3000)
 *   console.log("Success:", data)
 * } catch (err) {
 *   console.error("Failed:", err.message)
 * }
 * 
 * // Partial application for reusable timeouts
 * const timeout5s = delayReject(5000)
 * const timeout10s = delayReject(10000)
 * 
 * const quickTimeout = timeout5s(new Error("Operation too slow"))
 * const longTimeout = timeout10s(new Error("Maximum wait exceeded"))
 * 
 * // Multiple timeout thresholds
 * const tieredTimeout = async <T>(
 *   operation: Promise<T>
 * ): Promise<T> => {
 *   const warning = delayReject(3000)(new Error("Warning: Slow"))
 *   const critical = delayReject(5000)(new Error("Critical: Too slow"))
 *   const fatal = delayReject(10000)(new Error("Fatal: Timeout"))
 *   
 *   return Promise.race([operation, warning, critical, fatal])
 * }
 * 
 * // Testing error handling
 * const testErrorPath = async () => {
 *   const simulateFailure = delayReject(100)(
 *     new Error("Simulated network error")
 *   )
 *   
 *   try {
 *     await simulateFailure
 *   } catch (err) {
 *     // Test error handling logic
 *     console.log("Error handled correctly")
 *   }
 * }
 * 
 * // Circuit breaker pattern
 * const circuitBreaker = async <T>(
 *   fn: () => Promise<T>,
 *   timeoutMs: number,
 *   maxRetries: number
 * ): Promise<T> => {
 *   for (let i = 0; i < maxRetries; i++) {
 *     try {
 *       const timeout = delayReject(timeoutMs)(
 *         new Error(`Circuit open: timeout after ${timeoutMs}ms`)
 *       )
 *       return await Promise.race([fn(), timeout])
 *     } catch (err) {
 *       if (i === maxRetries - 1) throw err
 *       console.log(`Retry ${i + 1} failed, trying again...`)
 *     }
 *   }
 *   throw new Error("Should not reach here")
 * }
 * 
 * // Rejection with different error types
 * const networkError = delayReject(1000)(
 *   new TypeError("Network request failed")
 * )
 * const validationError = delayReject(500)(
 *   new RangeError("Value out of range")
 * )
 * const customError = delayReject(200)({
 *   code: "TIMEOUT",
 *   message: "Operation timed out",
 *   timestamp: Date.now()
 * })
 * 
 * // Combining with delay for mock async operations
 * import delay from "../delay/index.ts"
 * 
 * const mockApiCall = async (shouldFail: boolean) => {
 *   if (shouldFail) {
 *     await delayReject(1000)(new Error("API Error"))
 *   } else {
 *     return delay(1000)({ success: true })
 *   }
 * }
 * 
 * // Timeout with cleanup
 * const withTimeout = async <T>(
 *   promise: Promise<T>,
 *   ms: number,
 *   cleanup?: () => void
 * ): Promise<T> => {
 *   try {
 *     const timeout = delayReject(ms)(
 *       new Error(`Timeout after ${ms}ms`)
 *     )
 *     return await Promise.race([promise, timeout])
 *   } catch (err) {
 *     if (cleanup) cleanup()
 *     throw err
 *   }
 * }
 * 
 * // Graceful degradation
 * const fetchWithFallback = async (
 *   primaryUrl: string,
 *   fallbackUrl: string
 * ) => {
 *   try {
 *     const timeout = delayReject(2000)(
 *       new Error("Primary source timeout")
 *     )
 *     return await Promise.race([fetch(primaryUrl), timeout])
 *   } catch {
 *     console.log("Primary failed, trying fallback...")
 *     return fetch(fallbackUrl)
 *   }
 * }
 * 
 * // Staggered timeout rejections
 * const staggeredTimeouts = async () => {
 *   const timeouts = [100, 200, 300, 400, 500].map(
 *     ms => delayReject(ms)(new Error(`Timeout at ${ms}ms`))
 *   )
 *   
 *   try {
 *     await Promise.race(timeouts)
 *   } catch (err) {
 *     console.log(err.message) // "Timeout at 100ms"
 *   }
 * }
 * 
 * // Zero delay for immediate rejection
 * try {
 *   await delayReject(0)(new Error("Immediate failure"))
 * } catch (err) {
 *   console.log("Failed immediately")
 * }
 * 
 * // Type preservation for custom errors
 * class CustomError extends Error {
 *   constructor(public code: number, message: string) {
 *     super(message)
 *   }
 * }
 * 
 * const typedReject = delayReject(1000)
 * try {
 *   await typedReject(new CustomError(404, "Not found"))
 * } catch (err) {
 *   if (err instanceof CustomError) {
 *     console.log(err.code) // TypeScript knows about 'code'
 *   }
 * }
 * ```
 * @property Non-blocking - Uses setTimeout internally, doesn't block the event loop
 * @property Type-safe - Preserves the type of the rejection error
 * @property Curried - Can be partially applied for reusable timeout patterns
 */
const delayReject = (milliseconds: number) => <E = Error>(
	error?: E
): Promise<never> => {
	// Validate input
	if (milliseconds < 0 || !Number.isFinite(milliseconds)) {
		return Promise.reject(
			new Error(`Invalid delay: ${milliseconds}ms. Must be a non-negative finite number.`)
		)
	}
	
	// Return a Promise that rejects after the specified delay
	return new Promise<never>((_, reject) => {
		setTimeout(() => {
			// Use provided error or create default timeout error
			const rejectionError = error ?? new Error(`Timeout after ${milliseconds}ms`)
			reject(rejectionError)
		}, milliseconds)
	})
}

export default delayReject