// (JSDoc removed in favor of Envoy)
//++ Concatenates two arrays
const concat = <T>(first: Array<T>) => (second: Array<T>): Array<T> =>
	first.concat(second)

export default concat

//?? [EXAMPLE] `concat([1,2])([3,4]) // [1,2,3,4]`
//?? [EXAMPLE] `concat([])([1,2]) // [1,2]`
