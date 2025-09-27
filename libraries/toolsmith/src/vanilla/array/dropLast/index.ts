//++ Drops the last n elements
const dropLast = <T>(n: number) => (array: Array<T>): Array<T> =>
	n <= 0 ? array : array.slice(0, Math.max(0, array.length - n))

//?? [EXAMPLE] `dropLast(2)([1, 2, 3, 4, 5]) // [1, 2, 3]`
//?? [EXAMPLE] `dropLast(0)([1, 2, 3])       // [1, 2, 3]`
//?? [EXAMPLE] `dropLast(10)([1, 2, 3])      // []`
//?? [EXAMPLE] `dropLast(-1)([1, 2, 3])      // [1, 2, 3] (negative treated as 0)`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Remove trailing items
 | const removeFooter = dropLast(1)
 | removeFooter(["data1", "data2", "footer"]) // ["data1", "data2"]
 | ```
 */

export default dropLast
