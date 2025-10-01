import lte from "../../validation/lte/index.ts"
import slice from "../slice/index.ts"

//++ Drops the first n elements
export default function drop<T>(n: number) {
	return function dropWithN(array: Array<T>): Array<T> {
		if (lte(n)(0)) {
			return array
		}

		return slice(n)(undefined)(array)
	}
}
