//++ Applies an array of functions to a value and returns array of results - each function receives the same arguments and results are collected
const juxt = <T extends ReadonlyArray<unknown>, R>(
	fns: ReadonlyArray<(...args: T) => R>,
) =>
(...args: T): Array<R> => fns.map((fn) => fn(...args))

export default juxt
