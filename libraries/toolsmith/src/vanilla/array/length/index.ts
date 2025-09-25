//++ Returns the length of an array
export default function length<T>(array: ReadonlyArray<T>): number {
	return array.length
}

//?? [EXAMPLE]
// length([]) // 0
// length([1, 2, 3]) // 3
// length(["a", "b"]) // 2
// length([undefined, null, 0]) // 3 (counts all elements)
