/**
 * Executes an array of async functions in parallel and collects their results
 *
 * Runs all provided async functions concurrently and returns a Promise that
 * resolves with an array of all results in the same order as the input functions.
 * If any function rejects, the entire operation rejects immediately with that error.
 * This is essentially Promise.all but for functions that need to be invoked.
 *
 * @param tasks - Array of async functions to execute in parallel
 * @returns Promise resolving to array of results in the same order as input
 * @impure
 * @example
 * ```typescript
 * // Basic parallel execution
 * const results = await parallel([
 *   async () => fetch("/api/users").then(r => r.json()),
 *   async () => fetch("/api/posts").then(r => r.json()),
 *   async () => fetch("/api/comments").then(r => r.json())
 * ])
 * // All three requests run concurrently
 * console.log(results) // [users, posts, comments]
 *
 * // With different return types
 * const mixed = await parallel([
 *   async () => "string result",
 *   async () => 42,
 *   async () => ({ key: "value" }),
 *   async () => [1, 2, 3]
 * ])
 * // ["string result", 42, { key: "value" }, [1, 2, 3]]
 *
 * // Error handling - fails fast on first rejection
 * try {
 *   await parallel([
 *     async () => delay(100)("first"),
 *     async () => { throw new Error("Failed!") },
 *     async () => delay(200)("third")
 *   ])
 * } catch (err) {
 *   console.error(err.message) // "Failed!"
 * }
 *
 * // Database queries in parallel
 * const [user, posts, comments] = await parallel([
 *   async () => db.users.findById(userId),
 *   async () => db.posts.findByUserId(userId),
 *   async () => db.comments.findByUserId(userId)
 * ])
 *
 * // File operations in parallel
 * const processFiles = async (paths: Array<string>) => {
 *   const tasks = paths.map(path =>
 *     async () => readFile(path).then(processContent)
 *   )
 *   return parallel(tasks)
 * }
 *
 * // Parallel with timeout using race
 * const parallelWithTimeout = async <T>(
 *   tasks: Array<() => Promise<T>>,
 *   timeoutMs: number
 * ): Promise<Array<T>> => {
 *   const timeout = delayReject(timeoutMs)(
 *     new Error(`Timeout after ${timeoutMs}ms`)
 *   )
 *   return Promise.race([parallel(tasks), timeout])
 * }
 *
 * // Empty array returns empty results
 * const empty = await parallel([])
 * console.log(empty) // []
 * ```
 */
const parallel = async <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<Array<T>> => {
	// Handle empty array
	if (tasks.length === 0) {
		return []
	}

	// Execute all tasks concurrently
	// Map each function to its invocation, creating promises
	const promises = tasks.map((task) => task())

	// Wait for all promises to resolve
	return Promise.all(promises)
}

export default parallel
