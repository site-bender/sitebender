import type { Either } from "../../../types/fp/either/index.ts"
import type { MonadDictionary } from "../../doNotation/index.ts"

//++ Creates a monad dictionary for Either with chain and of operations
export default function createEitherMonad<L>(): MonadDictionary<
	Either<L, unknown>
> {
	return {
		chain: function chainEither<A, B>(f: (a: A) => Either<L, B>) {
			return function applyChain(ma: Either<L, unknown>): Either<L, unknown> {
				if (ma._tag === "Left") {
					return ma
				}
				const res = f((ma.right as unknown) as A)
				return res as Either<L, unknown>
			}
		},
		of: function ofEither<R>(value: R): Either<L, unknown> {
			return { _tag: "Right", right: value }
		},
	}
}

//?? [EXAMPLE] createEitherMonad<string>() // Returns monad dictionary for Either<string, any>
//?? [EXAMPLE] const eitherMonad = createEitherMonad<Error>() // For error handling
/*??
 | [EXAMPLE]
 | const stringErrorMonad = createEitherMonad<string>()
 | const chain = stringErrorMonad.chain
 | const of = stringErrorMonad.of
 |
 | // Now can use with doNotation
 | doNotation(stringErrorMonad)(function* () {
 |   const x = yield of(5)
 |   const y = yield of(3)
 |   return x + y
 | })
 |
 | [PRO] Enables do-notation for Either monad
 | [PRO] Type-safe error handling with specified error type
 | [GOTCHA] Error type L must be consistent throughout computation
 |
*/
