import isNumber from "../../validation/isNumber/index.ts"

//++ Squares the number
export default function square(n?: number | null): number | null {
	if (isNumber(n)) {
		return n * n
	}

	return null
}

//?? [EXAMPLE] `square(3) // returns 9`
//?? [EXAMPLE] `square() // returns null`
//?? [EXAMPLE] `square(null) // returns null`
//?? [EXAMPLE] `square([]) // returns null` (etc.)
