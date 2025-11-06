import isArray from "../../predicates/isArray/index.ts"
import isEqual from "../../predicates/isEqual/index.ts"
import length from "../length/index.ts"

//++ Returns true if length of array is len
export default function hasLength(len: number) {
	return function hasLengthWithLength<T>(arr?: Array<T> | null) {
		return isArray(arr) && isEqual(length(arr))(len)
	}
}
