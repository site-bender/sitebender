import isArray from "../../validation/isArray/index.ts"

//++ Reduces array to a single value
export default function reduce<T, U>(
	fn: (acc: U, item: T, index: number) => U,
) {
	return function reduceWithFunction(
		initial: U,
	) {
		return function reduceWithFunctionAndInitial(
			array: ReadonlyArray<T> | null | undefined,
		): U {
			if (isArray(array)) {
				return array.reduce(fn, initial)
			}

			return initial
		}
	}
}
