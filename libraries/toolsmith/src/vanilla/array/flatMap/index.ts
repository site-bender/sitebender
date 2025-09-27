//++ Maps and flattens in a single pass
const flatMap = <T, U>(
	fn: (item: T, index: number, array: Array<T>) => U | ReadonlyArray<U>,
) =>
(array: Array<T>): Array<U> => array.flatMap(fn)

//?? [EXAMPLE] `flatMap((n: number) => [n, n * 2])([1, 2, 3])       // [1, 2, 2, 4, 3, 6]`
//?? [EXAMPLE] `flatMap((s: string) => s.split(""))(["hi", "bye"])  // ["h", "i", "b", "y", "e"]`
//?? [EXAMPLE] `flatMap((n: number) => n > 0 ? [n * 2] : [])([1, -2, 3]) // [2, 6]`
//?? [EXAMPLE] `flatMap((n: number) => Array(n).fill(n))([1, 2, 3])      // [1, 2, 2, 3, 3, 3]`

export default flatMap
