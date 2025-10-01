//++ Converts a function to a thunk (zero-argument function), delaying execution by wrapping in a parameterless function
const thunkify = <T extends ReadonlyArray<unknown>, R>(
	fn: (...args: T) => R,
	...args: T
): () => R =>
() => fn(...args)


export default thunkify
