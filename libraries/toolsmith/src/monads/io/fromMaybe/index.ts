import type { IOMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Lifts a Maybe<A> into IOMaybe<A> context
export default function fromMaybe<A>(maybe: Maybe<A>): IOMaybe<A> {
	return () => maybe
}
