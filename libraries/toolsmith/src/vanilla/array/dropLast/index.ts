import max from "../../math/max/index.ts"
import lte from "../../validation/lte/index.ts"
import length from "../length/index.ts"
import slice from "../slice/index.ts"

//++ Drops the last n elements
export default function dropLast<T>(n: number) {
	return function dropLastWithN(array: Array<T>): Array<T> {
		if (lte(n)(0)) {
			return array
		}

		return slice(0)(max(0)(length(array) - n))(array)
	}
}
