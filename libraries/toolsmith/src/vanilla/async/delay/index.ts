//++ Delays execution for a specified duration
const delay = (milliseconds: number) =>
<T = void>(
	value?: T,
): Promise<T> => {
	// Validate input
	if (milliseconds < 0 || !Number.isFinite(milliseconds)) {
		return Promise.reject(
			new Error(
				`Invalid delay: ${milliseconds}ms. Must be a non-negative finite number.`,
			),
		)
	}

	// Return a Promise that resolves after the specified delay
	return new Promise<T>((resolve) => {
		setTimeout(() => {
			resolve(value as T)
		}, milliseconds)
	})
}

export default delay
