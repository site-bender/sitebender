//++ Checks if array contains a value
const includes = <T>(item: T) => (array: Array<T>): boolean =>
	array.includes(item)

export default includes
