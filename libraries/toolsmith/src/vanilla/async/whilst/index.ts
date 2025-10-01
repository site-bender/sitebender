//++ Loops async operations while a condition holds
const whilst = <T>(
	predicate: () => boolean,
) =>
(
	fn: () => Promise<T>,
): Promise<Array<T>> => {
	// Recursive implementation to avoid while loop
	const iterate = async (acc: Array<T>): Promise<Array<T>> => {
		if (!predicate()) {
			return acc
		}

		const result = await fn()
		return iterate([...acc, result])
	}

	return iterate([])
}

export default whilst
