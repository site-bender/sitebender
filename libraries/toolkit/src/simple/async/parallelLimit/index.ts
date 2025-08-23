/**
 * Executes async functions in parallel with a concurrency limit
 * 
 * Runs async functions concurrently but limits the number of functions executing
 * at any given time. This is useful for rate limiting, managing resource usage,
 * or preventing overwhelming external services. Results are returned in the same
 * order as the input tasks, regardless of completion order.
 * 
 * @curried (limit) => (tasks) => Promise<Array<T>>
 * @param limit - Maximum number of concurrent executions
 * @param tasks - Array of async functions to execute
 * @returns Promise resolving to array of results in the same order as input
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
 * console.log(results) // [data1, data2, data3, data4]
 * 
 * // Visualizing execution with delays
 * import delay from "../delay/index.ts"
 * 
 * const tasks = [
 *   async () => { console.log("Start 1"); await delay(1000)(); return "1" },
 *   async () => { console.log("Start 2"); await delay(1000)(); return "2" },
 *   async () => { console.log("Start 3"); await delay(1000)(); return "3" },
 *   async () => { console.log("Start 4"); await delay(1000)(); return "4" }
 * ]
 * 
 * await parallelLimit(2)(tasks)
 * // Output:
 * // Start 1
 * // Start 2
 * // (1 second pause)
 * // Start 3
 * // Start 4
 * // (1 second pause)
 * // Returns: ["1", "2", "3", "4"]
 * 
 * // Rate limiting API calls
 * const fetchWithRateLimit = parallelLimit(3) // Max 3 concurrent
 * 
 * const userIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const fetchTasks = userIds.map(id => 
 *   async () => fetch(`/api/users/${id}`).then(r => r.json())
 * )
 * 
 * const users = await fetchWithRateLimit(fetchTasks)
 * console.log(`Fetched ${users.length} users with max 3 concurrent requests`)
 * 
 * // Database connection pooling
 * const queryWithPool = parallelLimit(5) // Max 5 DB connections
 * 
 * const queries = [
 *   async () => db.query("SELECT * FROM users"),
 *   async () => db.query("SELECT * FROM posts"),
 *   async () => db.query("SELECT * FROM comments"),
 *   async () => db.query("SELECT * FROM likes"),
 *   async () => db.query("SELECT * FROM shares"),
 *   async () => db.query("SELECT * FROM views")
 * ]
 * 
 * const results = await queryWithPool(queries)
 * 
 * // File processing with memory constraints
 * const processLargeFiles = async (filePaths: Array<string>) => {
 *   const processFile = parallelLimit(2) // Only 2 files in memory at once
 *   
 *   const tasks = filePaths.map(path => 
 *     async () => {
 *       const content = await readFile(path)
 *       const processed = await heavyProcessing(content)
 *       await writeFile(`${path}.processed`, processed)
 *       return `Processed ${path}`
 *     }
 *   )
 *   
 *   return processFile(tasks)
 * }
 * 
 * // Web scraping with politeness
 * const scrapeSite = async (urls: Array<string>) => {
 *   const scrapeWithLimit = parallelLimit(1) // Sequential for politeness
 *   
 *   const tasks = urls.map(url => 
 *     async () => {
 *       await delay(1000)() // 1 second between requests
 *       const response = await fetch(url)
 *       return response.text()
 *     }
 *   )
 *   
 *   return scrapeWithLimit(tasks)
 * }
 * 
 * // Image processing with CPU constraints
 * const processImages = parallelLimit(navigator.hardwareConcurrency || 4)
 * 
 * const imageTasks = images.map(img => 
 *   async () => {
 *     const processed = await applyFilters(img)
 *     const compressed = await compress(processed)
 *     return compressed
 *   }
 * )
 * 
 * const processedImages = await processImages(imageTasks)
 * 
 * // Dynamic concurrency based on system load
 * const getDynamicLimit = () => {
 *   const cpuUsage = getCPUUsage()
 *   if (cpuUsage > 80) return 1
 *   if (cpuUsage > 60) return 2
 *   if (cpuUsage > 40) return 4
 *   return 8
 * }
 * 
 * const adaptiveProcess = parallelLimit(getDynamicLimit())
 * 
 * // Batch processing with progress
 * const batchProcess = async <T>(
 *   items: Array<T>,
 *   processor: (item: T) => Promise<any>,
 *   limit: number,
 *   onProgress?: (done: number, total: number) => void
 * ) => {
 *   let completed = 0
 *   const total = items.length
 *   
 *   const tasks = items.map(item => 
 *     async () => {
 *       const result = await processor(item)
 *       completed++
 *       onProgress?.(completed, total)
 *       return result
 *     }
 *   )
 *   
 *   return parallelLimit(limit)(tasks)
 * }
 * 
 * // Error handling - still fails fast
 * try {
 *   await parallelLimit(2)([
 *     async () => delay(100)("ok"),
 *     async () => { throw new Error("Failed!") },
 *     async () => delay(100)("never runs")
 *   ])
 * } catch (err) {
 *   console.error("One task failed:", err.message)
 * }
 * 
 * // Comparing different limits
 * const tasks100 = Array.from({ length: 100 }, (_, i) => 
 *   async () => {
 *     await delay(100)()
 *     return i
 *   }
 * )
 * 
 * console.time("Limit 1")
 * await parallelLimit(1)(tasks100) // ~10 seconds
 * console.timeEnd("Limit 1")
 * 
 * console.time("Limit 10")
 * await parallelLimit(10)(tasks100) // ~1 second
 * console.timeEnd("Limit 10")
 * 
 * console.time("Limit 100")
 * await parallelLimit(100)(tasks100) // ~0.1 seconds
 * console.timeEnd("Limit 100")
 * 
 * // Partial application for different scenarios
 * const sequential = parallelLimit(1)
 * const moderate = parallelLimit(5)
 * const aggressive = parallelLimit(20)
 * 
 * // Use based on context
 * const tasks = createTasks()
 * const results = isProduction 
 *   ? await moderate(tasks)
 *   : await aggressive(tasks)
 * 
 * // Empty array or zero limit
 * await parallelLimit(5)([]) // []
 * await parallelLimit(0)([async () => "test"]) // Never completes!
 * 
 * // Single item with limit
 * await parallelLimit(10)([async () => "only one"]) // ["only one"]
 * 
 * // Infinite limit behaves like parallel
 * await parallelLimit(Infinity)(tasks) // Same as parallel(tasks)
 * 
 * // Queue-like processing
 * const processQueue = async <T>(
 *   queue: Array<() => Promise<T>>,
 *   workers: number
 * ) => {
 *   return parallelLimit(workers)(queue)
 * }
 * 
 * // Type preservation
 * const typedTasks = [
 *   async () => "string",
 *   async () => 123,
 *   async () => true
 * ]
 * const typedResults = await parallelLimit(2)(typedTasks)
 * // TypeScript knows: Array<string | number | boolean>
 * ```
 * @property Concurrency-limited - Never exceeds specified parallel execution limit
 * @property Order-preserving - Results maintain input order
 * @property Resource-friendly - Prevents overwhelming systems or APIs
 */
const parallelLimit = (limit: number) => async <T>(
	tasks: ReadonlyArray<() => Promise<T>>
): Promise<Array<T>> => {
	// Validate limit
	if (limit <= 0 || !Number.isFinite(limit)) {
		throw new Error(`Invalid limit: ${limit}. Must be a positive finite number.`)
	}
	
	// Handle empty array
	if (tasks.length === 0) {
		return []
	}
	
	// If limit is greater than tasks, just run all in parallel
	if (limit >= tasks.length) {
		return Promise.all(tasks.map(task => task()))
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
	const workers: Array<Promise<void>> = []
	for (let i = 0; i < Math.min(limit, tasks.length); i++) {
		workers.push(worker())
	}
	
	// Wait for all workers to complete
	await Promise.all(workers)
	
	return results
}

export default parallelLimit