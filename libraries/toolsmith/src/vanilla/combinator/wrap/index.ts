//++ Wraps a function with a wrapper function, where the wrapper receives the original function as its first argument
// deno-lint-ignore no-explicit-any
const wrap = <T extends ReadonlyArray<any>, R>(
	fn: (...args: T) => R,
	wrapper: (fn: (...args: T) => R, ...args: T) => R,
) =>
(...args: T): R => wrapper(fn, ...args)


export default wrap
