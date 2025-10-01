import type { IOEither } from "../../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

//++ Maps a function over the Either value inside IOEither
export default function mapIOEither<E, A, B>(f: (a: A) => B) {
	return function mapIOEitherWithTransformFunction(
		io: IOEither<E, A>,
	): IOEither<E, B> {
		return function runMappedIOEither() {
			const either = io()
			return either._tag === "Right" ? right(f(either.right)) : either
		}
	}
}
