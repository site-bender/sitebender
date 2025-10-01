import type { Either } from "../../../types/fp/either/index.ts"
import type { IOEither } from "../../../types/fp/io/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const liftEither = <E, A>(f: () => Either<E, A>): IOEither<E, A> => () => f()

export default liftEither
