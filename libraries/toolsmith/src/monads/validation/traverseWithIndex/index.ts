import type { Validation } from "../../../types/fp/validation/index.ts"

import success from "../success/index.ts"
import failure from "../failure/index.ts"
import isSuccess from "../isSuccess/index.ts"

//++ Maps an indexed function over an array and sequences the results (error accumulation)
export default function traverseWithIndex<E, A, B>(
	fn: (value: A, index: number) => Validation<E, B>,
) {
	return function traverseWithIndexAndFunction(
		array: ReadonlyArray<A>,
	): Validation<E, ReadonlyArray<B>> {
		const values: Array<B> = []
		const errors: Array<E> = []

		//++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth vs O(n) recursion stack
		//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]
			const mapped = fn(element, index)

			//++ Accumulate ALL errors (don't fail fast)
			if (!isSuccess<B>(mapped)) {
				//++ [EXCEPTION] .push() and spread operator for error accumulation
				errors.push(...mapped.errors)
			} else {
				//++ [EXCEPTION] .push() on local array for performance
				values.push(mapped.value)
			}
		}

		//++ Return failure if ANY errors, otherwise success
		//++ [EXCEPTION] .length property for performance
		if (errors.length > 0) {
			return failure(errors as [E, ...Array<E>])
		}

		return success(values)
	}
}
