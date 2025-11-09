import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../ok/index.ts"
import isOk from "../isOk/index.ts"

//++ Converts an array of Results into a Result of an array (fail-fast)
export default function sequence<E, A>() {
	return function sequenceWithArray(
		array: ReadonlyArray<Result<E, A>>,
	): Result<E, ReadonlyArray<A>> {
		const result: Array<A> = []

		//++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth vs O(n) recursion stack
		//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]

			//++ Fail-fast: return first error encountered
			if (!isOk<A>(element)) {
				return element
			}

			//++ [EXCEPTION] .push() on local array for performance
			result.push(element.value)
		}

		return ok(result)
	}
}
