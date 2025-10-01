import head from "../head/index.ts"

//++ Gets the first element (alias for head)
export default function first<T>(array: Array<T>): T | null {
	return head(array)
}


//>> [RELATED] [head](../head/index.ts)
