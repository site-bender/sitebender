import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"
import left from "../left/index.ts"
import right from "../right/index.ts"

//++ Maps functions over both Left and Right values of an Either
export default function bimap<E, F, A, B>(leftFn: (e: E) => F) {
	return function bimapRight(rightFn: (a: A) => B) {
		return function bimapEither(either: Either<E, A>): Either<F, B> {
			if (isLeft(either)) {
				return left(leftFn(either.left))
			}

			return right(rightFn(either.right))
		}
	}
}

//?? [EXAMPLE] bimap((e: string) => e.toUpperCase())((v: number) => v * 2)(right(5)) // Right(10)
//?? [EXAMPLE] bimap((e: string) => e.toUpperCase())((v: number) => v * 2)(left("error")) // Left("ERROR")
/*??
 | [EXAMPLE]
 | const convertCurrency = (rate: number) => bimap(
 |   (err: string) => `Currency error: ${err}`
 | )(
 |   (amount: number) => amount * rate
 | )
 | const toEuros = convertCurrency(0.85)
 | toEuros(right(100))               // Right(85)
 | toEuros(left("Invalid amount"))   // Left("Currency error: Invalid amount")
 |
 | [PRO] Transforms both error and success types in a single operation
 | [PRO] Combines functionality of map and mapLeft
 |
*/
