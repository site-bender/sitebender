import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Extracts a value from a Maybe using handlers for each case (pattern matching)
export default function maybe<B>(onNothing: () => B) {
	return function maybeJust<A>(onJust: (value: A) => B) {
		return function maybeValue(maybe: Maybe<A>): B {
			if (isNothing(maybe)) {
				return onNothing()
			}

			return onJust(maybe.value)
		}
	}
}
