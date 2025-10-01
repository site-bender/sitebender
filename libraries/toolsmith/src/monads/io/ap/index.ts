import type { IO } from "../../../types/fp/io/index.ts"

//++ Applies an IO function to an IO value (Applicative pattern)
export default function ap<A, B>(ioF: IO<(a: A) => B>) {
	return function applyIO(ioA: IO<A>): IO<B> {
		return () => ioF()(ioA())
	}
}
