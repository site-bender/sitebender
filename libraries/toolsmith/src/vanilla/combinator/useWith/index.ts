//++ Transforms arguments before passing to a function, applying transformer functions to corresponding arguments
const useWith = <R>(
	fn: (...args: ReadonlyArray<unknown>) => R,
	transformers: ReadonlyArray<(arg: unknown) => unknown>,
) =>
(...args: ReadonlyArray<unknown>): R => {
	const transformedArgs = args.map((arg, index) =>
		transformers[index] ? transformers[index](arg) : arg
	)
	return fn(...transformedArgs)
}


export default useWith
