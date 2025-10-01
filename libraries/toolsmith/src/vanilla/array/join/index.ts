import isNullish from "../../validation/isNullish/index.ts"

//++ Joins array elements into a string
export default function join<T>(separator: string) {
	return function joinWithSeparator(
		array: ReadonlyArray<T> | null | undefined,
	): string {
		return isNullish(array) ? "" : array.join(separator)
	}
}
