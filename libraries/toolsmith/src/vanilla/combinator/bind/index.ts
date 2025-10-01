//++ Creates a function bound to a specific context (this) - functional wrapper around Function.prototype.bind for method binding
const bind = <T, Args extends ReadonlyArray<unknown>, R>(
 	fn: (this: T, ...args: Args) => R,
 	context: T,
) =>
(...args: Args): R =>
	(fn as unknown as (...args: unknown[]) => R).apply(
		context as unknown,
		[...args] as unknown[],
	)


export default bind
