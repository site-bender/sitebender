import type { Validation } from "../../../types/fp/validation/index.ts"

import success from "../success/index.ts"
import failure from "../failure/index.ts"
import isSuccess from "../isSuccess/index.ts"

//++ Converts an array of Validations into a Validation of an array (error accumulation)
export default function sequence<E, A>() {
	return function sequenceWithArray(
		array: ReadonlyArray<Validation<E, A>>,
	): Validation<E, ReadonlyArray<A>> {
		const values: Array<A> = []
		const errors: Array<E> = []

		//++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth vs O(n) recursion stack
		//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]

			//++ Accumulate ALL errors (don't fail fast)
			if (!isSuccess<A>(element)) {
				//++ [EXCEPTION] .push() and spread operator for error accumulation
				errors.push(...element.errors)
			} else {
				//++ [EXCEPTION] .push() on local array for performance
				values.push(element.value)
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
