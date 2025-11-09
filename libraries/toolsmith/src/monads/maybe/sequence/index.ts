import type { Maybe } from "../../../types/fp/maybe/index.ts"

import just from "../just/index.ts"
import nothing from "../nothing/index.ts"
import isJust from "../isJust/index.ts"

//++ Converts an array of Maybes into a Maybe of an array (short-circuit on Nothing)
export default function sequence<A>() {
	return function sequenceWithArray(
		array: ReadonlyArray<Maybe<A>>,
	): Maybe<ReadonlyArray<A>> {
		const result: Array<A> = []

		//++ [EXCEPTION] Loop permitted in Toolsmith for O(1) stack depth vs O(n) recursion stack
		//++ [EXCEPTION] JS operators and methods permitted in Toolsmith for performance
		for (let index = 0; index < array.length; index++) {
			const element = array[index]

			//++ Short-circuit: return Nothing on first Nothing encountered
			if (!isJust<A>(element)) {
				return nothing()
			}

			//++ [EXCEPTION] .push() on local array for performance
			result.push(element.value)
		}

		return just(result)
	}
}
