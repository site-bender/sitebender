/**
 * Repeatedly executes an async function while a condition is true
 * 
 * Continuously executes an async function as long as the predicate returns true,
 * checking the condition before each iteration. Similar to a while loop but for
 * async operations. The function collects and returns all results from each
 * iteration. Useful for polling, pagination, or any operation that needs to
 * repeat until a condition is met.
 * 
 * @curried (predicate) => (fn) => Promise<Array<T>>
 * @param predicate - Function that returns true to continue, false to stop
 * @param fn - Async function to execute repeatedly
 * @returns Promise resolving to array of all results from each iteration
 * @example
 * ```typescript
 * // Basic counter example
 * let count = 0
 * const results = await whilst(
 *   () => count < 5
 * )(
 *   async () => {
 *     const current = count
 *     count++
 *     return current
 *   }
 * )
 * console.log(results) // [0, 1, 2, 3, 4]
 * console.log(count)   // 5
 * 
 * // Polling until condition is met
 * let status = "pending"
 * const pollResults = await whilst(
 *   () => status === "pending"
 * )(
 *   async () => {
 *     const response = await fetch("/api/job-status")
 *     const data = await response.json()
 *     status = data.status
 *     return data
 *   }
 * )
 * console.log("Job completed:", pollResults[pollResults.length - 1])
 * 
 * // Pagination example
 * let page = 1
 * let hasMore = true
 * const allData = await whilst(
 *   () => hasMore
 * )(
 *   async () => {
 *     const response = await fetch(`/api/data?page=${page}`)
 *     const data = await response.json()
 *     hasMore = data.hasNextPage
 *     page++
 *     return data.items
 *   }
 * )
 * const flattenedData = allData.flat()
 * console.log(`Fetched ${flattenedData.length} items across ${page - 1} pages`)
 * 
 * // Reading chunks from a stream
 * const reader = stream.getReader()
 * let done = false
 * const chunks = await whilst(
 *   () => !done
 * )(
 *   async () => {
 *     const result = await reader.read()
 *     done = result.done
 *     return result.value
 *   }
 * )
 * const completeData = chunks.filter(Boolean) // Remove undefined from done
 * 
 * // Retry with condition
 * let attempts = 0
 * const maxAttempts = 5
 * let success = false
 * 
 * const retryResults = await whilst(
 *   () => !success && attempts < maxAttempts
 * )(
 *   async () => {
 *     attempts++
 *     try {
 *       const result = await riskyOperation()
 *       success = true
 *       return { attempt: attempts, result }
 *     } catch (error) {
 *       return { attempt: attempts, error: error.message }
 *     }
 *   }
 * )
 * 
 * if (success) {
 *   console.log("Succeeded on attempt", attempts)
 * } else {
 *   console.log("Failed after", maxAttempts, "attempts")
 * }
 * 
 * // Process queue until empty
 * const queue = [1, 2, 3, 4, 5]
 * const processed = await whilst(
 *   () => queue.length > 0
 * )(
 *   async () => {
 *     const item = queue.shift()
 *     const result = await processItem(item)
 *     return { item, result }
 *   }
 * )
 * console.log("Processed all items:", processed)
 * 
 * // Generate sequence until condition
 * let fibonacci = [0, 1]
 * const sequence = await whilst(
 *   () => {
 *     const last = fibonacci[fibonacci.length - 1]
 *     return last < 1000
 *   }
 * )(
 *   async () => {
 *     const len = fibonacci.length
 *     const next = fibonacci[len - 1] + fibonacci[len - 2]
 *     fibonacci.push(next)
 *     return next
 *   }
 * )
 * console.log("Fibonacci sequence:", fibonacci)
 * 
 * // Exponential backoff polling
 * import delay from "../delay/index.ts"
 * 
 * let pollCount = 0
 * let found = false
 * const searchResults = await whilst(
 *   () => !found && pollCount < 10
 * )(
 *   async () => {
 *     pollCount++
 *     const waitTime = Math.min(1000 * Math.pow(2, pollCount - 1), 30000)
 *     await delay(waitTime)()
 *     
 *     const response = await fetch("/api/search-status")
 *     const data = await response.json()
 *     found = data.found
 *     
 *     return { attempt: pollCount, waitTime, data }
 *   }
 * )
 * 
 * // Database cursor iteration
 * const cursor = db.collection("users").find({})
 * let hasNext = await cursor.hasNext()
 * 
 * const users = await whilst(
 *   () => hasNext
 * )(
 *   async () => {
 *     const user = await cursor.next()
 *     hasNext = await cursor.hasNext()
 *     return user
 *   }
 * )
 * console.log(`Processed ${users.length} users`)
 * 
 * // Rate-limited API consumption
 * let rateLimitRemaining = 100
 * let items = []
 * 
 * const apiResults = await whilst(
 *   () => rateLimitRemaining > 0 && items.length < 1000
 * )(
 *   async () => {
 *     const response = await fetch("/api/items")
 *     rateLimitRemaining = parseInt(
 *       response.headers.get("X-RateLimit-Remaining") || "0"
 *     )
 *     const newItems = await response.json()
 *     items = items.concat(newItems)
 *     
 *     return {
 *       fetched: newItems.length,
 *       total: items.length,
 *       rateLimitRemaining
 *     }
 *   }
 * )
 * 
 * // Game loop
 * let gameRunning = true
 * let score = 0
 * 
 * const gameStates = await whilst(
 *   () => gameRunning
 * )(
 *   async () => {
 *     const input = await getUserInput()
 *     const state = updateGameState(input)
 *     score = state.score
 *     gameRunning = !state.gameOver
 *     
 *     return state
 *   }
 * )
 * console.log("Final score:", score)
 * 
 * // Directory traversal
 * const dirsToProcess = ["./src"]
 * const allFiles = []
 * 
 * await whilst(
 *   () => dirsToProcess.length > 0
 * )(
 *   async () => {
 *     const dir = dirsToProcess.shift()!
 *     const entries = await readdir(dir)
 *     
 *     for (const entry of entries) {
 *       const path = `${dir}/${entry.name}`
 *       if (entry.isDirectory()) {
 *         dirsToProcess.push(path)
 *       } else {
 *         allFiles.push(path)
 *       }
 *     }
 *     
 *     return { processed: dir, found: entries.length }
 *   }
 * )
 * console.log(`Found ${allFiles.length} files`)
 * 
 * // Condition with timeout
 * const startTime = Date.now()
 * const timeout = 30000 // 30 seconds
 * 
 * const timedResults = await whilst(
 *   () => {
 *     const elapsed = Date.now() - startTime
 *     return elapsed < timeout && !isComplete()
 *   }
 * )(
 *   async () => {
 *     return performWork()
 *   }
 * )
 * 
 * // Complex state machine
 * let state = "INIT"
 * const transitions = await whilst(
 *   () => state !== "DONE" && state !== "ERROR"
 * )(
 *   async () => {
 *     const previousState = state
 *     
 *     switch (state) {
 *       case "INIT":
 *         await initialize()
 *         state = "READY"
 *         break
 *       case "READY":
 *         await prepare()
 *         state = "PROCESSING"
 *         break
 *       case "PROCESSING":
 *         const result = await process()
 *         state = result.success ? "DONE" : "ERROR"
 *         break
 *     }
 *     
 *     return { from: previousState, to: state }
 *   }
 * )
 * console.log("State transitions:", transitions)
 * 
 * // Never executes if condition is initially false
 * const neverRuns = await whilst(
 *   () => false
 * )(
 *   async () => {
 *     console.log("This never executes")
 *     return "never"
 *   }
 * )
 * console.log(neverRuns) // []
 * 
 * // Infinite loop protection
 * let iterations = 0
 * const MAX_ITERATIONS = 1000
 * 
 * const safeResults = await whilst(
 *   () => {
 *     iterations++
 *     if (iterations > MAX_ITERATIONS) {
 *       throw new Error("Maximum iterations exceeded")
 *     }
 *     return shouldContinue()
 *   }
 * )(
 *   async () => {
 *     return doWork()
 *   }
 * )
 * 
 * // Type preservation
 * interface Result {
 *   id: number
 *   value: string
 * }
 * 
 * let id = 0
 * const typedResults = await whilst(
 *   () => id < 3
 * )(
 *   async (): Promise<Result> => {
 *     const result = { id, value: `item-${id}` }
 *     id++
 *     return result
 *   }
 * )
 * // TypeScript knows: Array<Result>
 * ```
 * @property Conditional - Executes only while predicate is true
 * @property Sequential - Each iteration waits for the previous to complete
 * @property Result-collecting - Returns array of all iteration results
 */
const whilst = <T>(
	predicate: () => boolean
) => async (
	fn: () => Promise<T>
): Promise<Array<T>> => {
	const results: Array<T> = []
	
	// Continue executing while predicate is true
	while (predicate()) {
		try {
			const result = await fn()
			results.push(result)
		} catch (error) {
			// Stop on error and re-throw
			throw error
		}
	}
	
	return results
}

export default whilst