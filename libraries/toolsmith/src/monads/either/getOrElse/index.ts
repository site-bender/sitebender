import type { Either } from "../../../types/fp/either/index.ts"

import isRight from "../isRight/index.ts"

//++ Extracts the Right branch value or returns a default for Left
export default function getOrElse<A>(defaultValue: A | ((e: unknown) => A)) {
	return function getOrElseEither<E>(either: Either<E, A>): A {
		if (isRight(either)) {
			return either.right
		}

		return typeof defaultValue === "function"
			? (defaultValue as (e: E) => A)(either.left)
			: defaultValue
	}
}
