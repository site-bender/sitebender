//++ Drop the first n elements; negative n treated as 0; returns a new array
//?? drop(2)([1, 2, 3, 4, 5]) // [3, 4, 5]
//?? drop(0)([1, 2, 3]) // [1, 2, 3]
//?? drop(10)([1, 2, 3]) // []
//?? const skipHeader = drop(1); skipHeader(["header", "data1", "data2"]) // ["data1", "data2"]
const drop = <T>(n: number) => (array: Array<T>): Array<T> =>
	n <= 0 ? array : array.slice(n)

export default drop
