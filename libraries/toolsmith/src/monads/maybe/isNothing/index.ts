import type { Maybe, Nothing } from "../../../types/fp/maybe/index.ts"

//++ Type guard that checks if a Maybe value is Nothing (absent value)
export default function isNothing<A>(maybe: Maybe<A>): maybe is Nothing {
	return maybe._tag === "Nothing"
}
