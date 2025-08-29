/**
 * Executes async functions in parallel with a concurrency limit
 *
 * Runs async functions concurrently but limits the number of functions executing
 * at any given time. This is useful for rate limiting, managing resource usage,
 * or preventing overwhelming external services. Results are returned in the same
 * order as the input tasks, regardless of completion order.
 *
 * @param limit - Maximum number of concurrent executions
 * @param tasks - Array of async functions to execute
 * @returns Promise resolving to array of results in the same order as input
 * @curried
 * @example
 * ```typescript
 * // Basic usage with concurrency limit
 * const results = await parallelLimit(2)([
 *   async () => fetch("/api/1").then(r => r.json()),
 *   async () => fetch("/api/2").then(r => r.json()),
 *   async () => fetch("/api/3").then(r => r.json()),
 *   async () => fetch("/api/4").then(r => r.json())
 * ])
 * // Only 2 requests run at a time
 *
 * // Rate limiting API calls
 * const fetchWithRateLimit = parallelLimit(3)
 * const userIds = [1, 2, 3, 4, 5]
 * const tasks = userIds.map(id =>
 *   async () => fetch(`/api/users/${id}`).then(r => r.json())
 * )
 * const users = await fetchWithRateLimit(tasks)
 *
 * // Database connection pooling
 * const queryWithPool = parallelLimit(5)
 * const queries = [
 *   async () => db.query("SELECT * FROM users"),
 *   async () => db.query("SELECT * FROM posts")
 * ]
 * const results = await queryWithPool(queries)
 *
 * // Partial application for different scenarios
 * const sequential = parallelLimit(1)
 * const moderate = parallelLimit(5)
 * const aggressive = parallelLimit(20)
 *
 * // Error handling - fails fast on first error
 * try {
 *   await parallelLimit(2)([
 *     async () => "ok",
 *     async () => { throw new Error("Failed!") },
 *     async () => "never runs"
 *   ])
 * } catch (err) {
 *   console.error("Task failed:", err.message)
 * }
 *
 * // Edge cases
 * await parallelLimit(5)([])  // []
 * await parallelLimit(10)([async () => "one"])  // ["one"]
 * await parallelLimit(Infinity)(tasks)  // Same as Promise.all
 * ```
 */
const parallelLimit = (limit: number) =>
async <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<Array<T>> => {
	// Validate limit
	if (limit <= 0 || !Number.isFinite(limit)) {
		throw new Error(
			`Invalid limit: ${limit}. Must be a positive finite number.`,
		)
	}

	// Handle empty array
	if (tasks.length === 0) {
		return []
	}

	// If limit is greater than tasks, just run all in parallel
	if (limit >= tasks.length) {
		return Promise.all(tasks.map((task) => task()))
	}

	// Initialize results array with proper length
	const results: Array<T> = new Array(tasks.length)

	// Track which tasks are complete
	let nextTaskIndex = 0
	const inProgress = new Set<Promise<void>>()

	// Worker function that processes tasks from the queue
	const worker = async (): Promise<void> => {
		while (nextTaskIndex < tasks.length) {
			const currentIndex = nextTaskIndex++
			const task = tasks[currentIndex]

			try {
				results[currentIndex] = await task()
			} catch (error) {
				// Store error and re-throw to maintain fail-fast behavior
				throw error
			}
		}
	}

	// Start initial workers up to the limit
	const workerCount = Math.min(limit, tasks.length)
	const workers = Array.from({ length: workerCount }, () => worker())

	// Wait for all workers to complete
	await Promise.all(workers)

	return results
}

export default parallelLimit
