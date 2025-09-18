import isNullish from "../../validation/isNullish/index.ts"

//++ Reduce from right to left; useful for right-associative ops and building from the end; curried
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

/*?? [EXAMPLE]
 | const concat = (acc: string, x: string) => acc + x
 | reduceRight(concat)("")(["a", "b", "c", "d"]) // "dcba"
 |
 | type Node = { value: string; next: Node | null }
 | const buildList = (next: Node | null, value: string): Node => ({ value, next })
 | reduceRight(buildList)(null as Node | null)(["a", "b", "c"])
 | // { value: "a", next: { value: "b", next: { value: "c", next: null } } }
 |
 | const power = (acc: number, x: number) => Math.pow(x, acc)
 | reduceRight(power)(1)([2, 3, 2]) // 512
 |
 | reduceRight((acc: number, x: number) => acc + x)(10)([]) // 10
 | reduceRight((acc: number, x: number) => acc + x)(0)(null) // 0
 */
