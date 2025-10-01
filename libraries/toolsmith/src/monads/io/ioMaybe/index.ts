import type { IOMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Creates an IOMaybe from a thunk returning Maybe (deferred optional computation)
export default function ioMaybe<A>(thunk: () => Maybe<A>): IOMaybe<A> {
	return thunk
}
