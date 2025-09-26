//++ Returns the first element that satisfies the predicate, or undefined if none found
const find =
	<T>(predicate: (item: T) => boolean) => (array: Array<T>): T | undefined =>
		array.find(predicate)

//?? [EXAMPLE] `find((n: number) => n > 2)([1, 2, 3, 4])              // 3`
//?? [EXAMPLE] `find((s: string) => s.startsWith("h"))(["apple", "hello"]) // "hello"`
//?? [EXAMPLE] `find((n: number) => n > 10)([1, 2, 3])                // undefined`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Find first even number
 | const findEven = find((n: number) => n % 2 === 0)
 | findEven([1, 3, 5, 6, 7, 8])                          // 6
 | ```
 */

export default find
