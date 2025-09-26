//++ Returns the length of an array
export default function length<T>(array: ReadonlyArray<T>): number {
	return array.length
}

//?? [EXAMPLE] `length([]) // 0`
//?? [EXAMPLE] `length([1, 2, 3]) // 3`
//?? [EXAMPLE] `length(["a", "b"]) // 2`
//?? [EXAMPLE] `length([undefined, null, 0]) // 3 (counts all elements)`
