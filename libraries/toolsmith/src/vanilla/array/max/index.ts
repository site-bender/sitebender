import isArray from "../../validation/isArray/index.ts"
import isNumber from "../../validation/isNumber/index.ts"
import all from "../all/index.ts"

// Get the maximum number from an array of numbers
export default function max(numbers?: Array<number> | null): number | null {
	return isArray(numbers) && all(isNumber)(numbers)
		? Math.max(...numbers)
		: null
}
