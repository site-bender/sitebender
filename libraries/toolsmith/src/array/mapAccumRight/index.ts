import isNullish from "../../predicates/isNullish/index.ts"

//++ Maps with an accumulator from right to left
const mapAccumRight = <T, U, V>(
	fn: (accumulator: U, element: T) => [U, V],
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): [U, Array<V>] => {
	if (isNullish(array)) {
		return [initial, []]
	}

	const processArray = (
		arr: ReadonlyArray<T>,
		acc: U,
		result: Array<V>,
	): [U, Array<V>] => {
		if (arr.length === 0) {
			return [acc, result]
		}
		const [newAcc, mappedValue] = fn(acc, arr[arr.length - 1])
		return processArray(
			arr.slice(0, -1),
			newAcc,
			[mappedValue, ...result],
		)
	}

	return processArray(array, initial, [])
}

export default mapAccumRight
