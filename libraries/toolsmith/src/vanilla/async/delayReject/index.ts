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

//?? [EXAMPLE] `try { await delayReject(1000)() } catch (err) { /* Error: Timeout after 1000ms */ }`
//?? [EXAMPLE] `try { await delayReject(500)(new Error("Custom")) } catch (err) { /* "Custom" */ }`
//?? [EXAMPLE] `const timeout5s = delayReject(5000); await timeout5s(new Error("Too slow"))`
/*??
 | [EXAMPLE]
 | ```ts
 | // Timeout pattern with Promise.race
 | const fetchWithTimeout = async (url: string, timeoutMs = 5000) => {
 |   const timeout = delayReject(timeoutMs)(
 |     new Error(`Request timeout after ${timeoutMs}ms`)
 |   )
 |   return Promise.race([fetch(url), timeout])
 | }
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Testing error handling
 | const simulateFailure = delayReject(100)(
 |   new Error("Simulated network error")
 | )
 | try {
 |   await simulateFailure
 | } catch (err) {
 |   console.log("Error handled correctly")
 | }
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Staggered timeout rejections
 | const timeouts = [100, 200, 300].map(
 |   ms => delayReject(ms)(new Error(`Timeout at ${ms}ms`))
 | )
 | try {
 |   await Promise.race(timeouts)
 | } catch (err) {
 |   console.log(err.message) // "Timeout at 100ms"
 | }
 | ```
 */
