import isNullish from "../../validation/isNullish/index.ts"

//++ Converts array to Set
export default function toSet<T>(array: Array<T> | null | undefined): Set<T> {
	if (isNullish(array)) {
		return new Set<T>()
	}
	return new Set(array)
}
