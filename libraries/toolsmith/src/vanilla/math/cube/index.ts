import isNumber from "../../validation/isNumber/index.ts"

//++ Cubes the number
export default function cube(n?: number | null): number | null {
	if (isNumber(n)) {
		return n * n * n
	}

	return null
}

//?? [EXAMPLE] `cube(3) // returns 27`
//?? [EXAMPLE] `cube() // returns null`
//?? [EXAMPLE] `cube(null) // returns null`
//?? [EXAMPLE] `cube([]) // returns null` (etc.)
