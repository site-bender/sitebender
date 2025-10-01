//++ Lifts a ternary function to work with functors element-wise (zipWith for three arrays), applying the function to corresponding elements at the same index
const liftTernary = <A, B, C, R>(
	fn: (a: A, b: B, c: C) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
) =>
(
	fc: ReadonlyArray<C>,
): Array<R> => {
	const minLength = Math.min(fa.length, fb.length, fc.length)
	return Array.from({ length: minLength }, (_, i) => fn(fa[i], fb[i], fc[i]))
}


export default liftTernary
