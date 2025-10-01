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


export default memoize
