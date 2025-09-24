import type { IOEither } from "../../../types/fp/io/index.ts"

//++ Flat maps a function returning IOEither over the success value (bind for IOEither)
export default function chainIOEither<E, A, B>(f: (a: A) => IOEither<E, B>) {
	return function chainIOEitherValue(io: IOEither<E, A>): IOEither<E, B> {
		return () => {
			const either = io()
			return either._tag === "Right" ? f(either.right)() : either
		}
	}
}

//?? [EXAMPLE] chainIOEither((user) => ioEither(() => right(`Profile: ${user.name}`)))(getUserIO(1)) // IOEither
//?? [EXAMPLE] runIO(chainIOEither(processUserIO)(fetchUserIO)) // Right or Left based on chain
/*??
 | [EXAMPLE]
 | const validateEmailIO = (email: string) =>
 |   ioEither(() =>
 |     email.includes("@")
 |       ? right(email)
 |       : left("Invalid email")
 |   )
 | const normalizeEmailIO = (email: string) =>
 |   ioEither(() => right(email.toLowerCase()))
 | const emailChainIO = chainIOEither(normalizeEmailIO)(
 |   validateEmailIO("USER@EXAMPLE.COM")
 | )
 | runIO(emailChainIO) // Right("user@example.com")
 |
 | [PRO] Enables building pipelines of potentially failing effectful computations
 | [PRO] Error short-circuits - Left values skip subsequent operations
 |
*/
