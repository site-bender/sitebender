//++ Flips the first two arguments of a function, useful for creating variations with reversed parameter order
const flip = <A, B, Rest extends ReadonlyArray<unknown>, R>(
	fn: (a: A, b: B, ...rest: Rest) => R,
) =>
(b: B, a: A, ...rest: Rest): R => fn(a, b, ...rest)

export default flip
