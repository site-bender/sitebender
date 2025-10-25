import type { Io } from "../../../types/fp/io/index.ts"

//++ Maps a function over the value inside an Io (Functor)
export default function map<A, B>(mapper: (value: A) => B) {
	return function mapOverIo(io: Io<A>): Io<B> {
		return function mappedIo() {
			return mapper(io())
		}
	}
}
