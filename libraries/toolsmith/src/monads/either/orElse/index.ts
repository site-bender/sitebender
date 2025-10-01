import type { Either } from "../../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

//++ Supplies an alternative Either when the input is Left (Right passes through)
export default function orElse<E, A, F>(
	alternative: Either<F, A> | (() => Either<F, A>),
) {
	return function orElseEither(either: Either<E, A>): Either<F, A> {
		if (isRight(either)) {
			return either as unknown as Either<F, A>
		}

		return typeof alternative === "function" ? alternative() : alternative
	}
}
