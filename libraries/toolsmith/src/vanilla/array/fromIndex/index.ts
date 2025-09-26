import from from "../from/index.ts"

//++ Returns an array of indexes of the specified length
export default function fromIndex(length: number): Array<number> {
	return from(length)((_, i) => i)
}

//?? [EXAMPLE] `fromIndex(5)   // [0, 1, 2, 3, 4]`
//?? [EXAMPLE] `fromIndex(3)   // [0, 1, 2]`
//?? [EXAMPLE] `fromIndex(0)   // []`
//?? [EXAMPLE] `fromIndex(1)   // [0]`
//?? [EXAMPLE] `fromIndex(10).map(i => i * 10)  // [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]`
