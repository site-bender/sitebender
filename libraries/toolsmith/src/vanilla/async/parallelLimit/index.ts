import isEmpty from "../../array/isEmpty/index.ts"

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
export default function parallelLimit(limit: number) {
	return async function runWithLimit<T>(
		tasks: ReadonlyArray<() => Promise<T>>,
	): Promise<Array<T>> {
		// Validate limit
		if (limit <= 0 || !Number.isFinite(limit)) {
			throw new Error(
				`Invalid limit: ${limit}. Must be a positive finite number.`,
			)
		}

		// Handle empty array
		if (isEmpty(tasks)) {
			return []
		}

		// If limit is greater than tasks, just run all in parallel
		if (limit >= tasks.length) {
			return Promise.all(tasks.map(function executeTask(task) {
				return task()
			}))
		}

		// Initialize results array with proper length
		const results: Array<T> = new Array(tasks.length)

		// Track which tasks are complete
		let nextTaskIndex = 0
		const _inProgress = new Set<Promise<void>>()

		// Runner function that processes tasks via promise chaining (no await in loop)
		function runNext(): Promise<void> {
			const currentIndex = nextTaskIndex++
			if (currentIndex >= tasks.length) return Promise.resolve()
			const task = tasks[currentIndex]
			return task()
				.then(function storeResult(value) {
					results[currentIndex] = value
				})
				.then(runNext)
		}

		// Start initial runners up to the limit
		const runnerCount = Math.min(limit, tasks.length)
		const runners = Array.from(
			{ length: runnerCount },
			function createRunner() {
				return runNext()
			},
		)

		// Wait for all runners to complete
		await Promise.all(runners)

		return results
	}
}
