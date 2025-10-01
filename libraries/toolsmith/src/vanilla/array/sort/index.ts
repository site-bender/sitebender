//++ Sorts array with optional comparator
const sort = <T>(
	compareFn?: (a: T, b: T) => number,
) =>
(array: Array<T>): Array<T> => [...array].sort(compareFn)

export default sort
