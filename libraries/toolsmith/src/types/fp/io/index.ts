import type { Either } from "../either/index.ts"
import type { Maybe } from "../maybe/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type IO<A> = () => A

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type IOMaybe<A> = IO<Maybe<A>>

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type IOEither<E, A> = IO<Either<E, A>>
