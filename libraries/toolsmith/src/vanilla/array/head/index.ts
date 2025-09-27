import at from "../at/index.ts"

//++ Returns the first element (alias for first)
export default function head<T>(array: Array<T>): T | undefined {
	return at(0)(array)
}

//?? [EXAMPLE] `head([1, 2, 3])  // 1`
//?? [EXAMPLE] `head(["a", "b"])  // "a"`
//?? [EXAMPLE] `head([])         // undefined`
