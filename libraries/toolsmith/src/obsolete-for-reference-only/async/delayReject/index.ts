//++ Delays then rejects with an error
const delayReject = (milliseconds: number) =>
<E = Error>(
	error?: E,
): Promise<never> => {
	// Validate input
	if (milliseconds < 0 || !Number.isFinite(milliseconds)) {
		return Promise.reject(
			new Error(
				`Invalid delay: ${milliseconds}ms. Must be a non-negative finite number.`,
			),
		)
	}

	// Return a Promise that rejects after the specified delay
	return new Promise<never>((_, reject) => {
		setTimeout(() => {
			// Use provided error or create default timeout error
			const rejectionError = error ??
				new Error(`Timeout after ${milliseconds}ms`)
			reject(rejectionError)
		}, milliseconds)
	})
}

export default delayReject
