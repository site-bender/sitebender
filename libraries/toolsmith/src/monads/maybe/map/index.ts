import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"
import just from "../just/index.ts"

//++ Maps a function over the value inside a Just, leaving Nothing unchanged
export default function map<A, B>(fn: (a: A) => B) {
	return function mapMaybe(maybe: Maybe<A>): Maybe<B> {
		if (isNothing(maybe)) {
			return maybe
		}

		return just(fn(maybe.value))
	}
}
