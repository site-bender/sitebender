import isNullish from "../../predicates/isNullish/index.ts"

//++ Takes last n elements
export default function takeLast(count: number) {
	return function takeLastFromArray<T>(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNullish(array) || count <= 0 || Number.isNaN(count)) {
			return []
		}
		return array.slice(-count)
	}
}
