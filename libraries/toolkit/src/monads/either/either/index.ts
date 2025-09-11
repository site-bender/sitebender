import type { Either } from "../../../types/fp/either/index.ts"

import fold from "../fold/index.ts"

//++ Pattern matches on an Either value with named handlers (alias for fold)
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
 | [PRO] Clearer parameter names than fold for pattern matching
 | [PRO] Useful for converting Either to other types (Promise, nullable, etc.)
 |
*/
