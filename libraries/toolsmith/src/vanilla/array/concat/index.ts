//++ Concatenates two arrays
export default function concat<T>(first: Array<T>) {
	return function concatWithFirst(second: Array<T>): Array<T> {
		return [...first, ...second]
	}
}

//?? [EXAMPLE] `concat([1,2])([3,4]) // [1,2,3,4]`
//?? [EXAMPLE] `concat([])([1,2]) // [1,2]`
