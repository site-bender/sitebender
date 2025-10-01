import type { Maybe } from "../../../types/fp/maybe/index.ts"

import isNullish from "../../../vanilla/validation/isNullish/index.ts"
import just from "../just/index.ts"
import nothing from "../nothing/index.ts"

//++ Converts a nullable value to a Maybe (Just for non-null, Nothing for null/undefined)
export default function fromNullable<A>(value: A | null | undefined): Maybe<A> {
	return isNullish(value) ? nothing() : just(value)
}
