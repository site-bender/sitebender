/**
 * Async version of pipe for Promise-returning functions
 * Composes async functions left-to-right with automatic promise handling
 *
 * @param fns - Array of async functions to compose
 * @returns Async function that applies all functions in sequence
 * @example
 * ```typescript
 * // Chain async operations
 * const fetchUser = async (id: number) => {
 *   const response = await fetch(`/api/users/${id}`)
 *   return response.json()
 * }
 *
 * const addTimestamp = async (user: any) => ({
 *   ...user,
 *   fetchedAt: Date.now()
 * })
 *
 * const logUser = async (user: any) => {
 *   console.log("User:", user)
 *   return user
 * }
 *
 * const getUserWithLogging = pipeAsync([
 *   fetchUser,
 *   addTimestamp,
 *   logUser
 * ])
 *
 * await getUserWithLogging(123) // Fetches, adds timestamp, logs, returns user
 *
 * // Mix sync and async functions
 * const process = pipeAsync([
 *   async (x: number) => x * 2,
 *   (x: number) => x + 10, // Sync function, automatically awaited
 *   async (x: number) => {
 *     await new Promise(r => setTimeout(r, 100))
 *     return x * 3
 *   }
 * ])
 *
 * await process(5) // 60 ((5 * 2 + 10) * 3)
 *
 * // Error handling flows through the pipeline
 * const safeProcess = pipeAsync([
 *   async (x: number) => {
 *     if (x < 0) throw new Error("Negative not allowed")
 *     return x
 *   },
 *   async (x: number) => x * 2
 * ])
 *
 * try {
 *   await safeProcess(-5)
 * } catch (e) {
 *   console.error(e.message) // "Negative not allowed"
 * }
 *
 * // Database operations pipeline
 * const saveUser = pipeAsync([
 *   async (data: any) => validate(data),
 *   async (validated: any) => hashPassword(validated),
 *   async (withHash: any) => db.users.create(withHash),
 *   async (user: any) => sendWelcomeEmail(user),
 *   async (user: any) => ({ success: true, user })
 * ])
 *
 * // Empty pipeline returns identity
 * const identity = pipeAsync([])
 * await identity("hello") // "hello"
 * ```
 *
 * Note: Each function receives the resolved value from the previous promise.
 * Sync functions are automatically converted to async.
 */
// deno-lint-ignore no-explicit-any
const pipeAsync =
	<T>(fns: ReadonlyArray<(value: any) => any | Promise<any>> = []) =>
	async (input: T): Promise<any> => {
		let result: any = input
		for (const fn of fns) {
			result = await fn(result)
		}
		return result
	}

export default pipeAsync
