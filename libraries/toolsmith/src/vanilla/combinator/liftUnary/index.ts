//++ Lifts a unary function to work with functors (standard map operation), applying the function to each element in an array
const liftUnary = <A, R>(
	fn: (a: A) => R,
) =>
(
	fa: ReadonlyArray<A>,
): Array<R> => {
	return fa.map(fn)
}


export default liftUnary
