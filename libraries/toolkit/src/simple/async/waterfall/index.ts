import isEmpty from "../../array/isEmpty/index.ts"

/**
 * Executes async functions in series, passing each result to the next function
 *
 * Runs a series of async functions where each function receives the result of
 * the previous function as its input. The first function receives the initial
 * value, and the final result is the output of the last function. This creates
 * a pipeline of async transformations. If any function rejects, the entire
 * operation stops and rejects immediately.
 *
 * @param initial - The initial value passed to the first function
 * @param tasks - Array of async functions that transform the previous result
 * @returns Promise resolving to the final transformed result
 * @curried
 * @impure
 * @example
 * ```typescript
 * // Basic waterfall pipeline
 * const result = await waterfall(5)([
 *   async (n) => n * 2,      // 10
 *   async (n) => n + 3,       // 13
 *   async (n) => n.toString() // "13"
 * ])
 * console.log(result) // "13"
 *
 * // Data processing pipeline
 * const processUser = await waterfall({ id: 123 })([
 *   async (user) => db.users.findById(user.id),
 *   async (user) => ({ ...user, posts: await db.posts.findByUserId(user.id) }),
 *   async (data) => ({ ...data, count: data.posts.length })
 * ])
 *
 * // File processing pipeline
 * const processFile = waterfall("/path/to/file.txt")([
 *   async (path) => readFile(path),
 *   async (content) => JSON.parse(content),
 *   async (data) => validateData(data),
 *   async (valid) => transformData(valid),
 *   async (transformed) => db.save(transformed)
 * ])
 *
 * // Mathematical operations pipeline
 * const calculate = waterfall(100)([
 *   async (n) => n / 2,        // 50
 *   async (n) => Math.sqrt(n),  // ~7.07
 *   async (n) => Math.floor(n), // 7
 *   async (n) => n ** 2,        // 49
 * ])
 *
 * // Error handling - stops on first error
 * try {
 *   await waterfall(10)([
 *     async (n) => n * 2,
 *     async () => { throw new Error("Failed!") },
 *     async (n) => n + 1   // Never runs
 *   ])
 * } catch (err) {
 *   console.error(err.message) // "Failed!"
 * }
 *
 * // Edge cases
 * waterfall("initial")([]) // Returns "initial"
 * waterfall(null)([async (x) => x]) // Returns null
 * ```
 */
const waterfall =
	<I, O = I>(initial: I) =>
	async <T extends ReadonlyArray<(arg: any) => Promise<any>>>(
		tasks: T,
	): Promise<
		T extends ReadonlyArray<(...args: any[]) => Promise<infer R>> ? R
			: O
	> => {
		// Handle empty array - return initial value
		if (isEmpty(tasks)) {
			return initial as any
		}

		// Execute tasks in sequence using reduce
		const result = await tasks.reduce(
			async (prevPromise, task) => {
				const prev = await prevPromise
				return task(prev)
			},
			Promise.resolve(initial),
		)

		return result
	}

export default waterfall
