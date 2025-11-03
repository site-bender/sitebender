import isNumber from "../../validation/isNumber/index.ts"

//++ Squares the number
export default function square(n?: number | null): number | null {
	if (isNumber(n)) {
		return n * n
	}

	return null
}
