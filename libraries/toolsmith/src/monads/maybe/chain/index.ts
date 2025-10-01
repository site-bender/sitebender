import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Flat maps a function over the value inside a Just (monadic bind/flatMap)
export default function chain<A, B>(fn: (a: A) => Maybe<B>) {
	return function chainMaybe(maybe: Maybe<A>): Maybe<B> {
		if (isNothing(maybe)) {
			return maybe
		}

		return fn(maybe.value)
	}
}
