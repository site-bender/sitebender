import type { Maybe, Nothing } from "../../../types/fp/maybe/index.ts"

// no imports

//++ Creates a Nothing value representing the absence of a value in a Maybe
export default function nothing<A = never>(): Maybe<A> {
	return {
		_tag: "Nothing" as const,
	} as Nothing
}
