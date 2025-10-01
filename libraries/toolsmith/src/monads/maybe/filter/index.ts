import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"
import nothing from "../nothing/index.ts"

//++ Converts a Just to Nothing if its value doesn't satisfy a predicate
export default function filter<A>(predicate: (a: A) => boolean) {
	return function filterMaybe(maybe: Maybe<A>): Maybe<A> {
		if (isNothing(maybe)) {
			return maybe
		}

		return predicate((maybe as { _tag: "Just"; value: A }).value)
			? maybe
			: nothing()
	}
}
