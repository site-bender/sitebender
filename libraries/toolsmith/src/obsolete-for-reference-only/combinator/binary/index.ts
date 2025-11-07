//++ Wraps a function to accept exactly 2 arguments (equivalent to arity(2, fn) but more semantic)
const binary =
	<A, B, R>(fn: (a: A, b: B, ...rest: ReadonlyArray<unknown>) => R) =>
	(a: A, b: B): R => fn(a, b)

export default binary
