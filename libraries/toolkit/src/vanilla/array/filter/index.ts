//++ Keep only elements that satisfy a predicate; preserves order; curried
const filter =
	<T>(predicate: (item: T) => boolean) => (array: Array<T>): Array<T> =>
		array.filter(predicate)

export default filter

//?? [EXAMPLE] filter((n: number) => n > 2)([1, 2, 3, 4]) // [3, 4]
//?? [EXAMPLE] filter((s: string) => s.length > 3)(["hi", "hello"]) // ["hello"]
//?? [EXAMPLE] const keepPositive = filter((n: number) => n > 0); const keepEven = filter((n: number) => n % 2 === 0); keepEven(keepPositive([-2, -1, 0, 1, 2, 3, 4])) // [2, 4]
