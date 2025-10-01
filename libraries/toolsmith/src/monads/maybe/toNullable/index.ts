import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Converts a Maybe to a nullable value (inverse of fromNullable)
export default function toNullable<A>(maybe: Maybe<A>): A | null {
	if (isNothing(maybe)) {
		return null
	}

	return maybe.value
}
