//++ Calls a function with individual arguments - functional wrapper for immediate function invocation
const call = <T extends ReadonlyArray<unknown>, R>(
 	fn: (...args: T) => R,
 	...args: T
): R => fn(...args)


export default call
