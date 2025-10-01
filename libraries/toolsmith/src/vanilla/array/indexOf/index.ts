import is from "../../validation/is/index.ts"

//++ Finds the index of the first occurrence
export default function indexOf<T>(item: T) {
	return function findIndexOf(array: Array<T>): number | null {
		const index = array.findIndex(is(item))
		return index === -1 ? null : index
	}
}
