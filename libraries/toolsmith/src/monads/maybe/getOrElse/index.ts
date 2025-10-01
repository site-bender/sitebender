import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Extracts the value from a Just or returns a default for Nothing
export default function getOrElse<A>(getDefault: () => A) {
	return function getOrElseMaybe(maybe: Maybe<A>): A {
		if (isNothing(maybe)) {
			return getDefault()
		}

		return maybe.value
	}
}
