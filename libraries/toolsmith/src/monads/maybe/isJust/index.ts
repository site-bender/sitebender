import type { Just, Maybe } from "../../../types/fp/maybe/index.ts"

//++ Type guard that checks if a Maybe value is Just (contains a value)
export default function isJust<A>(maybe: Maybe<A>): maybe is Just<A> {
	//++ [EXCEPTION] === operator and property access permitted in Toolsmith for performance - provides Maybe monad type guard
	return maybe._tag === "Just"
}
