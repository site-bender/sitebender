import isString from "../../validation/isString/index.ts"
import length from "../length/index.ts"

//++ Checks if a string is not empty (has at least one character)
export default function isNotEmpty(str: string): boolean {
	return isString(str) && length(str) > 0
}
