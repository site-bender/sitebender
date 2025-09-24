import type { Either } from "../../../types/fp/either/index.ts"

import fold from "../fold/index.ts"

//++ Alias of fold with more intention-revealing parameter names
export default function either<E, A, B>(leftHandler: (e: E) => B) {
	return function eitherRight(rightHandler: (a: A) => B) {
		return function eitherValue(either: Either<E, A>): B {
			return fold<E, A, B>(leftHandler)(rightHandler)(either)
		}
	}
}

//?? [EXAMPLE] either((err: string) => `Failed: ${err}`)((val: number) => `Success: ${val}`)(right(42)) // "Success: 42"
//?? [EXAMPLE] either((err: string) => `Failed: ${err}`)((val: number) => `Success: ${val}`)(left("oops")) // "Failed: oops"
/*??
 | [EXAMPLE]
 | const toNullable = <E, A>(e: Either<E, A>): A | null =>
 |   either(
 |     () => null,
 |     (a: A) => a
 |   )(e)
 | toNullable(right(42))     // 42
 | toNullable(left("error")) // null
 |
 | [PRO] Semantically expressive alias (leftHandler/rightHandler naming)
 | [PRO] Bridges Either into nullable, boolean, Promise, etc.
 | [PRO] Defers to fold implementation (no extra runtime cost)
 |
 | [GOTCHA] Order of handlers mirrors fold(leftFn)(rightFn)
 | [GOTCHA] Keep handlers side-effect free; fold/either may be called multiple times in debugging
 */
