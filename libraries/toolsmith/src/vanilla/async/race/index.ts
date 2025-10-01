import isEmpty from "../../array/isEmpty/index.ts"

//++ Races async functions and returns the first to complete
const race = <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<T> => {
	// Handle empty array - this would never resolve
	if (isEmpty(tasks)) {
		throw new Error(
			"Cannot race an empty array of tasks - the Promise would never settle",
		)
	}

	// Handle single task
	if (tasks.length === 1) {
		return tasks[0]()
	}

	// Execute all tasks concurrently and race them
	const promises = tasks.map((task) => task())
	return Promise.race(promises)
}

export default race
