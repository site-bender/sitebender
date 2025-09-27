import isNullish from "../../validation/isNullish/index.ts"

//++ Transforms each element using a function
const map = <T, U>(
	fn: (element: T, index: number, array: ReadonlyArray<T>) => U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<U> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}

	return array.map(fn)
}

export default map

//?? [EXAMPLE] `map((x: number) => x * 2)([1, 2, 3, 4]) // [2, 4, 6, 8]`
//?? [EXAMPLE] `map((s: string) => s.toUpperCase())(["hello", "world"]) // ["HELLO", "WORLD"]`
//?? [EXAMPLE] `map((u: { name: string }) => u.name)([{ name: "Alice" }, { name: "Bob" }]) // ["Alice", "Bob"]`
//?? [EXAMPLE] `map((x: number, i: number) => x + i)([10, 20, 30]) // [10, 21, 32]`
//?? [EXAMPLE] `map((n: number) => n.toString())([1, 2, 3]) // ["1", "2", "3"]`
//?? [EXAMPLE] `map((x: number) => x * 2)(null) // []`
//?? [EXAMPLE] `map((x: number) => x * 2)(undefined) // []`
