import isEmpty from "../../array/isEmpty/index.ts"

//++ Executes async functions concurrently
const parallel = <T>(
	tasks: ReadonlyArray<() => Promise<T>>,
): Promise<Array<T>> => {
	// Handle empty array
	if (isEmpty(tasks)) {
		return Promise.resolve([] as Array<T>)
	}

	// Execute all tasks concurrently
	// Map each function to its invocation, creating promises
	const promises = tasks.map((task) => task())

	// Wait for all promises to resolve
	return Promise.all(promises)
}

export default parallel
