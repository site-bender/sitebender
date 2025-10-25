import type { IoMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Lifts a Maybe<A> into IoMaybe<A> context
export default function fromMaybe<A>(maybe: Maybe<A>): IoMaybe<A> {
	return function ioMaybeFromMaybe() {
		return maybe
	}
}
