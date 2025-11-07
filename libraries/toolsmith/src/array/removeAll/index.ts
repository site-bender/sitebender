import isNullish from "../../predicates/isNullish/index.ts"
import filter from "../filter/index.ts"

//++ Removes all occurrences of a value
export default function removeAll<T>(item: T) {
	return function removeAllFromArray(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNullish(array)) {
			return []
		}
		// filter returns a new array; spread to ensure a mutable Array<T>
		return filter(function isNotItem(element: T) {
			return element !== item
		})([...array])
	}
}
