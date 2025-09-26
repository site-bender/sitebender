// (JSDoc removed in favor of Envoy)
//++ concat(first)(second) — returns new array: first elements then second
const concat = <T>(first: Array<T>) => (second: Array<T>): Array<T> =>
	first.concat(second)

export default concat

//?? [EXAMPLE] `concat([1,2])([3,4]) // [1,2,3,4]`
//?? [EXAMPLE] `concat([])([1,2]) // [1,2]`
