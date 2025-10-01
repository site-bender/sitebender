//++ Wraps a function to accept exactly 1 argument (equivalent to arity(1, fn) but more semantic)
const unary =
	<T, R>(fn: (arg: T, ...rest: ReadonlyArray<unknown>) => R) => (arg: T): R =>
		fn(arg)


export default unary
