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

//?? [EXAMPLE] `await timeout(3000)()(slowOperation) // Times out after 3s`
//?? [EXAMPLE] `const timeout5s = timeout(5000)(); await timeout5s(fetchData())`
//?? [EXAMPLE] `timeout(0)()(Promise.resolve("instant")) // Resolves immediately`
/*??
 | [EXAMPLE]
 | ```ts
 | // Basic timeout with default error
 | const slowOperation = delay(5000)("slow result")
 | try {
 |   const result = await timeout(3000)()(slowOperation)
 | } catch (err) {
 |   console.error(err.message) // "Operation timed out after 3000ms"
 | }
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Timeout with custom error
 | const withCustomError = timeout(2000)(
 |   new Error("API request took too long")
 | )
 | const response = await withCustomError(fetch("/api/slow"))
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Database operations with timeout
 | const queryWithTimeout = timeout(5000)(
 |   new Error("Database query timeout")
 | )
 | const result = await queryWithTimeout(db.query(sql))
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // API client with timeout
 | const apiGet = (url: string) =>
 |   timeout(3000)()(fetch(url).then(r => r.json()))
 | ```
 */
