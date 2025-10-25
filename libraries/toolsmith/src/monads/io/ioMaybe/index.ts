import type { IoMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Creates an IoMaybe from a thunk returning Maybe (deferred optional computation)
export default function ioMaybe<A>(thunk: () => Maybe<A>): IoMaybe<A> {
	return thunk
}
