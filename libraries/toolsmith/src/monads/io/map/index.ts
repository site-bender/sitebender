import type { IO } from "../../../types/fp/io/index.ts"

//++ Maps a function over the value inside an IO (Functor)
export default function map<A, B>(f: (a: A) => B) {
	return function mapWithTransformFunction(io: IO<A>): IO<B> {
		return function runMappedIO() {
			return f(io())
		}
	}
}
