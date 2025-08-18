/**
 * Executes an array of async functions sequentially, collecting their results
 * 
 * Runs async functions one after another in order, waiting for each to complete
 * before starting the next. Returns an array of all results in the same order
 * as the input functions. If any function rejects, the entire operation stops
 * and rejects immediately. Useful for operations that must happen in sequence
 * or when later operations depend on earlier ones completing.
 * 
 * @param tasks - Array of async functions to execute in series
 * @returns Promise resolving to array of results in the same order as input
 * @example
 * ```typescript
 * // Basic sequential execution
 * const results = await series([
 *   async () => { console.log("First"); return 1 },
 *   async () => { console.log("Second"); return 2 },
 *   async () => { console.log("Third"); return 3 }
 * ])
 * // Output: "First", "Second", "Third" (in order)
 * console.log(results) // [1, 2, 3]
 * 
 * // Timing demonstration with delays
 * import delay from "../delay/index.ts"
 * 
 * const start = Date.now()
 * const results = await series([
 *   async () => { await delay(1000)(); return "1s" },
 *   async () => { await delay(1000)(); return "2s" },
 *   async () => { await delay(1000)(); return "3s" }
 * ])
 * console.log(`Took ${Date.now() - start}ms`) // ~3000ms (sequential)
 * console.log(results) // ["1s", "2s", "3s"]
 * 
 * // Compare with parallel execution
 * import parallel from "../parallel/index.ts"
 * 
 * // Series: 3 seconds total
 * await series([
 *   async () => delay(1000)("a"),
 *   async () => delay(1000)("b"),
 *   async () => delay(1000)("c")
 * ]) // Takes 3000ms
 * 
 * // Parallel: 1 second total
 * await parallel([
 *   async () => delay(1000)("a"),
 *   async () => delay(1000)("b"),
 *   async () => delay(1000)("c")
 * ]) // Takes 1000ms
 * 
 * // Empty array returns empty results
 * const empty = await series([])
 * console.log(empty) // []
 * 
 * // Error handling - stops on first error
 * try {
 *   await series([
 *     async () => "first",
 *     async () => { throw new Error("Failed!") },
 *     async () => "never runs"
 *   ])
 * } catch (err) {
 *   console.error(err.message) // "Failed!"
 *   // Third function never executes
 * }
 * 
 * // Database migrations in order
 * const runMigrations = async () => {
 *   return series([
 *     async () => {
 *       console.log("Creating users table...")
 *       await db.exec("CREATE TABLE users...")
 *       return "users table created"
 *     },
 *     async () => {
 *       console.log("Creating posts table...")
 *       await db.exec("CREATE TABLE posts... REFERENCES users...")
 *       return "posts table created"
 *     },
 *     async () => {
 *       console.log("Creating indexes...")
 *       await db.exec("CREATE INDEX...")
 *       return "indexes created"
 *     }
 *   ])
 * }
 * 
 * // Step-by-step file processing
 * const processFile = async (filePath: string) => {
 *   const results = await series([
 *     async () => {
 *       console.log("Reading file...")
 *       return readFile(filePath)
 *     },
 *     async () => {
 *       console.log("Validating content...")
 *       return validateContent(results[0]) // Can't access results here!
 *     },
 *     async () => {
 *       console.log("Processing data...")
 *       return processData(results[1]) // Can't access results here!
 *     }
 *   ])
 *   return results[2]
 * }
 * 
 * // Better: Use waterfall for dependent operations
 * // Or store intermediate results externally
 * const processFileCorrect = async (filePath: string) => {
 *   let content: string
 *   let validated: any
 *   
 *   await series([
 *     async () => { content = await readFile(filePath) },
 *     async () => { validated = await validateContent(content) },
 *     async () => { return processData(validated) }
 *   ])
 * }
 * 
 * // Animation sequence
 * const animateElements = async () => {
 *   await series([
 *     async () => {
 *       element1.classList.add("fade-in")
 *       await delay(300)()
 *     },
 *     async () => {
 *       element2.classList.add("slide-in")
 *       await delay(300)()
 *     },
 *     async () => {
 *       element3.classList.add("scale-up")
 *       await delay(300)()
 *     }
 *   ])
 *   console.log("Animation sequence complete")
 * }
 * 
 * // Build pipeline
 * const buildProject = async () => {
 *   const results = await series([
 *     async () => {
 *       console.log("Cleaning build directory...")
 *       await cleanBuildDir()
 *       return "cleaned"
 *     },
 *     async () => {
 *       console.log("Compiling TypeScript...")
 *       await compileTypeScript()
 *       return "compiled"
 *     },
 *     async () => {
 *       console.log("Bundling assets...")
 *       await bundleAssets()
 *       return "bundled"
 *     },
 *     async () => {
 *       console.log("Running tests...")
 *       await runTests()
 *       return "tested"
 *     },
 *     async () => {
 *       console.log("Creating distribution...")
 *       await createDist()
 *       return "distributed"
 *     }
 *   ])
 *   
 *   console.log("Build steps completed:", results)
 * }
 * 
 * // Sequential API calls where order matters
 * const createUserWithProfile = async (userData: UserData) => {
 *   const results = await series([
 *     async () => {
 *       // Must create user first
 *       const user = await api.createUser(userData)
 *       return user.id
 *     },
 *     async () => {
 *       // Then create profile with user ID
 *       const profile = await api.createProfile(results[0]) // Note: can't access
 *       return profile.id
 *     },
 *     async () => {
 *       // Finally, send welcome email
 *       await api.sendWelcomeEmail(results[0]) // Note: can't access
 *       return "email sent"
 *     }
 *   ])
 * }
 * 
 * // Rate-limited operations
 * const rateLimitedFetch = async (urls: Array<string>) => {
 *   const tasks = urls.map(url => 
 *     async () => {
 *       const result = await fetch(url)
 *       await delay(1000)() // Wait 1 second between requests
 *       return result.json()
 *     }
 *   )
 *   
 *   return series(tasks)
 * }
 * 
 * // Transaction-like operations
 * const transferFunds = async (from: string, to: string, amount: number) => {
 *   try {
 *     await series([
 *       async () => {
 *         console.log("Checking balance...")
 *         const balance = await checkBalance(from)
 *         if (balance < amount) throw new Error("Insufficient funds")
 *       },
 *       async () => {
 *         console.log("Debiting account...")
 *         await debitAccount(from, amount)
 *       },
 *       async () => {
 *         console.log("Crediting account...")
 *         await creditAccount(to, amount)
 *       },
 *       async () => {
 *         console.log("Recording transaction...")
 *         await recordTransaction(from, to, amount)
 *       }
 *     ])
 *     console.log("Transfer complete")
 *   } catch (err) {
 *     console.error("Transfer failed:", err)
 *     // Rollback logic here
 *   }
 * }
 * 
 * // Testing with series
 * const runTestSuite = async () => {
 *   const results = await series([
 *     async () => {
 *       console.log("Setting up test environment...")
 *       await setupTestEnv()
 *       return "setup complete"
 *     },
 *     async () => {
 *       console.log("Running unit tests...")
 *       const unitResults = await runUnitTests()
 *       return { unit: unitResults }
 *     },
 *     async () => {
 *       console.log("Running integration tests...")
 *       const integrationResults = await runIntegrationTests()
 *       return { integration: integrationResults }
 *     },
 *     async () => {
 *       console.log("Cleaning up...")
 *       await cleanupTestEnv()
 *       return "cleanup complete"
 *     }
 *   ])
 *   
 *   return results
 * }
 * 
 * // Conditional execution
 * const conditionalSeries = async (condition: boolean) => {
 *   const tasks = [
 *     async () => "always runs",
 *     ...(condition ? [async () => "conditional task"] : []),
 *     async () => "also always runs"
 *   ]
 *   
 *   return series(tasks)
 * }
 * 
 * // With different return types
 * const mixedTypes = await series([
 *   async () => "string",
 *   async () => 123,
 *   async () => ({ key: "value" }),
 *   async () => [1, 2, 3]
 * ])
 * // Results: ["string", 123, { key: "value" }, [1, 2, 3]]
 * 
 * // Progress tracking
 * const seriesWithProgress = async <T>(
 *   tasks: Array<() => Promise<T>>,
 *   onProgress?: (completed: number, total: number) => void
 * ): Promise<Array<T>> => {
 *   const results: Array<T> = []
 *   const total = tasks.length
 *   
 *   for (let i = 0; i < tasks.length; i++) {
 *     results.push(await tasks[i]())
 *     onProgress?.(i + 1, total)
 *   }
 *   
 *   return results
 * }
 * 
 * // Type preservation
 * const typedTasks = [
 *   async () => "string" as const,
 *   async () => 123 as const,
 *   async () => true as const
 * ]
 * const typedResults = await series(typedTasks)
 * // TypeScript knows: Array<"string" | 123 | true>
 * ```
 * @property Sequential - Functions execute one after another
 * @property Order-preserving - Results maintain input order
 * @property Fail-fast - Stops and rejects on first error
 */
const series = async <T>(
	tasks: ReadonlyArray<() => Promise<T>>
): Promise<Array<T>> => {
	// Handle empty array
	if (tasks.length === 0) {
		return []
	}
	
	// Execute tasks sequentially, collecting results
	const results: Array<T> = []
	
	for (const task of tasks) {
		try {
			const result = await task()
			results.push(result)
		} catch (error) {
			// Fail fast on first error
			throw error
		}
	}
	
	return results
}

export default series