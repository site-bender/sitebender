import type { Either } from "../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

//++ Extracts a value from an Either by providing handlers for both cases
export default function fold<E, A, B>(onLeft: (e: E) => B) {
	return function foldRight(onRight: (a: A) => B) {
		return function foldEither(either: Either<E, A>): B {
			if (isLeft(either)) {
				return onLeft(either.left)
			}

			return onRight(either.right)
		}
	}
}

//?? [EXAMPLE] fold((err: string) => `Error: ${err}`)((val: number) => `Success: ${val}`)(right(42)) // "Success: 42"
//?? [EXAMPLE] fold(() => false)(() => true)(left("error")) // false
/*??
 * [EXAMPLE]
 * const toHttpResponse = <E, A>(either: Either<E, A>) =>
 *   fold(
 *     (error: E) => ({ status: 400, body: { error: String(error) } })
 *   )(
 *     (data: A) => ({ status: 200, body: data })
 *   )(either)
 * toHttpResponse(right({ id: 1 }))  // { status: 200, body: { id: 1 } }
 * toHttpResponse(left("Invalid"))   // { status: 400, body: { error: "Invalid" } }
 *
 * [PRO] Fundamental pattern matching operation for Either values
 * [PRO] Primary way to extract values and handle both success/failure
 */
