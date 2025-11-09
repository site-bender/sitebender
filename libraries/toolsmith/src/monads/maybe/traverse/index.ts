import type { Maybe } from "../../../types/fp/maybe/index.ts"

import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import isJust from "../isJust/index.ts"

//++ Maps a function over an array and sequences the results (short-circuit on Nothing)
export default function traverse<A, B>(fn: (value: A) => Maybe<B>) {
	return function traverseWithFunction(
		array: ReadonlyArray<A>,
	): Maybe<ReadonlyArray<B>> {
		const result: Array<B> = []

		//++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth vs O(n) recursion stack
		//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]
			const mapped = fn(element)

			//++ Short-circuit: return Nothing on first Nothing encountered
			if (!isJust<B>(mapped)) {
				return nothing()
			}

			//++ [EXCEPTION] .push() on local array for performance
			result.push(mapped.value)
		}

		return just(result)
	}
}
