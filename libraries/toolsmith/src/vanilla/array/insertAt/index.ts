//++ Inserts an item at a specific index
const insertAt =
	(index: number) => <T>(item: T) => (array: Array<T>): Array<T> =>
		index >= 0 && index <= array.length
			? [...array.slice(0, index), item, ...array.slice(index)]
			: array

export default insertAt
