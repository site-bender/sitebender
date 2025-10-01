//++ Adds a time limit to any Promise
const timeout = (milliseconds: number) =>
<E = Error>(
	error?: E,
) =>
<T>(
	promise: Promise<T>,
): Promise<T> => {
	// Validate input
	if (milliseconds < 0 || !Number.isFinite(milliseconds)) {
		return Promise.reject(
			new Error(
				`Invalid timeout: ${milliseconds}ms. Must be a non-negative finite number.`,
			),
		)
	}

	// Create timeout promise
	const timeoutPromise = new Promise<never>((_, reject) => {
		setTimeout(() => {
			const timeoutError = error ??
				new Error(`Operation timed out after ${milliseconds}ms`)
			reject(timeoutError)
		}, milliseconds)
	})

	// Race the original promise against the timeout
	return Promise.race([promise, timeoutPromise])
}

export default timeout
