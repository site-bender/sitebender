import isNullish from "../../validation/isNullish/index.ts"

//++ Finds the maximum element by comparator
const maximumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (isNullish(array) || array.length === 0) {
		return undefined
	}

	const findMaximum = (
		arr: ReadonlyArray<T>,
		currentMax: T,
		index: number,
	): T => {
		if (index >= arr.length) {
			return currentMax
		}
		const current = arr[index]
		const newMax = comparator(current, currentMax) > 0 ? current : currentMax
		return findMaximum(arr, newMax, index + 1)
	}

	return findMaximum(array, array[0], 1)
}

export default maximumBy

//?? [EXAMPLE] `maximumBy((a: number, b: number) => a - b)([3, 1, 4, 1, 5, 9, 2]) // 9`
//?? [EXAMPLE] `maximumBy((a: string, b: string) => a.length - b.length)(["a", "bbb", "cc", "dddd"]) // "dddd"`
//?? [EXAMPLE] `maximumBy((a: { age: number }, b: { age: number }) => a.age - b.age)([{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }, { name: "Charlie", age: 35 }]) // { name: "Charlie", age: 35 }`
//?? [EXAMPLE] `maximumBy((a: number, b: number) => a - b)([42]) // 42`
//?? [EXAMPLE] `maximumBy((a: number, b: number) => a - b)([]) // undefined`
//?? [EXAMPLE] `maximumBy((a: number, b: number) => a - b)(null) // undefined`
