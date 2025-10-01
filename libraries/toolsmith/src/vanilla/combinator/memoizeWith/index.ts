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


export default memoizeWith
