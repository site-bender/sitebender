import type { Maybe } from "../../../types/fp/maybe/index.ts"

import withInspect from "../../../debug/withInspect/index.ts"
import nothing from "../nothing/index.ts"

//++ Creates a Nothing value with enhanced debugging output for better console logging
export default function nothingWithInspect<A = never>(): Maybe<A> {
	return withInspect(
		nothing<A>(),
		() => "Nothing",
	)
}
