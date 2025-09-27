import isNullish from "../../validation/isNullish/index.ts"

//++ Finds the minimum element by comparator
const minimumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (isNullish(array) || array.length === 0) {
		return undefined
	}

	const findMinimum = (
		arr: ReadonlyArray<T>,
		currentMin: T,
		index: number,
	): T => {
		if (index >= arr.length) {
			return currentMin
		}
		const current = arr[index]
		const newMin = comparator(current, currentMin) < 0 ? current : currentMin
		return findMinimum(arr, newMin, index + 1)
	}

	return findMinimum(array, array[0], 1)
}

export default minimumBy

//?? [EXAMPLE] `minimumBy((a: number, b: number) => a - b)([3, 1, 4, 1, 5, 9, 2]) // 1`
//?? [EXAMPLE] `minimumBy((a: string, b: string) => a.length - b.length)(["aaa", "b", "cc", "dddd"]) // "b"`
//?? [EXAMPLE] `minimumBy((a: { age: number }, b: { age: number }) => a.age - b.age)([{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 35 }]) // { name: "Bob", age: 25 }`
//?? [EXAMPLE] `minimumBy((a: number, b: number) => a - b)([42]) // 42`
//?? [EXAMPLE] `minimumBy((a: number, b: number) => a - b)([]) // undefined`
//?? [EXAMPLE] `minimumBy((a: number, b: number) => a - b)(null) // undefined`
