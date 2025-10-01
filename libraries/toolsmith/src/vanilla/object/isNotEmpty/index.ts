import length from "../../array/length/index.ts"
import isPlainObject from "../../validation/isPlainObject/index.ts"
import keys from "../keys/index.ts"

//++ Checks if an object is not empty (has at least one own enumerable property)
export default function isNotEmpty<T extends object>(obj: T): boolean {
	return isPlainObject(obj) && length(keys(obj)) > 0
}
