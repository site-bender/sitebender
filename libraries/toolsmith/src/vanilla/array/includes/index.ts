//++ Check if an array contains a specific value using strict equality; curried
const includes = <T>(item: T) => (array: Array<T>): boolean =>
	array.includes(item)

export default includes

//?? [EXAMPLE] `includes(3)([1, 2, 3, 4])        // true`
//?? [EXAMPLE] `includes("hello")(["hi", "bye"]) // false`
//?? [EXAMPLE] `includes(0)([0, false, null])    // true`
