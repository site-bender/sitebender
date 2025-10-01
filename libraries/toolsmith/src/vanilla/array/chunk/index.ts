import isNotEmpty from "../isNotEmpty/index.ts"
import isPositive from "../../validation/isPositive/index.ts"
import isInteger from "../../validation/isInteger/index.ts"
import chunkRecursive from "./chunkRecursive/index.ts"

//++ Splits an array into fixed-size chunks
export default function chunk<T>(size: number) {
	return function chunkWithSize(
		array?: ReadonlyArray<T> | null,
	): Array<Array<T>> {
		if (isNotEmpty(array) && isPositive(size) && isInteger(size)) {
			return chunkRecursive(size, array as Array<T>)
		}

		return []
	}
}
