import type { Io } from "../../../types/fp/io/index.ts"

//++ Flat maps a function that returns an Io (Monad bind/flatMap)
export default function chain<A, B>(binder: (value: A) => Io<B>) {
	return function chainIo(io: Io<A>): Io<B> {
		return function chainedIo() {
			return binder(io())()
		}
	}
}
