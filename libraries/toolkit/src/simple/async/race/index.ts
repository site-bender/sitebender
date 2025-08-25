/**
 * Returns the result of the first async function to complete (resolve or reject)
 *
 * Executes all provided async functions concurrently and returns a Promise that
 * resolves or rejects with the first result to complete. This is essentially
 * Promise.race but for functions that need to be invoked. Useful for timeouts,
 * fallbacks, or getting the fastest response from multiple sources.
 *
 * @param tasks - Array of async functions to race
 * @returns Promise resolving to the first completed result
 * @example
 * ```typescript
 * // Basic race - first to complete wins
 * import delay from "../delay/index.ts"
 *
 * const result = await race([
 *   async () => delay(300)("slow"),
 *   async () => delay(100)("fast"),
 *   async () => delay(200)("medium")
 * ])
 * console.log(result) // "fast" (completes first at 100ms)
 *
 * // Timeout pattern
 * import delayReject from "../delayReject/index.ts"
 *
 * const fetchWithTimeout = async (url: string, timeoutMs = 5000) => {
 *   return race([
 *     async () => fetch(url).then(r => r.json()),
 *     async () => delayReject(timeoutMs)(new Error("Request timeout"))
 *   ])
 * }
 *
 * try {
 *   const data = await fetchWithTimeout("/api/slow-endpoint", 3000)
 *   console.log("Success:", data)
 * } catch (err) {
 *   console.error("Failed or timed out:", err.message)
 * }
 *
 * // Fallback pattern - try multiple sources
 * const fetchFromFastest = async () => {
 *   return race([
 *     async () => fetch("https://primary-cdn.com/data.json"),
 *     async () => fetch("https://secondary-cdn.com/data.json"),
 *     async () => fetch("https://backup-cdn.com/data.json")
 *   ])
 * }
 *
 * // Empty array never resolves
 * // race([]) // Promise that never settles - avoid this!
 *
 * // Single task returns its result
 * const single = await race([
 *   async () => "only task"
 * ])
 * console.log(single) // "only task"
 *
 * // First rejection wins if it's fastest
 * try {
 *   await race([
 *     async () => { throw new Error("Instant fail") },
 *     async () => delay(100)("too late")
 *   ])
 * } catch (err) {
 *   console.error(err.message) // "Instant fail"
 * }
 *
 * // Cancellation pattern with race
 * const createCancellableOperation = () => {
 *   let cancel: () => void
 *   const cancellationPromise = new Promise<never>((_, reject) => {
 *     cancel = () => reject(new Error("Cancelled"))
 *   })
 *
 *   const operation = async (task: () => Promise<any>) => {
 *     return race([
 *       task,
 *       async () => cancellationPromise
 *     ])
 *   }
 *
 *   return { operation, cancel: cancel! }
 * }
 *
 * const { operation, cancel } = createCancellableOperation()
 *
 * // Start long operation
 * const promise = operation(async () => {
 *   await delay(5000)()
 *   return "Complete"
 * })
 *
 * // Cancel after 1 second
 * setTimeout(cancel, 1000)
 *
 * try {
 *   await promise
 * } catch (err) {
 *   console.log(err.message) // "Cancelled"
 * }
 *
 * // Load balancing - use fastest server
 * const servers = [
 *   "https://server1.example.com",
 *   "https://server2.example.com",
 *   "https://server3.example.com"
 * ]
 *
 * const fetchFromFastestServer = async (endpoint: string) => {
 *   const tasks = servers.map(server =>
 *     async () => fetch(`${server}${endpoint}`).then(r => r.json())
 *   )
 *   return race(tasks)
 * }
 *
 * // Competitive processing
 * const findPrimeNumber = async () => {
 *   return race([
 *     async () => calculatePrimeMethod1(1000000),
 *     async () => calculatePrimeMethod2(1000000),
 *     async () => calculatePrimeMethod3(1000000)
 *   ])
 *   // Returns result from whichever algorithm finishes first
 * }
 *
 * // Timeout with default value
 * const fetchWithDefault = async (url: string, defaultValue: any) => {
 *   return race([
 *     async () => fetch(url).then(r => r.json()),
 *     async () => delay(3000)(defaultValue)
 *   ])
 * }
 *
 * const data = await fetchWithDefault("/api/config", {
 *   theme: "light",
 *   lang: "en"
 * })
 * // Returns API response or default config after 3 seconds
 *
 * // Racing different data sources
 * const getUserData = async (userId: string) => {
 *   return race([
 *     async () => fetchFromCache(userId),
 *     async () => fetchFromDatabase(userId),
 *     async () => fetchFromAPI(userId)
 *   ])
 *   // Returns data from whichever source responds first
 * }
 *
 * // Staggered timeouts
 * const tieredFallback = async () => {
 *   return race([
 *     async () => {
 *       const result = await primarySource()
 *       console.log("Primary succeeded")
 *       return result
 *     },
 *     async () => {
 *       await delay(1000)() // Wait before trying secondary
 *       const result = await secondarySource()
 *       console.log("Secondary succeeded")
 *       return result
 *     },
 *     async () => {
 *       await delay(2000)() // Wait longer before fallback
 *       const result = await fallbackSource()
 *       console.log("Fallback succeeded")
 *       return result
 *     }
 *   ])
 * }
 *
 * // Promise timeout utility
 * const withTimeout = async <T>(
 *   task: () => Promise<T>,
 *   ms: number,
 *   timeoutError = new Error(`Timeout after ${ms}ms`)
 * ): Promise<T> => {
 *   return race([
 *     task,
 *     async () => delayReject(ms)(timeoutError)
 *   ])
 * }
 *
 * // Usage
 * const result = await withTimeout(
 *   async () => complexCalculation(),
 *   5000,
 *   new Error("Calculation took too long")
 * )
 *
 * // Testing race conditions
 * const testRaceCondition = async () => {
 *   const results = await Promise.all(
 *     Array.from({ length: 10 }, () =>
 *       race([
 *         async () => delay(Math.random() * 100)("A"),
 *         async () => delay(Math.random() * 100)("B"),
 *         async () => delay(Math.random() * 100)("C")
 *       ])
 *     )
 *   )
 *   console.log("Winners:", results)
 *   // Random distribution of A, B, C based on timing
 * }
 *
 * // Type preservation
 * const typedRace = await race([
 *   async () => "string" as const,
 *   async () => 123 as const,
 *   async () => true as const
 * ])
 * // TypeScript knows: "string" | 123 | true
 * ```
 * @property First-wins - Returns the first result to complete
 * @property Concurrent - All functions start executing immediately
 * @property Short-circuit - Other tasks continue but their results are ignored
 */
const race = async <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<T> => {
	// Handle empty array - this would never resolve
	if (tasks.length === 0) {
		throw new Error(
			"Cannot race an empty array of tasks - the Promise would never settle",
		)
	}

	// Handle single task
	if (tasks.length === 1) {
		return tasks[0]()
	}

	// Execute all tasks concurrently and race them
	const promises = tasks.map((task) => task())
	return Promise.race(promises)
}

export default race
