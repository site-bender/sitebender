import isNumber from "../../validation/isNumber/index.ts"

//++ Cubes the number
export default function cube(n?: number | null): number | null {
	if (isNumber(n)) {
		return n * n * n
	}

	return null
}
