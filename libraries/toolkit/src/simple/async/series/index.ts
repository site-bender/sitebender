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
 * @impure
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
 * // Compare with parallel execution
 * // Series: 3 seconds total
 * await series([
 *   async () => delay(1000)("a"),
 *   async () => delay(1000)("b"),
 *   async () => delay(1000)("c")
 * ]) // Takes 3000ms sequential
 *
 * // Database migrations in order
 * const runMigrations = async () => {
 *   return series([
 *     async () => db.exec("CREATE TABLE users..."),
 *     async () => db.exec("CREATE TABLE posts... REFERENCES users..."),
 *     async () => db.exec("CREATE INDEX...")
 *   ])
 * }
 *
 * // Build pipeline
 * const buildProject = async () => {
 *   return series([
 *     async () => cleanBuildDir(),
 *     async () => compileTypeScript(),
 *     async () => bundleAssets(),
 *     async () => runTests()
 *   ])
 * }
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
 * }
 *
 * // Edge cases
 * series([]) // Returns []
 * series([async () => "single"]) // Returns ["single"]
 * ```
 */
const series = async <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<Array<T>> => {
	// Handle empty array
	if (tasks.length === 0) {
		return []
	}

	// Execute tasks sequentially using reduce
	const results = await tasks.reduce(
		async (accPromise, task) => {
			const acc = await accPromise
			const result = await task()
			return [...acc, result]
		},
		Promise.resolve([] as Array<T>),
	)

	return results
}

export default series
