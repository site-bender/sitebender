import type { Io, IoMaybe } from "../../../types/fp/io/index.ts"

import just from "../../maybe/just/index.ts"

//++ Converts Io<A> to IoMaybe<A> by wrapping the value in Just
export default function ioToIoMaybe<A>(io: Io<A>): IoMaybe<A> {
	return function ioMaybeFromIo() {
		return just(io())
	}
}
