//++ Like memoize but uses a custom cache key generator, allowing control over how arguments are converted to cache keys
// deno-lint-ignore no-explicit-any
const memoizeWith = <T extends ReadonlyArray<any>, R>(
	keyGen: (...args: T) => string,
	fn: (...args: T) => R,
): ((...args: T) => R) & { clear: () => void } => {
	const cache = new Map<string, R>()

	const memoized = (...args: T): R => {
		const key = keyGen(...args)
		if (cache.has(key)) {
			return cache.get(key)!
		}
		const result = fn(...args)
		cache.set(key, result)
		return result
	}

	memoized.clear = (): void => {
		cache.clear()
	}

	return memoized
}

//?? [EXAMPLE] memoizedGetUser(1, true) // Logs "Fetching user 1"
//?? [EXAMPLE] memoizedGetUser(1, false) // Returns cached result, no log
//?? [EXAMPLE] memoizedProcess({ type: "user", id: 1 }) // Logs "Processing..."
//?? [EXAMPLE] memoizedProcess({ type: "user", id: 1 }) // Cached, no log
/*??
 | [EXAMPLE]
 | ```typescript
 | // Memoize using only the first argument as key
 | const getUser = (id: number, includeDetails: boolean) => {
 |   console.log(`Fetching user ${id}`)
 |   return { id, name: `User${id}`, details: includeDetails ? {} : null }
 | }
 | const memoizedGetUser = memoizeWith(
 |   (id: number) => String(id),
 |   getUser
 | )
 |
 | memoizedGetUser(1, true) // Logs "Fetching user 1"
 | memoizedGetUser(1, false) // Returns cached result, no log
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Custom key for complex objects
 | const processData = (config: { type: string; id: number }) => {
 |   console.log("Processing...")
 |   return `${config.type}-${config.id}`
 | }
 | const memoizedProcess = memoizeWith(
 |   (config) => `${config.type}:${config.id}`,
 |   processData
 | )
 |
 | memoizedProcess({ type: "user", id: 1 }) // Logs "Processing..."
 | memoizedProcess({ type: "user", id: 1 }) // Cached, no log
 | ```
 |
 | [GOTCHA]
 | The key generator receives the same arguments as the memoized function
 | and should return a string to use as the cache key.
 */

export default memoizeWith
