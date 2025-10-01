//++ Executes async functions sequentially
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
