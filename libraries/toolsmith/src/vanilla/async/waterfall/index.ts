import isEmpty from "../../array/isEmpty/index.ts"

//++ Pipes async functions, passing results through a chain
const waterfall =
	<I, O = I>(initial: I) =>
	async <T extends ReadonlyArray<(arg: Awaited<I>) => Promise<unknown>>>(
		tasks: T,
	): Promise<
		T extends ReadonlyArray<(...args: unknown[]) => Promise<infer R>> ? R
			: Awaited<I>
	> => {
		// Handle empty array - return initial value
		if (isEmpty(tasks)) {
			return initial as unknown as T extends ReadonlyArray<
				(...args: unknown[]) => Promise<infer R>
			> ? R
				: Awaited<I>
		}

		// Execute tasks in sequence using typed reduce
		const result = await tasks.reduce<Promise<unknown>>(
			async (prevPromise, task) => {
				const prev = await prevPromise as Awaited<I>
				return task(prev)
			},
			Promise.resolve(initial as Awaited<I>),
		)

		return result as T extends ReadonlyArray<
			(...args: unknown[]) => Promise<infer R>
		> ? R
			: Awaited<I>
	}

export default waterfall
