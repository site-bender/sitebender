import isNullish from "../../predicates/isNullish/index.ts"

//++ Reduces array from right to left
const reduceRight = <T, U>(
	fn: (
		accumulator: U,
		element: T,
		index: number,
		array: ReadonlyArray<T>,
	) => U,
) =>
(
	initial: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): U => {
	if (isNullish(array)) {
		return initial
	}

	return array.reduceRight(fn, initial)
}

export default reduceRight
