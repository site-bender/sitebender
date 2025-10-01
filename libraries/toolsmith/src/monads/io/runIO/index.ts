import type { IO } from "../../../types/fp/io/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const runIO = <A>(io: IO<A>): A => io()

export default runIO
