import isNullish from "../../validation/isNullish/index.ts"

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

//?? [EXAMPLE] `reduceRight((acc: string, x: string) => acc + x)("")(["a", "b", "c", "d"]) // "dcba"`
//?? [EXAMPLE] `reduceRight((next: { value: string; next: any } | null, value: string) => ({ value, next }))(null)(["a", "b", "c"]) // { value: "a", next: { value: "b", next: { value: "c", next: null } } }`
//?? [EXAMPLE] `reduceRight((acc: number, x: number) => Math.pow(x, acc))(1)([2, 3, 2]) // 512`
//?? [EXAMPLE] `reduceRight((acc: number, x: number) => acc + x)(10)([]) // 10`
//?? [EXAMPLE] `reduceRight((acc: number, x: number) => acc + x)(0)(null) // 0`
//?? [EXAMPLE] `reduceRight((acc: number, x: number) => acc + x)(0)(undefined) // 0`
