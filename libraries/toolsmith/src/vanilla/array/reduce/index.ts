import isArray from "../../validation/isArray/index.ts"

//++ Reduce: transform an array into any type via accumulator; curried as (fn) => (initial) => (array)
export default function reduce<T, U>(
	fn: (acc: U, item: T, index: number) => U,
) {
	return function reduceWithFunction(
		initial: U,
	) {
		return function reduceWithFunctionAndInitial(
			array: ReadonlyArray<T> | null | undefined,
		): U {
			if (isArray(array)) {
				return array.reduce(fn, initial)
			}

			return initial
		}
	}
}

//?? [EXAMPLE] reduce((acc: number, n: number) => acc + n)(0)([1, 2, 3]) // 6
//?? [EXAMPLE] reduce((acc: Record<string, number>, [k, v]: [string, number]) => ({ ...acc, [k]: v }))({})([["a", 1], ["b", 2]]) // { a: 1, b: 2 }
//?? [EXAMPLE] reduce((acc: number[], n: number) => n > 2 ? [...acc, n] : acc)([])([1, 2, 3, 4]) // [3, 4]
//?? [EXAMPLE] reduce((acc: number[], arr: number[]) => acc.concat(arr))([])([[1, 2], [3, 4]]) // [1, 2, 3, 4]
//?? [EXAMPLE] reduce((a: number, b: number) => a + b)(0)([]) // 0
//?? [EXAMPLE] reduce((a: number, b: number) => a + b)(10)(null) // 10
