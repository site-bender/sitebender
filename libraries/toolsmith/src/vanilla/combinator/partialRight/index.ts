//++ Like partial but fixes arguments from the right, returning a new function that takes the initial arguments
const partialRight =
	<T extends ReadonlyArray<unknown>, U extends ReadonlyArray<unknown>, R>(
		fn: (...args: [...T, ...U]) => R,
		...fixedArgs: U
	) =>
	(...initialArgs: T): R => fn(...initialArgs, ...fixedArgs)


export default partialRight
