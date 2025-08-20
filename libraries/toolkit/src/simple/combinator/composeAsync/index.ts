/**
 * Asynchronous function composition utility
 * Composes async functions right-to-left (mathematical composition)
 *
 * @param fns - Array of async functions to compose
 * @returns Async function that applies all functions in reverse sequence
 * @example
 * ```typescript
 * const fetchUser = async (id: number) => ({ id, name: `User${id}` })
 * const getScore = async (user: { id: number }) => ({ ...user, score: user.id * 10 })
 * const formatResult = async (data: { score: number }) => `Score: ${data.score}`
 *
 * const composed = composeAsync([formatResult, getScore, fetchUser])
 * await composed(5) // "Score: 50"
 *
 * // Empty array returns identity function
 * const identity = composeAsync([])
 * await identity("hello") // "hello"
 * ```
 *
 * Note: TypeScript cannot properly type variadic async compose without extensive overloads.
 * The 'any' type here is justified for the same reasons as the sync compose function.
 */
// deno-lint-ignore no-explicit-any
const composeAsync =
	<T>(fns: ReadonlyArray<(value: any) => Promise<any>> = []) =>
	async (input: T): Promise<any> => {
		let result: any = input
		for (let i = fns.length - 1; i >= 0; i--) {
			result = await fns[i](result)
		}
		return result
	}

export default composeAsync
