//++ Maps and flattens in a single pass
const flatMap = <T, U>(
	fn: (item: T, index: number, array: Array<T>) => U | ReadonlyArray<U>,
) =>
(array: Array<T>): Array<U> => array.flatMap(fn)


export default flatMap
