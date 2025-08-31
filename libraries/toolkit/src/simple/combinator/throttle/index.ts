import isUndefined from "../../validation/isUndefined/index.ts"
import isNotUndefined from "../../validation/isNotUndefined/index.ts"

/**
 * Returns a throttled version of a function that only invokes
 * at most once per wait milliseconds
 *
 * @impure Uses timers and maintains internal state
 * @param wait - Minimum milliseconds between invocations
 * @param fn - Function to throttle
 * @returns Throttled function with cancel method
 * @example
 * ```typescript
 * const logScroll = (event: Event) => {
 *   console.log("Scrolled at:", Date.now())
 * }
 *
 * const throttled = throttle(1000, logScroll)
 *
 * // Rapid calls - executes immediately, then at most once per second
 * throttled(event1) // Executes immediately
 * throttled(event2) // Ignored (too soon)
 * throttled(event3) // Ignored (too soon)
 * // After 1000ms passes
 * throttled(event4) // Executes
 * ```
 *
 * Note: Unlike debounce, throttle executes immediately on first call,
 * then limits subsequent calls to once per wait period.
 */
const throttle = <T extends ReadonlyArray<unknown>, R>(
	wait: number,
	fn: (...args: T) => R,
): ((...args: T) => R | void) & { cancel: () => void } => {
	let lastCallTime: number | undefined
	let timeoutId: number | undefined
	let lastArgs: T | undefined

	const throttled = (...args: T): R | void => {
		const now = Date.now()

		if (isUndefined(lastCallTime) || now - lastCallTime >= wait) {
			// Execute immediately if enough time has passed
			lastCallTime = now
			if (isNotUndefined(timeoutId)) {
				clearTimeout(timeoutId)
				timeoutId = undefined
			}
			return fn(...args)
		} else {
			// Store args for delayed execution
			lastArgs = args
			if (isUndefined(timeoutId)) {
				const remaining = wait - (now - lastCallTime)
				timeoutId = setTimeout(() => {
					lastCallTime = Date.now()
					timeoutId = undefined
					if (isNotUndefined(lastArgs)) {
						fn(...lastArgs)
						lastArgs = undefined
					}
				}, remaining)
			}
		}
	}

	throttled.cancel = (): void => {
		if (isNotUndefined(timeoutId)) {
			clearTimeout(timeoutId)
			timeoutId = undefined
		}
		lastCallTime = undefined
		lastArgs = undefined
	}

	return throttled
}

export default throttle
