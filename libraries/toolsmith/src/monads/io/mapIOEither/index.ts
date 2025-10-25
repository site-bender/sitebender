import type { IoEither } from "../../../types/fp/io/index.ts"

import right from "../../either/right/index.ts"

//++ Maps a function over the Right value inside IoEither (branching logic, both outcomes valid)
export default function mapIoEither<L, A, B>(mapper: (value: A) => B) {
	return function mapOverIoEither(ioEither: IoEither<L, A>): IoEither<L, B> {
		return function mappedIoEither() {
			const either = ioEither()
			return either._tag === "Right" ? right(mapper(either.right)) : either
		}
	}
}
