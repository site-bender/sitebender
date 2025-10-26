import type { Io } from "../../../types/fp/io/index.ts"

//++ Executes an Io computation by calling the thunk and returning its result
export default function runIo<A>(io: Io<A>): A {
	return io()
}
