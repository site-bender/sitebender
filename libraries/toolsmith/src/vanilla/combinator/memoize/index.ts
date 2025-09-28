//++ Returns a memoized version of a function that caches results using JSON.stringify for cache key generation by default
// deno-lint-ignore no-explicit-any
const memoize = <T extends ReadonlyArray<any>, R>(
	fn: (...args: T) => R,
): ((...args: T) => R) & { clear: () => void } => {
	const cache = new Map<string, R>()

	const memoized = (...args: T): R => {
		const key = JSON.stringify(args)
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

//?? [EXAMPLE] memoizedFib(40) // Calculates result
//?? [EXAMPLE] memoizedFib(40) // Returns cached result instantly
//?? [EXAMPLE] memoizedAdd(2, 3) // Logs "Computing...", returns 5
//?? [EXAMPLE] memoizedAdd(2, 3) // Returns 5 from cache, no log
//?? [EXAMPLE] memoizedAdd.clear() // Clears cache
/*??
 | [EXAMPLE]
 | ```typescript
 | const fibonacci = (n: number): number =>
 |   n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2)
 |
 | const memoizedFib = memoize(fibonacci)
 | memoizedFib(40) // Calculates result
 | memoizedFib(40) // Returns cached result instantly
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | // Works with multiple arguments
 | const add = (a: number, b: number) => {
 |   console.log("Computing...")
 |   return a + b
 | }
 | const memoizedAdd = memoize(add)
 | memoizedAdd(2, 3) // Logs "Computing...", returns 5
 | memoizedAdd(2, 3) // Returns 5 from cache, no log
 |
 | // Can clear cache
 | memoizedAdd.clear()
 | memoizedAdd(2, 3) // Logs "Computing..." again
 | ```
 |
 | [GOTCHA]
 | Uses JSON.stringify for cache keys, which may not work well
 | with circular references or non-serializable values. Use memoizeWith
 | for custom cache key generation.
 */

export default memoize
