import type { Either } from "../../../types/fp/either/index.ts"

import isLeft from "../isLeft/index.ts"

//++ Eliminates Either by applying a handler to the active branch (Left or Right)
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
 | [EXAMPLE]
 | const toHttpResponse = <E, A>(either: Either<E, A>) =>
 |   fold(
 |     (error: E) => ({ status: 400, body: { error: String(error) } })
 |   )(
 |     (data: A) => ({ status: 200, body: data })
 |   )(either)
 | toHttpResponse(right({ id: 1 }))  // { status: 200, body: { id: 1 } }
 | toHttpResponse(left("Invalid"))   // { status: 400, body: { error: "Invalid" } }
 |
 | [PRO] Canonical branch elimination / pattern match
 | [PRO] Converts Either into any target type (number, object, etc.)
 | [PRO] Encourages explicit handling of both branches
 |
 | [GOTCHA] Both handlers must be pure (avoid side-effects)
 | [GOTCHA] Keep handlers small—perform heavier logic earlier in the pipeline
 | [GOTCHA] For symmetrical transformations prefer bimap instead
 */
