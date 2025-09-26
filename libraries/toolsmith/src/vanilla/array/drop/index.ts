//++ Drops the first n elements from an array, returning a new array
const drop = <T>(n: number) => (array: Array<T>): Array<T> =>
	n <= 0 ? array : array.slice(n)

//?? [EXAMPLE] `drop(2)([1, 2, 3, 4, 5]) // [3, 4, 5]`
//?? [EXAMPLE] `drop(0)([1, 2, 3])       // [1, 2, 3]`
//?? [EXAMPLE] `drop(10)([1, 2, 3])      // []`
//?? [EXAMPLE] `drop(-2)([1, 2, 3])      // [1, 2, 3] (negative n treated as 0)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Skip header row
 | const skipHeader = drop(1)
 | skipHeader(["header", "data1", "data2"]) // ["data1", "data2"]
 | ```
 */

export default drop
