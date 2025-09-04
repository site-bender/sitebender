/**
 * Async version of pipe for Promise-returning functions
 * Composes async functions left-to-right with automatic promise handling
 *
 * @pure
 * @param fns - Array of async functions to compose
 * @returns Async function that applies all functions in sequence
 * @example
 * ```typescript
 * // Chain async operations
 * const fetchUser = async (id: number) => ({ id, name: "Alice" })
 * const addTimestamp = async (user: any) => ({
 *   ...user,
 *   fetchedAt: Date.now()
 * })
 *
 * const getUserWithTimestamp = pipeAsync([
 *   fetchUser,
 *   addTimestamp
 * ])
 *
 * await getUserWithTimestamp(123) // { id: 123, name: "Alice", fetchedAt: ... }
 *
 * // Mix sync and async functions
 * const process = pipeAsync([
 *   async (x: number) => x * 2,
 *   (x: number) => x + 10
 * ])
 *
 * await process(5) // 20
 * ```
 *
 * Note: Each function receives the resolved value from the previous promise.
 * Sync functions are automatically converted to async.
 */
const pipeAsync =
	<T, R = unknown>(
		fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>> = [],
	) =>
	(input: T): Promise<R> =>
		fns.reduce<Promise<unknown>>(
			(acc, fn) => acc.then((val) => fn(val)),
			Promise.resolve(input as unknown),
		) as Promise<R>

export default pipeAsync
