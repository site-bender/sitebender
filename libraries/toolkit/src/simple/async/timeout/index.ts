/**
 * Adds a timeout to a Promise, rejecting if it doesn't resolve in time
 *
 * Wraps a Promise with a timeout, creating a race condition between the original
 * Promise and a timeout. If the Promise doesn't resolve or reject within the
 * specified time limit, the result will reject with a timeout error. Useful for
 * preventing operations from hanging indefinitely and implementing SLA requirements.
 *
 * @curried (milliseconds) => (error?) => (promise) => Promise<T>
 * @param milliseconds - Maximum time to wait before timing out
 * @param error - Optional custom error to reject with on timeout
 * @param promise - The Promise to add timeout to
 * @returns Promise that resolves with original value or rejects on timeout
 * @example
 * ```typescript
 * // Basic timeout with default error
 * import delay from "../delay/index.ts"
 *
 * const slowOperation = delay(5000)("slow result")
 *
 * try {
 *   const result = await timeout(3000)()(slowOperation)
 *   console.log(result) // Never reaches here
 * } catch (err) {
 *   console.error(err.message) // "Operation timed out after 3000ms"
 * }
 *
 * // Timeout with custom error
 * const withCustomError = timeout(2000)(
 *   new Error("API request took too long")
 * )
 *
 * try {
 *   const response = await withCustomError(fetch("/api/slow-endpoint"))
 * } catch (err) {
 *   console.error(err.message) // "API request took too long"
 * }
 *
 * // Successful completion within timeout
 * const fastOperation = delay(1000)("fast result")
 * const result = await timeout(2000)()(fastOperation)
 * console.log(result) // "fast result" (after 1 second)
 *
 * // Partial application for reusable timeouts
 * const timeout5s = timeout(5000)()
 * const timeout10s = timeout(10000)()
 * const timeout30s = timeout(30000)()
 *
 * // Apply to different operations
 * const data1 = await timeout5s(fetchUserData())
 * const data2 = await timeout10s(processLargeFile())
 * const data3 = await timeout30s(runComplexQuery())
 *
 * // API client with timeout
 * class ApiClient {
 *   private timeout3s = timeout(3000)()
 *   private timeout10s = timeout(10000)()
 *
 *   async get(url: string) {
 *     return this.timeout3s(fetch(url).then(r => r.json()))
 *   }
 *
 *   async post(url: string, data: any) {
 *     return this.timeout10s(
 *       fetch(url, {
 *         method: "POST",
 *         body: JSON.stringify(data)
 *       }).then(r => r.json())
 *     )
 *   }
 * }
 *
 * // Database operations with timeout
 * const queryWithTimeout = timeout(5000)(
 *   new Error("Database query timeout")
 * )
 *
 * const runQuery = async (sql: string) => {
 *   try {
 *     return await queryWithTimeout(db.query(sql))
 *   } catch (err) {
 *     console.error("Query failed:", err.message)
 *     // Potentially kill the long-running query
 *     await db.killQuery(sql)
 *     throw err
 *   }
 * }
 *
 * // Different timeouts for different environments
 * const getTimeout = () => {
 *   if (process.env.NODE_ENV === "production") {
 *     return timeout(5000)() // Strict in production
 *   } else if (process.env.NODE_ENV === "development") {
 *     return timeout(30000)() // Lenient in development
 *   } else {
 *     return timeout(10000)() // Default for testing
 *   }
 * }
 *
 * const envTimeout = getTimeout()
 * const result = await envTimeout(someOperation())
 *
 * // Timeout with retry logic
 * import retry from "../retry/index.ts"
 *
 * const fetchWithTimeoutAndRetry = retry({
 *   attempts: 3,
 *   delay: 1000,
 *   exponential: true
 * })(async () => {
 *   const timeoutFetch = timeout(5000)(
 *     new Error("Request timeout")
 *   )
 *   return timeoutFetch(fetch("/api/data").then(r => r.json()))
 * })
 *
 * // Cascading timeouts
 * const tieredTimeout = async <T>(promise: Promise<T>) => {
 *   // Try with short timeout first
 *   try {
 *     return await timeout(1000)()(promise)
 *   } catch {
 *     console.log("Quick timeout failed, trying longer...")
 *     // Fall back to longer timeout
 *     return timeout(5000)()(promise)
 *   }
 * }
 *
 * // Timeout for user interactions
 * const waitForUserInput = async () => {
 *   const inputPromise = new Promise((resolve) => {
 *     document.getElementById("submit")?.addEventListener(
 *       "click",
 *       () => resolve("submitted")
 *     )
 *   })
 *
 *   try {
 *     const result = await timeout(30000)(
 *       new Error("User input timeout")
 *     )(inputPromise)
 *     return result
 *   } catch {
 *     console.log("User didn't respond in time")
 *     return "default-action"
 *   }
 * }
 *
 * // WebSocket connection with timeout
 * const connectWebSocket = async (url: string) => {
 *   const connectionPromise = new Promise((resolve, reject) => {
 *     const ws = new WebSocket(url)
 *     ws.onopen = () => resolve(ws)
 *     ws.onerror = reject
 *   })
 *
 *   return timeout(10000)(
 *     new Error("WebSocket connection timeout")
 *   )(connectionPromise)
 * }
 *
 * // File upload with timeout
 * const uploadFile = async (file: File) => {
 *   const formData = new FormData()
 *   formData.append("file", file)
 *
 *   // Longer timeout for larger files
 *   const timeoutMs = Math.max(10000, file.size / 1000) // 1KB per second minimum
 *
 *   return timeout(timeoutMs)(
 *     new Error(`Upload timeout for ${file.name}`)
 *   )(
 *     fetch("/upload", {
 *       method: "POST",
 *       body: formData
 *     })
 *   )
 * }
 *
 * // Promise.all with timeout
 * const fetchAllWithTimeout = async (urls: Array<string>) => {
 *   const promises = urls.map(url => fetch(url).then(r => r.json()))
 *   const combined = Promise.all(promises)
 *
 *   return timeout(10000)(
 *     new Error("Batch fetch timeout")
 *   )(combined)
 * }
 *
 * // Timeout with cleanup
 * const timeoutWithCleanup = <T>(
 *   ms: number,
 *   cleanup: () => void
 * ) => (promise: Promise<T>) => {
 *   return timeout(ms)()(promise).catch(err => {
 *     cleanup()
 *     throw err
 *   })
 * }
 *
 * // Usage
 * const controller = new AbortController()
 * const fetchWithAbort = timeoutWithCleanup(
 *   5000,
 *   () => controller.abort()
 * )(fetch("/api/data", { signal: controller.signal }))
 *
 * // Zero timeout for immediate check
 * const immediate = timeout(0)()(Promise.resolve("instant"))
 * console.log(await immediate) // "instant"
 *
 * // Infinite operations need timeout
 * const infiniteLoop = new Promise(() => {
 *   // Never resolves
 * })
 *
 * try {
 *   await timeout(1000)()(infiniteLoop)
 * } catch {
 *   console.log("Infinite loop terminated by timeout")
 * }
 *
 * // Type preservation
 * const typedPromise = Promise.resolve({ id: 1, name: "Test" })
 * const typedResult = await timeout(1000)()(typedPromise)
 * // TypeScript knows: { id: number, name: string }
 *
 * // Custom timeout error with metadata
 * class TimeoutError extends Error {
 *   constructor(
 *     message: string,
 *     public readonly duration: number,
 *     public readonly operation: string
 *   ) {
 *     super(message)
 *     this.name = "TimeoutError"
 *   }
 * }
 *
 * const detailedTimeout = timeout(5000)(
 *   new TimeoutError("Operation failed", 5000, "fetchUserData")
 * )
 *
 * try {
 *   await detailedTimeout(fetchUserData())
 * } catch (err) {
 *   if (err instanceof TimeoutError) {
 *     console.log(`${err.operation} timed out after ${err.duration}ms`)
 *   }
 * }
 * ```
 * @property Non-intrusive - Wraps existing Promises without modification
 * @property Configurable - Custom timeout duration and error messages
 * @property Type-safe - Preserves the type of the wrapped Promise
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
