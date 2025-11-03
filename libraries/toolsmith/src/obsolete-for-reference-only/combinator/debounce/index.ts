import isNotUndefined from "../../validation/isNotUndefined/index.ts"

//++ Returns a debounced version of a function that delays invoking until after wait milliseconds have elapsed since the last call
const debounce = <T extends ReadonlyArray<unknown>, R>(
	wait: number,
	fn: (...args: T) => R,
): ((...args: T) => void) & { cancel: () => void } => {
	let timeoutId: number | undefined

	const debounced = (...args: T): void => {
		if (isNotUndefined(timeoutId)) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			timeoutId = undefined
			fn(...args)
		}, wait)
	}

	debounced.cancel = (): void => {
		if (isNotUndefined(timeoutId)) {
			clearTimeout(timeoutId)
			timeoutId = undefined
		}
	}

	return debounced
}

export default debounce
