//++ Lifts a 5-ary function to work with applicative functors, applying it to all combinations of elements from five arrays (Cartesian product)
const liftA5 = <A, B, C, D, E, R>(
	fn: (a: A, b: B, c: C, d: D, e: E) => R,
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
) =>
(
	fe: ReadonlyArray<E>,
): Array<R> =>
	fa.flatMap((a) =>
		fb.flatMap((b) =>
			fc.flatMap((c) => fd.flatMap((d) => fe.map((e) => fn(a, b, c, d, e))))
		)
	)

export default liftA5
