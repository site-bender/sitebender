import type { Maybe } from "../../types/fp/maybe/index.ts"
import type { MonadDictionary } from "../doNotation/index.ts"

import doNotation from "../doNotation/index.ts"
import chain from "../maybe/chain/index.ts"
import of_ from "../maybe/of/index.ts"

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
