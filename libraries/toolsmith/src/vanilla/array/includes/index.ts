//++ Check if an array contains a specific value using strict equality; curried
//?? includes(3)([1, 2, 3, 4]) // true
//?? includes("hello")(["hi", "bye"]) // false
//?? includes(0)([0, false, null]) // true
const includes = <T>(item: T) => (array: Array<T>): boolean =>
	array.includes(item)

export default includes
