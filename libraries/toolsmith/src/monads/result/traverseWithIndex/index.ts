import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../ok/index.ts"
import isOk from "../isOk/index.ts"

//++ Maps an indexed function over an array and sequences the results (fail-fast)
export default function traverseWithIndex<E, A, B>(
	fn: (value: A, index: number) => Result<E, B>,
) {
	return function traverseWithIndexAndFunction(
		array: ReadonlyArray<A>,
	): Result<E, ReadonlyArray<B>> {
		const result: Array<B> = []

		//++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth vs O(n) recursion stack
		//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]
			const mapped = fn(element, index)

			//++ Fail-fast: return first error encountered
			if (!isOk<B>(mapped)) {
				return mapped
			}

			//++ [EXCEPTION] .push() on local array for performance
			result.push(mapped.value)
		}

		return ok(result)
	}
}
