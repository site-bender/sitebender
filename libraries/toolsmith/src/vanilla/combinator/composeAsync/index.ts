//++ Asynchronous function composition utility that composes async functions right-to-left (mathematical composition)
const composeAsync = <T, R = unknown>(
	fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>> = [],
) =>
(input: T): Promise<R> =>
	fns.reduceRight<Promise<unknown>>(
		(resultPromise, fn) => resultPromise.then((val) => fn(val)),
		Promise.resolve(input as unknown),
	) as Promise<R>

export default composeAsync
