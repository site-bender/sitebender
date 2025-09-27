import head from "../head/index.ts"

//++ Gets the first element (alias for head)
export default function first<T>(array: Array<T>): T | undefined {
	return head(array)
}

//?? [EXAMPLE] `first([1, 2, 3])  // 1`
//?? [EXAMPLE] `first(["a", "b"]) // "a"`
//?? [EXAMPLE] `first([])         // undefined`

//>> [RELATED] [head](../head/index.ts)
