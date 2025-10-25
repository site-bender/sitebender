import type { IoMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Lifts a thunk returning Maybe into IoMaybe context
export default function liftMaybe<A>(thunk: () => Maybe<A>): IoMaybe<A> {
	return function liftedMaybeThunk() {
		return thunk()
	}
}
