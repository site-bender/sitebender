import from from "../from/index.ts"

//++ Returns an array of indexes of the specified length
export default function fromIndex(length: number): Array<number> {
	return from(length)((_, i) => i)
}
