//++ Concatenates two arrays
export default function concat<T>(first: Array<T>) {
	return function concatWithFirst(second: Array<T>): Array<T> {
		return [...first, ...second]
	}
}
