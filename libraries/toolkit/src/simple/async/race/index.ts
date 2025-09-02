import isEmpty from "../../array/isEmpty/index.ts"

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
 * @impure
 * @example
 * ```typescript
 * // Basic race - first to complete wins
 * const result = await race([
 *   async () => delay(300)("slow"),
 *   async () => delay(100)("fast"),
 *   async () => delay(200)("medium")
 * ])
 * console.log(result) // "fast" (completes first)
 *
 * // Timeout pattern
 * const fetchWithTimeout = async (url: string, timeoutMs = 5000) => {
 *   return race([
 *     async () => fetch(url).then(r => r.json()),
 *     async () => delayReject(timeoutMs)(new Error("Timeout"))
 *   ])
 * }
 *
 * // Fallback pattern - try multiple sources
 * const fetchFromFastest = async () => {
 *   return race([
 *     async () => fetch("https://primary.com/data"),
 *     async () => fetch("https://backup.com/data")
 *   ])
 * }
 *
 * // Load balancing - use fastest server
 * const servers = ["server1.com", "server2.com", "server3.com"]
 * const tasks = servers.map(server =>
 *   async () => fetch(`https://${server}/api`)
 * )
 * const fastest = await race(tasks)
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
 * // Edge cases
 * race([]) // Throws - would never settle
 * race([async () => "single"]) // Returns "single"
 * ```
 */
const race = async <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<T> => {
	// Handle empty array - this would never resolve
	if (isEmpty(tasks)) {
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
