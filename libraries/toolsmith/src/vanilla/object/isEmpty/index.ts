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

//?? [EXAMPLE] isEmpty({}) // true
//?? [EXAMPLE] isEmpty({ a: 1 }) // false
//?? [EXAMPLE] isEmpty(Object.create(null)) // true
//?? [EXAMPLE] isEmpty(new Date()) // false (not a plain object)
//?? [EXAMPLE] isEmpty([]) // false (array is not a plain object)