//++ Lifts a binary function to work with applicative functors, applying it to all combinations of elements from both arrays (Cartesian product)
const liftA2 = <A, B, R>(
	fn: (a: A, b: B) => R,
) =>
(
	fa: ReadonlyArray<A>,
) =>
(
	fb: ReadonlyArray<B>,
): Array<R> => fa.flatMap((a) => fb.map((b) => fn(a, b)))

export default liftA2
