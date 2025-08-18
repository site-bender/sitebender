/**
 * Ensures a function can only be called once
 * Subsequent calls return the result of the first invocation
 *
 * @param fn - Function to restrict to single invocation
 * @returns Function that executes only once with reset method
 * @example
 * ```typescript
 * let counter = 0
 * const increment = () => ++counter
 * const incrementOnce = once(increment)
 *
 * incrementOnce() // 1
 * incrementOnce() // 1 (returns cached result)
 * incrementOnce() // 1 (still returns first result)
 * counter // 1 (only incremented once)
 *
 * // Useful for initialization functions
 * const initialize = once(() => {
 *   console.log("Initializing...")
 *   return { config: "loaded" }
 * })
 *
 * const config1 = initialize() // Logs "Initializing...", returns config
 * const config2 = initialize() // Returns same config, no log
 * config1 === config2 // true
 *
 * // Can reset to allow another call
 * initialize.reset()
 * initialize() // Logs "Initializing..." again
 * ```
 *
 * Note: The function remembers its first result indefinitely unless reset.
 * Arguments passed to subsequent calls are ignored.
 */
// deno-lint-ignore no-explicit-any
const once = <T extends ReadonlyArray<any>, R>(
	fn: (...args: T) => R,
): ((...args: T) => R) & { reset: () => void } => {
	let called = false
	let result: R

	const onced = (...args: T): R => {
		if (!called) {
			called = true
			result = fn(...args)
		}
		return result
	}

	onced.reset = (): void => {
		called = false
		result = undefined as unknown as R
	}

	return onced
}

export default once
