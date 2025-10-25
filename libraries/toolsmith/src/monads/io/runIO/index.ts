import type { IO } from "../../../types/fp/io/index.ts"

//++ Executes an IO computation by calling the thunk and returning its result
export default function runIO<A>(io: IO<A>): A {
	return io()
}
