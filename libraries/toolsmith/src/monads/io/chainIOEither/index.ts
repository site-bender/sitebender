import type { IOEither } from "../../../types/fp/io/index.ts"

//++ Flat maps a function returning IOEither over the success value (bind for IOEither)
export default function chainIOEither<E, A, B>(f: (a: A) => IOEither<E, B>) {
	return function chainIOEitherValue(io: IOEither<E, A>): IOEither<E, B> {
		return () => {
			const either = io()
			return either._tag === "Right" ? f(either.right)() : either
		}
	}
}
