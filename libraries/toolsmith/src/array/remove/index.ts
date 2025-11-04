import isNullish from "../../predicates/isNullish/index.ts"

//++ Removes first occurrence of a value
export default function remove<T>(item: T) {
	return function removeFromArray(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNullish(array)) {
			return []
		}
		const index = array.indexOf(item)
		return index === -1
			? [...array]
			: [...array.slice(0, index), ...array.slice(index + 1)]
	}
}
