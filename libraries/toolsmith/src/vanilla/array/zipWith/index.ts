import isNullish from "../../validation/isNullish/index.ts"

//++ Combines arrays using a function
const zipWith = <T, U, V>(
	fn: (a: T, b: U) => V,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<U> | null | undefined,
): Array<V> => {
	if (
		isNullish(array1) || !Array.isArray(array1) || array1.length === 0 ||
		isNullish(array2) || !Array.isArray(array2) || array2.length === 0
	) {
		return []
	}

	const minLength = Math.min(array1.length, array2.length)

	// Build result using recursion
	const zipRecursive = (index: number): Array<V> => {
		if (index >= minLength) {
			return []
		}

		return [
			fn(array1[index], array2[index]),
			...zipRecursive(index + 1),
		]
	}

	return zipRecursive(0)
}

export default zipWith

//?? [EXAMPLE] `zipWith((a: number, b: number) => a + b)([1, 2, 3])([10, 20, 30]) // [11, 22, 33]`
//?? [EXAMPLE] `zipWith((a: number, b: number) => a * b)([1, 2, 3, 4])([10, 20]) // [10, 40]`
//?? [EXAMPLE] `zipWith((name: string, age: number) => ({ name, age }))(["Alice", "Bob", "Charlie"])([30, 25, 35]) // [{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 35 }]`
//?? [EXAMPLE] `zipWith((a: string, b: string) => \`\${a}-\${b}\`)(["A", "B", "C"])(["1", "2", "3"]) // ["A-1", "B-2", "C-3"]`
//?? [EXAMPLE] `zipWith((a: number, b: number) => a + b)([1, 2])(null) // []`
//?? [EXAMPLE] `zipWith((a: number, b: number) => a + b)(null)([1, 2]) // []`
