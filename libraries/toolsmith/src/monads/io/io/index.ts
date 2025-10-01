import type { IO } from "../../../types/fp/io/index.ts"

//++ Creates an IO by wrapping a value in a thunk (deferred computation)
export default function io<A>(value: A): IO<A> {
	return () => value
}
