import type { Io, IoEither } from "../../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

//++ Converts Io<A> to IoEither<L, A> by wrapping the value in Right (branching logic)
export default function ioToIoEither<L, A>(io: Io<A>): IoEither<L, A> {
	return function ioEitherFromIo() {
		return right(io())
	}
}
