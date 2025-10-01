//++ Ensures a function can only be called once, with subsequent calls returning the result of the first invocation
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
