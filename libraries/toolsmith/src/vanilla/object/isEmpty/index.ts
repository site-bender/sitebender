import length from "../../array/length/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import isPlainObject from "../../validation/isPlainObject/index.ts"
import keys from "../keys/index.ts"

//++ Checks if an object is empty (has no own enumerable properties)
export default function isEmpty<T extends object>(obj: T): boolean {
	if (isNullish(obj)) {
		return true
	}

	if (!isPlainObject(obj)) {
		return false
	}

	return length(keys(obj)) === 0
}
