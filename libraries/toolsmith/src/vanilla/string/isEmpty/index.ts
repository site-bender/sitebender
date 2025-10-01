import isString from "../../validation/isString/index.ts"
import length from "../length/index.ts"

//++ Checks if a string is empty (has length of 0)
export default function isEmpty(str: string): boolean {
	return isString(str) && length(str) === 0
}
