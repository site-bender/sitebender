import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Folds a Maybe value to a single result using handlers for each case
export default function fold<A, B>(onNothing: () => B) {
	return function foldJust(onJust: (value: A) => B) {
		return function foldMaybe(maybe: Maybe<A>): B {
			if (isNothing(maybe)) {
				return onNothing()
			}

			return onJust(maybe.value)
		}
	}
}
