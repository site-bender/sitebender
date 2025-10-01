//++ Lifts a ternary function to work with applicative functors, applying it to all combinations of elements from three arrays (Cartesian product)
const liftA3 = <A, B, C, R>(
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
): Array<R> => fa.flatMap((a) => fb.flatMap((b) => fc.map((c) => fn(a, b, c))))


export default liftA3
