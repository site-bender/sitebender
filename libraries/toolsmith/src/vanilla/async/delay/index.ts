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

//?? [EXAMPLE] `await delay(1000)() // Wait 1 second`
//?? [EXAMPLE] `await delay(500)("Hello") // "Hello" after 500ms`
//?? [EXAMPLE] `const wait1Second = delay(1000); await wait1Second()`
/*??
 | [EXAMPLE]
 | ```ts
 | // Parallel delays
 | const results = await Promise.all([
 |   delay(100)("first"),
 |   delay(200)("second"),
 |   delay(300)("third")
 | ])
 | // ["first", "second", "third"] (after 300ms total)
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Timeout pattern with Promise.race
 | const timeout = delay(5000)(new Error("Timeout"))
 | const apiCall = fetch("/api/data").then(r => r.json())
 | const result = await Promise.race([apiCall, timeout])
 | ```
 |
 | [EXAMPLE]
 | ```ts
 | // Sequential processing with reduce
 | const items = ["a", "b", "c"]
 | await items.reduce(
 |   async (prev, item) => {
 |     await prev
 |     console.log(item)
 |     await delay(1000)()
 |   },
 |   Promise.resolve()
 | )
 | ```
 */
