import isNotUndefined from "../../validation/isNotUndefined/index.ts"
import isUndefined from "../../validation/isUndefined/index.ts"

//++ Returns a throttled version of a function that only invokes at most once per wait milliseconds
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
