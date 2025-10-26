import type { Io, IoResult } from "../../../types/fp/io/index.ts"

import ok from "../../result/ok/index.ts"

//++ Converts Io<A> to IoResult<E, A> by wrapping the value in Ok (fail-fast error handling)
export default function ioToIoResult<E, A>(io: Io<A>): IoResult<E, A> {
	return function ioResultFromIo() {
		return ok(io())
	}
}
