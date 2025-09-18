import isNullish from "../../validation/isNullish/index.ts"

//++ Transform each element of an array using a function; returns a new array; curried
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

/*?? [EXAMPLE]
 | map((x: number) => x * 2)([1, 2, 3, 4]) // [2, 4, 6, 8]
 | map((s: string) => s.toUpperCase())(["hello", "world"]) // ["HELLO", "WORLD"]
 |
 | const users = [{ name: "Alice" }, { name: "Bob" }]
 | map((u: { name: string }) => u.name)(users) // ["Alice", "Bob"]
 | map((x: number, i: number) => x + i)([10, 20, 30]) // [10, 21, 32]
 | map((n: number) => n.toString())([1, 2, 3]) // ["1", "2", "3"]
 |
 | const double = map((x: number) => x * 2)
 | double([1, 2, 3]) // [2, 4, 6]
 | map((x: number) => x * 2)(null) // []
 */
