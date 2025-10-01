import type { IO } from "../../../types/fp/io/index.ts"

//++ Flat maps a function that returns an IO (Monad bind/flatMap)
export default function chain<A, B>(f: (a: A) => IO<B>) {
	return function chainIO(io: IO<A>): IO<B> {
		return () => f(io())()
	}
}
