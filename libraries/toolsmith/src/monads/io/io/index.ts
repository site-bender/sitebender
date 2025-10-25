import type { Io } from "../../../types/fp/io/index.ts"

//++ Creates an Io by wrapping a value in a thunk (deferred computation)
export default function io<A>(value: A): Io<A> {
	return () => value
}
