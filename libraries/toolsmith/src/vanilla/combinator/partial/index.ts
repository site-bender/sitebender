//++ Partially applies a function with fixed arguments, returning a new function that takes the remaining arguments
// deno-lint-ignore no-explicit-any
const partial = <T extends ReadonlyArray<any>, U extends ReadonlyArray<any>, R>(
	fn: (...args: [...T, ...U]) => R,
	...fixedArgs: T
) =>
(...remainingArgs: U): R => fn(...fixedArgs, ...remainingArgs)

export default partial
