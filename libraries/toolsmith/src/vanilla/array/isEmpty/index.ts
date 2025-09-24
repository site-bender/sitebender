//++ Checks if an array is empty (has no elements)
export default function isEmpty<T>(array: ReadonlyArray<T>): boolean {
	return Array.isArray(array) && array.length === 0
}

//?? [EXAMPLE] isEmpty([]) // true
//?? [EXAMPLE] isEmpty([1, 2, 3]) // false
//?? [EXAMPLE] isEmpty([undefined]) // false (has one element)
//?? [EXAMPLE] isEmpty([null]) // false (has one element)