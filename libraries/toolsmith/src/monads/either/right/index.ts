import type { Either, Right } from "../../../types/fp/either/index.ts"

//++ Creates a Right value (the Right branch of an Either)
export default function right<A, E = never>(value: A): Either<E, A> {
	return {
		_tag: "Right" as const,
		right: value,
	} as Right<A>
}
