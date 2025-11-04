import isNullish from "../../predicates/isNullish/index.ts"

//++ Maps with an accumulator from left to right
const mapAccum = <T, U, V>(
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

	return array.reduce<[U, Array<V>]>(
		([acc, mappedArray], element) => {
			const [newAcc, mappedValue] = fn(acc, element)
			return [newAcc, [...mappedArray, mappedValue]]
		},
		[initial, []],
	)
}

export default mapAccum
