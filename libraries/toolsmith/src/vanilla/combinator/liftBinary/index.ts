//++ Lifts a binary function to work with functors pairwise (zipWith behavior), applying the function to corresponding elements at the same index
const liftBinary = <A, B, R>(
	fn: (a: A, b: B) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
): Array<R> => {
	const minLength = Math.min(fa.length, fb.length)
	return Array.from({ length: minLength }, (_, i) => fn(fa[i], fb[i]))
}


export default liftBinary
