import isNullish from "../../predicates/isNullish/index.ts"

//++ Takes first n elements
export default function take(count: number) {
	return function takeFromArray<T>(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNullish(array) || !Array.isArray(array) || count <= 0) {
			return []
		}
		return array.slice(0, count)
	}
}
