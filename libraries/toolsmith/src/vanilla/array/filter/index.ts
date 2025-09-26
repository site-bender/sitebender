//++ Returns a new array containing only elements that satisfy the predicate
const filter =
	<T>(predicate: (item: T) => boolean) => (array: Array<T>): Array<T> =>
		array.filter(predicate)

//?? [EXAMPLE] `filter((n: number) => n > 2)([1, 2, 3, 4])           // [3, 4]`
//?? [EXAMPLE] `filter((s: string) => s.length > 3)(["hi", "hello"]) // ["hello"]`
/*??
 | [EXAMPLE]
 | ```typescript
 | // Compose filters
 | const keepPositive = filter((n: number) => n > 0)
 | const keepEven = filter((n: number) => n % 2 === 0)
 | keepEven(keepPositive([-2, -1, 0, 1, 2, 3, 4]))      // [2, 4]
 | ```
 */

export default filter
