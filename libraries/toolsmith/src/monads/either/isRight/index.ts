import type { Either, Right } from "../../../types/fp/either/index.ts"

//++ Type guard that checks if an Either is a Right branch value
export default function isRight<E, A>(
	either: Either<E, A>,
): either is Right<A> {
	return either._tag === "Right"
}
