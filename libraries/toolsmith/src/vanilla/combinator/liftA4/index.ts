//++ Lifts a quaternary function to work with applicative functors, applying it to all combinations of elements from four arrays (Cartesian product)
const liftA4 = <A, B, C, D, R>(
	fn: (a: A, b: B, c: C, d: D) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
) =>
(
	fc: ReadonlyArray<C>,
) =>
(
	fd: ReadonlyArray<D>,
): Array<R> =>
	fa.flatMap((a) =>
		fb.flatMap((b) => fc.flatMap((c) => fd.map((d) => fn(a, b, c, d))))
	)


export default liftA4
