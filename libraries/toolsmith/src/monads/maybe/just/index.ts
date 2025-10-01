import type { Just, Maybe } from "../../../types/fp/maybe/index.ts"

//++ Creates a Just value representing the presence of a value in a Maybe
export default function just<A>(value: A): Maybe<A> {
	return {
		_tag: "Just" as const,
		value,
	} as Just<A>
}
