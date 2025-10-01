import type { IO, IOEither } from "../../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

//++ Converts IO<A> to IOEither<E, A> by wrapping the value in Right
export default function ioToIOEither<E, A>(io: IO<A>): IOEither<E, A> {
	return () => right(io())
}
