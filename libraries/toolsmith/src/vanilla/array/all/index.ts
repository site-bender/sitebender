//++ Tests whether all elements satisfy a predicate
export default function all<T>(
	predicate: (item: T, index: number, array: Array<T>) => boolean,
) {
	return function allWithPredicate(array: Array<T>): boolean {
		return array.every(predicate)
	}
}
