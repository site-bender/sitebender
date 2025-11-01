import type { Either } from "../../../types/fp/either/index.ts"
import type { MonadDictionary } from "../../doNotation/index.ts"

//++ Creates a monad dictionary for Either with chain and of operations
export default function createEitherMonad<L>(): MonadDictionary<
	Either<L, unknown>
> {
	return {
		chain: function chainEither<A, B>(f: (a: A) => Either<L, B>) {
			return function applyChain(ma: Either<L, unknown>): Either<L, unknown> {
				//++ [EXCEPTION] === operator and property access permitted in Toolsmith for performance - provides Either monad tag checking
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
