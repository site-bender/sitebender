import is from "../../validation/is/index.ts"

//++ Finds the index of the first occurrence
export default function indexOf<T>(item: T) {
	return function findIndexOf(array: Array<T>): number | undefined {
		const index = array.findIndex(is(item))
		return index === -1 ? undefined : index
	}
}

//?? [EXAMPLE] `indexOf(3)([1, 2, 3, 4])    // 2`
//?? [EXAMPLE] `indexOf("b")(["a", "b", "c"]) // 1`
//?? [EXAMPLE] `indexOf(5)([1, 2, 3])        // undefined`
