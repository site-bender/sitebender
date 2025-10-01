import type { IO, IOMaybe } from "../../../types/fp/io/index.ts"

import just from "../../maybe/just/index.ts"

//++ Converts IO<A> to IOMaybe<A> by wrapping the value in Just
export default function ioToIOMaybe<A>(io: IO<A>): IOMaybe<A> {
	return () => just(io())
}
