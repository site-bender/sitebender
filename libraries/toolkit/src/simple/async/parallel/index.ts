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
 * console.log(mixed) // ["string result", 42, { key: "value" }, [1, 2, 3]]
 *
 * // Empty array returns empty results
 * const empty = await parallel([])
 * console.log(empty) // []
 *
 * // Error handling - fails fast on first rejection
 * try {
 *   await parallel([
 *     async () => delay(100)("first"),
 *     async () => { throw new Error("Failed!") },
 *     async () => delay(200)("third")
 *   ])
 * } catch (err) {
 *   console.error(err.message) // "Failed!" - fails immediately
 * }
 *
 * // Timing comparison with sequential execution
 * import delay from "../delay/index.ts"
 *
 * // Parallel - takes 1 second total
 * const parallelStart = Date.now()
 * await parallel([
 *   async () => delay(1000)("a"),
 *   async () => delay(1000)("b"),
 *   async () => delay(1000)("c")
 * ])
 * console.log(`Parallel: ${Date.now() - parallelStart}ms`) // ~1000ms
 *
 * // Sequential - takes 3 seconds total
 * const sequentialStart = Date.now()
 * const a = await delay(1000)("a")
 * const b = await delay(1000)("b")
 * const c = await delay(1000)("c")
 * console.log(`Sequential: ${Date.now() - sequentialStart}ms`) // ~3000ms
 *
 * // Database queries in parallel
 * const fetchUserData = async (userId: number) => {
 *   const results = await parallel([
 *     async () => db.users.findById(userId),
 *     async () => db.posts.findByUserId(userId),
 *     async () => db.comments.findByUserId(userId),
 *     async () => db.likes.findByUserId(userId)
 *   ])
 *
 *   return {
 *     user: results[0],
 *     posts: results[1],
 *     comments: results[2],
 *     likes: results[3]
 *   }
 * }
 *
 * // File operations in parallel
 * const processFiles = async (filePaths: Array<string>) => {
 *   const tasks = filePaths.map(path =>
 *     async () => {
 *       const content = await readFile(path)
 *       return processContent(content)
 *     }
 *   )
 *   return parallel(tasks)
 * }
 *
 * // API calls with different endpoints
 * const fetchDashboardData = async () => {
 *   const [metrics, alerts, logs, status] = await parallel([
 *     async () => fetchMetrics(),
 *     async () => fetchAlerts(),
 *     async () => fetchLogs(),
 *     async () => fetchSystemStatus()
 *   ])
 *
 *   return { metrics, alerts, logs, status }
 * }
 *
 * // Parallel with timeout using race
 * import delayReject from "../delayReject/index.ts"
 *
 * const parallelWithTimeout = async <T>(
 *   tasks: Array<() => Promise<T>>,
 *   timeoutMs: number
 * ): Promise<Array<T>> => {
 *   const timeout = delayReject(timeoutMs)(
 *     new Error(`Parallel operations timeout after ${timeoutMs}ms`)
 *   )
 *   return Promise.race([parallel(tasks), timeout])
 * }
 *
 * // Conditional parallel execution
 * const conditionalTasks = await parallel([
 *   async () => shouldFetchUsers ? fetchUsers() : [],
 *   async () => shouldFetchPosts ? fetchPosts() : [],
 *   async () => shouldFetchComments ? fetchComments() : []
 * ])
 *
 * // Parallel with individual error handling
 * const parallelSafe = async <T>(
 *   tasks: Array<() => Promise<T>>
 * ): Promise<Array<T | Error>> => {
 *   const wrappedTasks = tasks.map(task =>
 *     async () => {
 *       try {
 *         return await task()
 *       } catch (err) {
 *         return err as Error
 *       }
 *     }
 *   )
 *   return parallel(wrappedTasks)
 * }
 *
 * // Parallel batch processing
 * const processBatch = async (items: Array<Item>) => {
 *   const processors = items.map(item =>
 *     async () => processItem(item)
 *   )
 *   return parallel(processors)
 * }
 *
 * // Parallel with progress tracking
 * const parallelWithProgress = async <T>(
 *   tasks: Array<() => Promise<T>>,
 *   onProgress?: (completed: number, total: number) => void
 * ): Promise<Array<T>> => {
 *   let completed = 0
 *   const total = tasks.length
 *
 *   const wrappedTasks = tasks.map(task =>
 *     async () => {
 *       const result = await task()
 *       completed++
 *       onProgress?.(completed, total)
 *       return result
 *     }
 *   )
 *
 *   return parallel(wrappedTasks)
 * }
 *
 * // Using with map for transformation
 * const urls = ["/api/1", "/api/2", "/api/3"]
 * const fetchers = urls.map(url =>
 *   async () => fetch(url).then(r => r.json())
 * )
 * const responses = await parallel(fetchers)
 *
 * // Nested parallel operations
 * const nestedParallel = await parallel([
 *   async () => parallel([
 *     async () => "nested1",
 *     async () => "nested2"
 *   ]),
 *   async () => parallel([
 *     async () => "nested3",
 *     async () => "nested4"
 *   ])
 * ])
 * console.log(nestedParallel) // [["nested1", "nested2"], ["nested3", "nested4"]]
 *
 * // Type preservation
 * const typedTasks = [
 *   async () => "string" as const,
 *   async () => 123 as const,
 *   async () => true as const
 * ]
 * const typedResults = await parallel(typedTasks)
 * // TypeScript knows: [string, number, boolean]
 * ```
 * @property Concurrent - All functions execute simultaneously
 * @property Order-preserving - Results maintain input order despite completion times
 * @property Fail-fast - Rejects immediately on first error
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
