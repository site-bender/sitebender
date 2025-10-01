//++ Tests if any element satisfies predicate
const some = <T>(
	predicate: (value: T, index: number, array: Array<T>) => boolean,
) =>
(array: Array<T>): boolean => array.some(predicate)

export default some
