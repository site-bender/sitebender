import type { Either, Left } from "../../../types/fp/either/index.ts"

//++ Creates a Left value (the Left branch of an Either)
export default function left<E, A = never>(value: E): Either<E, A> {
	return {
		_tag: "Left" as const,
		left: value,
	} as Left<E>
}
