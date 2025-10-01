//++ Like pipe but uses a custom composition function, allowing custom logic for combining function results
const pipeWith = <T, R>(
	composer: (fn: (value: unknown) => unknown, value: unknown) => unknown,
	fns: ReadonlyArray<(value: unknown) => unknown> = [],
) =>
(input: T): R =>
	fns.reduce((acc, fn) => composer(fn, acc), input as unknown) as R


export default pipeWith
