import type { AsyncIoMaybe } from "../../../types/fp/io/index.ts"
import type { Maybe } from "../../../types/fp/maybe/index.ts"

//++ Creates an AsyncIoMaybe by wrapping an async thunk that returns a Promise<Maybe>
//++ Used for async operations that may or may not return a value
export default function asyncIoMaybe<A>(
	thunk: () => Promise<Maybe<A>>,
): AsyncIoMaybe<A> {
	return thunk
}
