import type { Either } from "../../../types/fp/either/index.ts"

import isNullish from "../../../predicates/isNullish/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Lifts a nullable value into Either (null/undefined -> Left, otherwise Right)
export default function fromNullable<L, R>(error: L) {
	return function checkNullable(value: R | null | undefined): Either<L, R> {
		return isNullish(value) ? left(error) : right(value as R)
	}
}
