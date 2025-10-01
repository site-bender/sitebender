import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNothing from "../isNothing/index.ts"

//++ Returns an alternative Maybe if the current one is Nothing
export default function orElse<A>(getAlternative: () => Maybe<A>) {
	return function orElseMaybe(maybe: Maybe<A>): Maybe<A> {
		if (isNothing(maybe)) {
			return getAlternative()
		}

		return maybe
	}
}
