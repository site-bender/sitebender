//++ Async version of pipe for Promise-returning functions, composing async functions left-to-right with automatic promise handling
const pipeAsync = <T, R = unknown>(
	fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>> = [],
) =>
(input: T): Promise<R> =>
	fns.reduce<Promise<unknown>>(
		(acc, fn) => acc.then((val) => fn(val)),
		Promise.resolve(input as unknown),
	) as Promise<R>

export default pipeAsync
