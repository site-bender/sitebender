import isNullish from "../../validation/isNullish/index.ts"

//++ Reduce: transform an array into any type via accumulator; curried as (fn) => (initial) => (array)
const reduce = <T, U>(
	fn: (acc: U, item: T, index?: number) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): U => {
	if (isNullish(array) || !Array.isArray(array)) {
		return initial
	}
	return array.reduce(fn, initial)
}

export default reduce

//?? [EXAMPLE] reduce((acc: number, n: number) => acc + n)(0)([1, 2, 3]) // 6
//?? [EXAMPLE] reduce((acc: Record<string, number>, [k, v]: [string, number]) => ({ ...acc, [k]: v }))({})([["a", 1], ["b", 2]]) // { a: 1, b: 2 }
//?? [EXAMPLE] reduce((acc: number[], n: number) => n > 2 ? [...acc, n] : acc)([])([1, 2, 3, 4]) // [3, 4]
//?? [EXAMPLE] reduce((acc: number[], arr: number[]) => acc.concat(arr))([])([[1, 2], [3, 4]]) // [1, 2, 3, 4]
//?? [EXAMPLE] reduce((a: number, b: number) => a + b)(0)([]) // 0
//?? [EXAMPLE] reduce((a: number, b: number) => a + b)(10)(null) // 10
