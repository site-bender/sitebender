import is from "../../validation/is/index.ts"

export default function indexOf<T>(item: T) {
	return function findIndexOf(array: Array<T>): number | undefined {
		const index = array.findIndex(is(item))
		return index === -1 ? undefined : index
	}
}
