import type { Maybe } from "../../types/fp/maybe/index.ts"
import type { MonadDictionary } from "../doNotation/index.ts"

import chain from "../maybe/chain/index.ts"
import of_ from "../maybe/of/index.ts"
import doNotation from "../doNotation/index.ts"

// Keep dictionary tiny by adapting existing Maybe ops to the expected shape
const maybeChain = chain as unknown as MonadDictionary<Maybe<unknown>>["chain"]
const maybeOf = (of_ as unknown) as MonadDictionary<Maybe<unknown>>["of"]

const MaybeMonad: MonadDictionary<Maybe<unknown>> = {
	chain: maybeChain,
	of: maybeOf,
}

//++ Specialized do-notation for Maybe monad with null-safe operations
export default function doMaybe<A>(
	genFn: () => Generator<Maybe<unknown>, A, unknown>,
): Maybe<A> {
	return doNotation(MaybeMonad)(genFn) as Maybe<A>
}

//?? [EXAMPLE] doMaybe(function* () { const x = yield just(5); const y = yield just(3); return x + y })
//?? [EXAMPLE] doMaybe(function* () { const x = yield (await import("../maybe/nothing/index.ts")).default(); return x })
//?? [EXAMPLE] doMaybe(function* () { const x = yield (await import("../maybe/fromNullable/index.ts")).default(getValue()); return x })
/*??
 | [EXAMPLE]
 | // Safe property access
 | const getNestedProp = (obj: any) => doMaybe<string>(function* () {
 |   const { default: fromNullable } = await import("../maybe/fromNullable/index.ts")
 |   const user = yield fromNullable(obj.user)
 |   const profile = yield fromNullable(user.profile)
 |   const name = yield fromNullable(profile.name)
 |   return name.toUpperCase()
 | })
 |
 | const result1 = getNestedProp({ user: { profile: { name: "Alice" } } })  // Just("ALICE")
 | const result2 = getNestedProp({ user: null })  // Nothing
 | const result3 = getNestedProp({})  // Nothing
 |
 | // Combining with default values
 | const withDefaults = (config: any) => doMaybe(function* () {
 |   const { default: fromNullable } = await import("../maybe/fromNullable/index.ts")
 |   const { default: getOrElse } = await import("../maybe/getOrElse/index.ts")
 |   const port = yield just(getOrElse(() => 3000)(fromNullable(config.port)))
 |   const host = yield just(getOrElse(() => "localhost")(fromNullable(config.host)))
 |   const ssl = yield just(getOrElse(() => false)(fromNullable(config.ssl)))
 |   return { port, host, ssl }
 | })
 |
 | [GOTCHA] First Nothing short-circuits entire computation
 | [GOTCHA] No error information preserved (use Either/Result accordingly)
 | [PRO] Null-safe chaining without ?. operator
 | [PRO] Composable optional value handling
 | [PRO] Clear semantics for missing values
 |
*/
